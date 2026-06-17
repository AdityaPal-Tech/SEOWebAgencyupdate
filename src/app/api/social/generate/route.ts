import { NextResponse } from "next/server";
import { saveSocialPost } from "@/lib/db";

// Abstract high-quality visual gradients for Instagram post graphics
const SERVICE_IMAGES: Record<string, string> = {
  "SEO": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  "Website Development": "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
  "Digital Marketing": "https://images.unsplash.com/photo-1618005198143-d366800dd4ed?w=800&auto=format&fit=crop&q=80",
  "AI Automation": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
  "Lead Generation": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80"
};

// Fallback high-quality template captions in case Gemini API key is not present
const FALLBACK_TEMPLATES: Record<string, (topic: string) => { caption: string, hashtags: string }> = {
  "SEO": (topic) => ({
    caption: `📈 Want to drive more organic traffic to your website? Here's how we optimize search engine visibility${topic ? ` for ${topic}` : ''}.\n\n🚀 Technical optimization is the key to unlocking consistent leads. By refining indexability, structure, and keyword mapping, we position your business exactly where searchers are looking.\n\n🔍 Core optimization areas:\n• Core Web Vitals & Loading Speed\n• Schema Markup Graph Integrations\n• High-Intent Search Term Targeting\n\n💡 Ready to scale your organic channel? Visit SEOWebAgency.in and book a free SEO review call today!`,
    hashtags: "#SEO #LocalSEO #SEOExpert #BusinessGrowth #LocalSEO #SEOWebAgency #SearchEngineOptimization #OrganicTraffic"
  }),
  "Website Development": (topic) => ({
    caption: `💻 High-speed headless architecture designed to convert. Build your digital infrastructure${topic ? ` for ${topic}` : ''}.\n\n⚡ A slow loading site is costing you clients. We construct blazingly fast Next.js applications styled with clean custom CSS, built to rank and load in milliseconds.\n\n🛠️ Features built-in:\n• 100% Mobile Responsive Grid Systems\n• Light/Dark & System Mode Toggles\n• Inquiries Persisted in Structured SQLite Database\n\n🎯 Stop losing visitors to slow load speeds. Head over to SEOWebAgency.in to get your site audited now!",`,
    hashtags: "#WebDevelopment #NextJS #WebDesign #AI #BusinessGrowth #SEOWebAgency #WebDev #SaaSDesign"
  }),
  "Digital Marketing": (topic) => ({
    caption: `📢 Double your qualified inquiries and scale client capture ${topic ? `for ${topic}` : ''}.\n\n🎯 A premium web presence is nothing without targeted traffic acquisition. We design custom search campaigns and high-intent local mapping to direct qualified leads straight to your booking funnel.\n\n🔥 Digital expansion layers:\n• Focused Google Ads Campaign Structures\n• Dynamic Landing Page A/B Testing\n• High-intent Local Campaign Scaling\n\n💼 Stop waiting for customers to find you. Partner with us at SEOWebAgency.in and start scaling today!`,
    hashtags: "#DigitalMarketing #BusinessGrowth #MarketingStrategy #LeadGeneration #SEOWebAgency #GrowthHacking #PaidAds"
  }),
  "AI Automation": (topic) => ({
    caption: `🤖 Eliminate manual bottlenecks with intelligent AI agents${topic ? ` for ${topic}` : ''}.\n\n⚙️ Streamline client operations and scale booking funnels. We integrate custom generative triggers, semantic data parsing, and webhook systems that act as an automated marketing team 24/7.\n\n💡 Automation integrations:\n• Automated Lead Routing & SQLite Backup\n• AI-generated Social Copy Review Systems\n• Instant Auto-Responder Workflows\n\n✨ Build a future-proof, automated enterprise. Claim your free optimization consult at SEOWebAgency.in!`,
    hashtags: "#AI #AIAutomation #WorkflowAutomation #LeadGeneration #BusinessGrowth #SEOWebAgency #ArtificialIntelligence"
  }),
  "Lead Generation": (topic) => ({
    caption: `🎯 Fill your calendar with qualified organic inquiries${topic ? ` for ${topic}` : ''}.\n\n💼 We construct end-to-end B2B and local customer acquisition funnels that validate prospects, block spam, and capture high-intent leads for your engineers.\n\n⚙️ Lead capture pipelines:\n• Local SEO Location Target Landing Pages\n• Real-Time Input Schema Validations\n• Multi-Channel Notifications (Formspree & SMS)\n\n🚀 Let us build your automated pipeline. Book a strategy consultation at SEOWebAgency.in right now!`,
    hashtags: "#LeadGeneration #B2BLeads #SalesFunnels #BusinessGrowth #AI #LocalSEO #SEOWebAgency #LeadGen"
  })
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, topic } = body;

    // Validate inputs
    if (!service || !SERVICE_IMAGES[service]) {
      return NextResponse.json(
        { success: false, error: "Please select a valid service category (SEO, Website Development, Digital Marketing, AI Automation, or Lead Generation)." },
        { status: 400 }
      );
    }

    const cleanTopic = topic ? topic.trim() : "";
    const inquiryId = `POST-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const imageUrl = SERVICE_IMAGES[service];

    let caption = "";
    let hashtags = "";
    let generationMode = "Template Fallback";

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        console.log(`[Gemini] Calling Gemini API for service: ${service}, topic: ${cleanTopic}`);
        
        const prompt = `You are an expert social media copywriter for SEOWebAgency, a premium digital growth agency.
