import { NextResponse } from "next/server";
import { deleteSocialPost, getSocialPost } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json({ success: false, error: "Post ID is required." }, { status: 400 });
    }

    // Check if the post exists
    let post: any = null;
    try {
      post = getSocialPost(postId);
    } catch (dbError) {
      console.error("[DB] Failed to query post:", dbError);
      return NextResponse.json({ success: false, error: "Failed to read post details from Content Library database." }, { status: 500 });
    }

    if (!post) {
      return NextResponse.json({ success: false, error: "Post draft not found in database." }, { status: 404 });
    }

    // Delete post from SQLite
    try {
      deleteSocialPost(postId);
      console.log(`[DB] Successfully deleted post: ${postId}`);
    } catch (dbError) {
      console.error("[DB] Failed to delete post:", dbError);
      return NextResponse.json({ success: false, error: "Failed to delete post from the Content Library database." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      postId,
      message: "Post draft successfully deleted from Content Library."
    });

  } catch (err: any) {
    console.error("[API] General error in social delete route:", err);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
