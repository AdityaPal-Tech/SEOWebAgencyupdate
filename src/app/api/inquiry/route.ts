import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveInquiry, deleteInquiry } from "@/lib/db";
import { DatabaseSync } from "node:sqlite";
import path from "path";

// Initialize a separate read-only or quick-query connection for duplicate checking
const dbPath = path.join(process.cwd(), "inquiries.db");

// Helper function to retry asynchronous operations
async function retry<T>(operation: () => Promise<T>, maxAttempts = 3, delayMs = 1000): Promise<T> {
  let lastError: any;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.warn(`[SMTP] Attempt ${attempt} failed. Error:`, error);
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // 1. Server-side validation
    if (!name || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ success: false, error: "Name is required (2-100 characters)." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "A valid email address is required." }, { status: 400 });
    }
    // Simple phone validator allowing numbers, spaces, plus, hyphens, and parentheses
    const phoneRegex = /^[+]?[0-9\s\-()]{8,20}$/;
    if (!phone || !phoneRegex.test(phone.trim())) {
      return NextResponse.json({ success: false, error: "A valid phone number is required (8-20 characters)." }, { status: 400 });
    }
    if (!service || service.trim().length < 2 || service.trim().length > 100) {
      return NextResponse.json({ success: false, error: "Service selection is required." }, { status: 400 });
    }
    if (message && message.length > 1000) {
      return NextResponse.json({ success: false, error: "Message must not exceed 1000 characters." }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanService = service.trim();
    const cleanMessage = message ? message.trim() : "";

    // 2. Prevent duplicate submissions (within last 30 seconds)
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000).toISOString();
    try {
      const checkDb = new DatabaseSync(dbPath);
      const dupCheckStmt = checkDb.prepare(`
        SELECT COUNT(*) as count FROM inquiries 
        WHERE email = ? AND phone = ? AND service = ? AND submitted_at > ?
      `);
      const result = dupCheckStmt.get(cleanEmail, cleanPhone, cleanService, thirtySecondsAgo) as { count: number };
      if (result && result.count > 0) {
        return NextResponse.json(
          { success: false, error: "Duplicate submission detected. Please wait 30 seconds before submitting again." },
          { status: 429 }
        );
      }
    } catch (dbError) {
      console.error("[DB] Duplicate check failed:", dbError);
      // Proceed if check fails, but log it
    }

    // 3. Generate Metadata
    const inquiryId = `INQ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateTime = new Date().toISOString();

    // 4. Save to Database first
    try {
      saveInquiry({
        inquiryId,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        service: cleanService,
        message: cleanMessage,
        dateTime,
      });
      console.log(`[DB] Successfully saved inquiry: ${inquiryId}`);
    } catch (dbError: any) {
      console.error("[DB] Save failed:", dbError);
      return NextResponse.json({ success: false, error: "Failed to persist inquiry details. Please try again." }, { status: 500 });
    }

    // 5. Send emails
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const ownerEmail = process.env.OWNER_EMAIL || "seowebagency.in@gmail.com";

    // Validate email configuration
    if (!smtpUser || !smtpPass) {
      console.error("[SMTP] Credentials missing. Rolling back database insert...");
      deleteInquiry(inquiryId);
      return NextResponse.json(
        { success: false, error: "Email notification configuration is incomplete. Owner/Admin has been logged." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    try {
      // Format Owner Email
      const formattedDate = new Date(dateTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " (IST)";
      const ownerBody = `A new inquiry has been received.

Name: ${cleanName}
Email: ${cleanEmail}
Phone: ${cleanPhone}
Service: ${cleanService}
Message: ${cleanMessage}
Submitted At: ${formattedDate}

Inquiry ID: ${inquiryId}`;

      const userBody = `Dear ${cleanName},

Thank you for contacting SEOWebAgency.

We have successfully received your request. Our team will review your inquiry and contact you shortly.

Regards,
SEOWebAgency Team

---
Inquiry ID: ${inquiryId}`;

      // Run both mail dispatches with retries
      console.log(`[SMTP] Dispatching owner notification for: ${inquiryId}`);
      await retry(async () => {
        await transporter.sendMail({
          from: `"SEOWebAgency Portal" <${smtpUser}>`,
          to: ownerEmail,
          subject: "New Consultation Request - SEOWebAgency",
          text: ownerBody,
        });
      });
      console.log(`[SMTP] Owner notification sent for: ${inquiryId}`);

      console.log(`[SMTP] Dispatching user confirmation for: ${inquiryId}`);
      await retry(async () => {
        await transporter.sendMail({
          from: `"SEOWebAgency Team" <${smtpUser}>`,
          to: cleanEmail,
          subject: "Strategy Call Confirmation - SEOWebAgency",
          text: userBody,
        });
      });
      console.log(`[SMTP] User confirmation sent for: ${inquiryId}`);

    } catch (mailError: any) {
      console.error("[SMTP] Delivery failed after retries. Rolling back database record...", mailError);
      
      // ROLLBACK: delete the database record so that we do not show a false success message
      try {
        deleteInquiry(inquiryId);
        console.log(`[DB] Rolled back inquiry: ${inquiryId}`);
      } catch (rollbackError) {
        console.error("[DB] Rollback delete failed:", rollbackError);
      }

      return NextResponse.json(
        { success: false, error: `Notification delivery failed. Please verify your details and try again. (${mailError.message || "Network Timeout"})` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      message: "Consultation booked successfully. A confirmation email has been dispatched.",
    });

  } catch (err: any) {
    console.error("[API] General error in inquiry route:", err);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
