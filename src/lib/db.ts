import { DatabaseSync } from "node:sqlite";
import path from "path";

// Ensure database path is in the root of the workspace
const dbPath = path.join(process.cwd(), "inquiries.db");

let db: DatabaseSync;

try {
  db = new DatabaseSync(dbPath);
  
  // Initialize inquiries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inquiry_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      message TEXT,
      submitted_at TEXT NOT NULL
    )
  `);
  
  // Create index for fast lookups
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_inquiries_inquiry_id ON inquiries(inquiry_id)
  `);
} catch (error) {
  console.error("[DB] Failed to initialize SQLite database:", error);
  throw error;
}

export interface Inquiry {
  inquiryId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  dateTime: string;
}

/**
 * Saves a new inquiry to the SQLite database
 */
export function saveInquiry(inquiry: Inquiry): void {
  const insertStmt = db.prepare(`
    INSERT INTO inquiries (inquiry_id, name, email, phone, service, message, submitted_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  insertStmt.run(
    inquiry.inquiryId,
    inquiry.name,
    inquiry.email,
    inquiry.phone,
    inquiry.service,
    inquiry.message || "",
    inquiry.dateTime
  );
}

/**
 * Deletes an inquiry by its ID (useful for rollbacks on failure)
 */
export function deleteInquiry(inquiryId: string): void {
  const deleteStmt = db.prepare("DELETE FROM inquiries WHERE inquiry_id = ?");
  deleteStmt.run(inquiryId);
}

/**
 * Fetches all inquiries (for admin/monitoring checks if needed)
 */
export function getAllInquiries(): any[] {
  const stmt = db.prepare("SELECT * FROM inquiries ORDER BY id DESC");
  return stmt.all();
}
