import { NextResponse } from "next/server";
import { updateSocialPostStatus, getSocialPost } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json({ success: false, error: "Post ID is required." }, { status: 400 });
    }

    // 1. Retrieve the post from SQLite database
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

    if (post.status === "Published") {
      return NextResponse.json({ success: false, error: "This post has already been published." }, { status: 400 });
    }

    const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    const fullCaption = `${post.caption}\n\n${post.hashtags}`;
    const publishedAt = new Date().toISOString();
    
    let publishLogs: string[] = [];
    let isSimulated = true;
    let externalPostId = "";

    // 2. Determine if we use simulated publishing or live Meta API
    const hasLiveCredentials = 
      businessAccountId && 
      accessToken && 
      businessAccountId !== "YOUR_INSTAGRAM_BUSINESS_ACCOUNT_ID" && 
      accessToken !== "YOUR_INSTAGRAM_ACCESS_TOKEN";

    if (hasLiveCredentials) {
      isSimulated = false;
      console.log(`[Instagram API] Initiating live publish for container: ${postId}`);
      publishLogs.push(`[SYSTEM] Live publishing mode triggered for draft ${postId}`);
      
      try {
        // Step A: Create Media Container
        publishLogs.push(`[API-REQUEST] POST graph.facebook.com/v19.0/${businessAccountId}/media`);
        const containerRes = await fetch(
          `https://graph.facebook.com/v19.0/${businessAccountId}/media`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image_url: post.image_url,
              caption: fullCaption,
              access_token: accessToken,
            })
          }
        );

        const containerData = await containerRes.json();
        
        if (!containerRes.ok || !containerData.id) {
          throw new Error(containerData.error?.message || `HTTP status ${containerRes.status} creating container`);
        }

        const containerId = containerData.id;
        publishLogs.push(`[API-RESPONSE] Container created successfully. Container ID: ${containerId}`);

        // Step B: Publish the Media Container
        publishLogs.push(`[API-REQUEST] POST graph.facebook.com/v19.0/${businessAccountId}/media_publish`);
        const publishRes = await fetch(
          `https://graph.facebook.com/v19.0/${businessAccountId}/media_publish`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              creation_id: containerId,
              access_token: accessToken,
            })
          }
        );

        const publishData = await publishRes.json();

        if (!publishRes.ok || !publishData.id) {
          throw new Error(publishData.error?.message || `HTTP status ${publishRes.status} publishing container`);
        }

        externalPostId = publishData.id;
        publishLogs.push(`[API-RESPONSE] Post published on Instagram feed! Live Post ID: ${externalPostId}`);
      } catch (apiError: any) {
        console.error("[Instagram API] Publishing failed:", apiError);
        publishLogs.push(`[API-ERROR] Publishing failed: ${apiError.message}`);
        
        return NextResponse.json({
          success: false,
          error: `Failed to publish to Instagram Graph API: ${apiError.message}`,
          logs: publishLogs
        }, { status: 502 });
      }
    } else {
      // Simulated publishing console trace
      console.log(`[Instagram Simulation] Simulating publishing for draft: ${postId}`);
      publishLogs.push(`[SYSTEM] Simulated mode triggered for draft ${postId} (Access tokens missing in .env)`);
      publishLogs.push(`[API-REQUEST] POST https://graph.facebook.com/v19.0/instagram_business_account/media`);
      publishLogs.push(`  - Payload: { image_url: "${post.image_url.substring(0, 50)}...", caption: "${post.caption.substring(0, 40)}..." }`);
      
      // Simulate random network network latency (500ms)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockContainerId = `MOCK-CONTAINER-${Date.now()}`;
      publishLogs.push(`[API-RESPONSE] Handshake Success. Generated Mock Container ID: ${mockContainerId}`);
      publishLogs.push(`[API-REQUEST] POST https://graph.facebook.com/v19.0/instagram_business_account/media_publish`);
      publishLogs.push(`  - Payload: { creation_id: "${mockContainerId}" }`);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      externalPostId = `IG-POST-${Math.floor(100000000000000 + Math.random() * 900000000000000)}`;
      publishLogs.push(`[API-RESPONSE] Mock Post Published. Simulated Feed URL: https://instagram.com/p/mock_${mockContainerId}`);
      publishLogs.push(`[SYSTEM] Published status committed successfully.`);
    }

    // 3. Update status in database
    const finalStatus = isSimulated ? "Published (Simulated)" : "Published";
    try {
      updateSocialPostStatus(postId, finalStatus, publishedAt);
      console.log(`[DB] Updated status to "${finalStatus}" for post: ${postId}`);
    } catch (dbError) {
      console.error("[DB] Failed to update post status:", dbError);
      return NextResponse.json({ success: false, error: "Post published, but failed to commit status change in SQLite Content Library." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      postId,
      status: finalStatus,
      isSimulated,
      externalPostId,
      publishedAt,
      logs: publishLogs,
      message: isSimulated 
        ? "Post approved. Simulated publishing completed successfully."
        : "Post approved and successfully published on your Instagram feed!"
    });

  } catch (err: any) {
    console.error("[API] General error in social publish route:", err);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
