import { DatabaseSync } from "node:sqlite";
import path from "path";

// Ensure database path is in the root of the workspace
const dbPath = path.join(process.cwd(), "inquiries.db");

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!dbInstance) {
    try {
      dbInstance = new DatabaseSync(dbPath);
      
      // Initialize inquiries table
      dbInstance.exec(`
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
      dbInstance.exec(`
        CREATE INDEX IF NOT EXISTS idx_inquiries_inquiry_id ON inquiries(inquiry_id)
      `);

      // Initialize social_posts table
      dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS social_posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          post_id TEXT UNIQUE NOT NULL,
          service TEXT NOT NULL,
          topic TEXT,
          caption TEXT NOT NULL,
          hashtags TEXT NOT NULL,
          image_url TEXT NOT NULL,
          status TEXT DEFAULT 'Draft',
          created_at TEXT NOT NULL,
          published_at TEXT
        )
      `);
      
      // Create index for social posts lookup
      dbInstance.exec(`
        CREATE INDEX IF NOT EXISTS idx_social_posts_post_id ON social_posts(post_id)
      `);
    } catch (error) {
      console.error("[DB] Failed to initialize SQLite database:", error);
      throw error;
    }
  }
  return dbInstance;
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

export interface SocialPost {
  postId: string;
  service: string;
  topic?: string;
  caption: string;
  hashtags: string;
  imageUrl: string;
  status?: string;
  createdAt: string;
  publishedAt?: string;
}

/**
 * Saves a new inquiry to the SQLite database
 */
export function saveInquiry(inquiry: Inquiry): void {
  const db = getDb();
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
  const db = getDb();
  const deleteStmt = db.prepare("DELETE FROM inquiries WHERE inquiry_id = ?");
  deleteStmt.run(inquiryId);
}

/**
 * Fetches all inquiries (for admin/monitoring checks if needed)
 */
export function getAllInquiries(): any[] {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM inquiries ORDER BY id DESC");
  return stmt.all();
}

/**
 * Checks for a duplicate inquiry within the specified time range
 */
export function checkDuplicateInquiry(email: string, phone: string, service: string, since: string): boolean {
  const db = getDb();
  const dupCheckStmt = db.prepare(`
    SELECT COUNT(*) as count FROM inquiries 
    WHERE email = ? AND phone = ? AND service = ? AND submitted_at > ?
  `);
  const result = dupCheckStmt.get(email, phone, service, since) as { count: number };
  return result ? result.count > 0 : false;
}

/**
 * Saves a new social post draft
 */
export function saveSocialPost(post: SocialPost): void {
  const db = getDb();
  const insertStmt = db.prepare(`
    INSERT INTO social_posts (post_id, service, topic, caption, hashtags, image_url, status, created_at, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  insertStmt.run(
    post.postId,
    post.service,
    post.topic || "",
    post.caption,
    post.hashtags,
    post.imageUrl,
    post.status || "Draft",
    post.createdAt,
    post.publishedAt || ""
  );
}

/**
 * Updates the publishing status of a social post
 */
export function updateSocialPostStatus(postId: string, status: string, publishedAt?: string): void {
  const db = getDb();
  const updateStmt = db.prepare(`
    UPDATE social_posts 
    SET status = ?, published_at = ?
    WHERE post_id = ?
  `);
  updateStmt.run(status, publishedAt || "", postId);
}

/**
 * Fetches all generated social posts
 */
export function getAllSocialPosts(): any[] {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM social_posts ORDER BY id DESC");
  return stmt.all();
}

/**
 * Fetches a specific social post by its post ID
 */
export function getSocialPost(postId: string): any {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM social_posts WHERE post_id = ?");
  return stmt.get(postId);
}

/**
 * Deletes a social post from the library
 */
export function deleteSocialPost(postId: string): void {
  const db = getDb();
  const deleteStmt = db.prepare("DELETE FROM social_posts WHERE post_id = ?");
  deleteStmt.run(postId);
}
