import { NextResponse } from "next/server";
import { getAllSocialPosts } from "@/lib/db";

export async function GET() {
  try {
    const posts = getAllSocialPosts();
    return NextResponse.json({ success: true, posts });
  } catch (err) {
    console.error("[API] Failed to fetch social posts:", err);
    return NextResponse.json({ success: false, error: "Failed to retrieve social posts from Content Library." }, { status: 500 });
  }
}