Create a highly engaging, professional, conversion-oriented Instagram caption for the following service: ${service}.
Topic / Context: ${cleanTopic}.

Guidelines:
1. Write an engaging hook to grab attention.
2. Add 3 bullet points detailing the value proposition.
3. Include a clear call-to-action pointing to SEOWebAgency.in to book a free call.
4. Suggest hashtags. Include the primary hashtags: #SEO #DigitalMarketing #WebDevelopment #AI #LeadGeneration #BusinessGrowth #LocalSEO #SEOWebAgency, then add 3 specific hashtags for ${service}.
5. Output the result in clean JSON format:
{
  "caption": "The complete generated caption copy with spacing",
  "hashtags": "Space-separated hashtags"
}
Do not output any markdown formatting, backticks, or comments. Output ONLY the raw JSON block.`;

        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            }),
            next: { revalidate: 0 } // Disable caching
          }
        );

        if (!geminiResponse.ok) {
          throw new Error(`Gemini API returned status ${geminiResponse.status}`);
        }

        const data = await geminiResponse.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        
        // Extract JSON block if Gemini wrapped it in markdown code blocks
        let jsonString = responseText.trim();
        if (jsonString.startsWith("```")) {
          // Remove start code block
          jsonString = jsonString.replace(/^```json\s*/i, "").replace(/^```\s*/, "");
          // Remove end code block
          jsonString = jsonString.replace(/\s*```$/, "");
        }
        
        const parsed = JSON.parse(jsonString.trim());
        caption = parsed.caption || "";
        hashtags = parsed.hashtags || "";
        generationMode = "Gemini LLM Engine";
      } catch (geminiError) {
        console.warn("[Gemini] Failed to generate with LLM, falling back to templates:", geminiError);
        // Fall back to template
        const fallback = FALLBACK_TEMPLATES[service](cleanTopic);
        caption = fallback.caption;
        hashtags = fallback.hashtags;
      }
    } else {
      // Use fallback templates
      const fallback = FALLBACK_TEMPLATES[service](cleanTopic);
      caption = fallback.caption;
      hashtags = fallback.hashtags;
    }

    // Save generated post draft to SQLite
    const createdAt = new Date().toISOString();
    try {
      saveSocialPost({
        postId: inquiryId,
        service,
        topic: cleanTopic,
        caption,
        hashtags,
        imageUrl,
        status: "Draft",
        createdAt
      });
      console.log(`[DB] Successfully stored social post draft: ${inquiryId}`);
    } catch (dbError) {
      console.error("[DB] Failed to save social post draft:", dbError);
      return NextResponse.json({ success: false, error: "Failed to store generated draft in the Content Library database." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      postId: inquiryId,
      service,
      topic: cleanTopic,
      caption,
      hashtags,
      imageUrl,
      status: "Draft",
      mode: generationMode,
      createdAt
    });

  } catch (err: any) {
    console.error("[API] General error in social generation route:", err);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
