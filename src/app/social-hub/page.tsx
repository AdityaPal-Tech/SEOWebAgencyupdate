"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  Cpu, 
  Layers, 
  Zap, 
  Trash2, 
  Activity, 
  Terminal, 
  Check, 
  Settings, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Loader2, 
  AlertTriangle 
} from "lucide-react";
import { Instagram } from "@/components/InstagramIcon";
import Navbar from "@/components/Navbar";
import ThreeCanvas from "@/components/ThreeCanvas";

interface SocialPost {
  post_id: string;
  service: string;
  topic?: string;
  caption: string;
  hashtags: string;
  image_url: string;
  status: string;
  created_at: string;
  published_at?: string;
}

export default function SocialHubPage() {
  const [formState, setFormState] = useState({ service: "SEO", topic: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [apiLogs, setApiLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  // Load posts from SQLite database
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/social/list");
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
        // Automatically select the newest post on load if nothing is selected
        if (data.posts.length > 0 && !selectedPost) {
          setSelectedPost(data.posts[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load content library:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle post generation
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMessage("");
    setSuccessMessage("");
    setApiLogs([]);

    try {
      const res = await fetch("/api/social/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });
      const data = await res.json();

      if (data.success) {
        const newPost: SocialPost = {
          post_id: data.postId,
          service: data.service,
          topic: data.topic,
          caption: data.caption,
          hashtags: data.hashtags,
          image_url: data.imageUrl,
          status: data.status,
          created_at: data.createdAt
        };
        
        setPosts((prev) => [newPost, ...prev]);
        setSelectedPost(newPost);
        setSuccessMessage(`Post draft generated successfully via ${data.mode}!`);
        setFormState((prev) => ({ ...prev, topic: "" }));
        fetchPosts(); // Refresh database state
      } else {
        setErrorMessage(data.error || "Failed to generate social media post.");
      }
    } catch (err) {
      setErrorMessage("Network error generating post draft. Please check your connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle post publishing approval
  const handlePublish = async () => {
    if (!selectedPost) return;
    setIsPublishing(true);
    setErrorMessage("");
    setSuccessMessage("");
    setApiLogs(["[SYSTEM] Fetching draft credentials..."]);

    try {
      const res = await fetch("/api/social/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: selectedPost.post_id })
      });
      const data = await res.json();

      if (data.logs) {
        setApiLogs(data.logs);
        setShowLogs(true);
      }

      if (data.success) {
        setSuccessMessage(data.message);
        // Update selected post status locally
        const updatedPost = { ...selectedPost, status: data.status, published_at: data.publishedAt };
        setSelectedPost(updatedPost);
        setPosts((prev) => prev.map((p) => p.post_id === selectedPost.post_id ? updatedPost : p));
        fetchPosts(); // Refresh database state
      } else {
        setErrorMessage(data.error || "Publishing request failed.");
      }
    } catch (err) {
      setErrorMessage("Network error dispatching publishing pipeline.");
    } finally {
      setIsPublishing(false);
    }
  };

  // Handle post deletion
  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post draft?")) return;
    setIsDeleting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/social/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId })
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setPosts((prev) => prev.filter((p) => p.post_id !== postId));
        if (selectedPost?.post_id === postId) {
          setSelectedPost(null);
        }
        fetchPosts(); // Refresh database state
      } else {
        setErrorMessage(data.error || "Failed to delete post draft.");
      }
    } catch (err) {
      setErrorMessage("Network error deleting post draft.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-dark-bg transition-colors duration-500 selection:bg-indigo-500/20 pb-20">
      {/* Background WebGL */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeCanvas />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none z-0" />

      {/* Top Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-30 z-0" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none opacity-20 z-0" />

      {/* Fixed Header */}
      <header className="sticky top-0 w-full border-b border-black/5 dark:border-white/5 bg-white/70 dark:bg-black/70 backdrop-blur-xl z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a 
              href="/"
              className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-black dark:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </a>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight text-black dark:text-white">
                SEOWebAgency
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 flex items-center gap-1">
                <Instagram className="w-3 h-3" />
                <span>AI Social Hub</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Monitoring Active
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10 relative z-10">
        
        {/* Title */}
        <div className="text-left mb-8">
          <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
            Review Dashboard
          </span>
          <h1 className="text-3xl font-black mt-3 text-black dark:text-white tracking-tight">
            AI Social Content Library
          </h1>
          <p className="text-sm opacity-60 mt-1 max-w-xl font-medium">
            Generate conversion-oriented Instagram drafts based on agency service nodes, review layout visuals, and queue dispatches through Meta Graph APIs.
          </p>
        </div>

        {/* Messaging alerts */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold leading-5 text-left flex items-start gap-2">
            <AlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>⚠️ {errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold leading-5 text-left flex items-start gap-2">
            <Check className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>✓ {successMessage}</span>
          </div>
        )}

        {/* Dashboard Panels Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Generation Form Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Draft Generator Card */}
            <div className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-3xl shadow-xl relative overflow-hidden text-left">
              <div className="flex items-center gap-2 mb-6 border-b border-black/5 dark:border-white/5 pb-4">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Generate Social Post</h3>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold opacity-60 uppercase mb-2">Service Category</label>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-black dark:text-white"
                  >
                    <option value="SEO">Search Engine Optimization (SEO)</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Lead Generation">Lead Generation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold opacity-60 uppercase mb-2">Custom Topic / Target Context</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter campaign context (e.g. why fast load times matter, how local SEO ranks Meerut businesses, scaling conversions with AI funnels...)"
                    value={formState.topic}
                    onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-black dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-extrabold text-xs hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Post Draft...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4.5 h-4.5" />
                      Generate social media post
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Platform Settings Profile Card */}
            <div className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-3xl shadow-xl text-left">
              <div className="flex items-center gap-2 mb-4 border-b border-black/5 dark:border-white/5 pb-3">
                <Settings className="w-4.5 h-4.5 text-pink-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Social Account</h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-pink-500/30 p-0.5 overflow-hidden bg-white/80 dark:bg-black/80 flex items-center justify-center">
                  <img src="/logo.png" alt="Profile" className="w-full h-full object-contain rounded-full saturate-150" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-black dark:text-white flex items-center gap-1.5">
                    seoweb_agency
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h4>
                  <p className="text-[10px] opacity-60 font-semibold mt-0.5">Instagram Business Profile</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Instagram Live Mock Preview */}
          <div className="lg:col-span-7 space-y-6">
            
            {selectedPost ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Visual Instagram Mock (MD Column Span 7) */}
                <div className="md:col-span-7 border border-black/10 dark:border-white/5 bg-white dark:bg-zinc-950/30 rounded-3xl overflow-hidden shadow-2xl relative text-left">
                  
                  {/* Instagarm Header */}
                  <div className="px-4 py-3 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-pink-500/40 p-0.5 overflow-hidden">
                        <img src="/logo.png" alt="Profile" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[11px] text-black dark:text-white">seoweb_agency</h4>
                        <p className="text-[9px] opacity-60 font-semibold">Meerut, India</p>
                      </div>
                    </div>
                    
                    {/* Status Badge inside mock */}
                    <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      selectedPost.status.startsWith("Published") 
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                    }`}>
                      {selectedPost.status}
                    </span>
                  </div>

                  {/* Visual Post Image (Pre-rendered abstract gradients matching selected services) */}
                  <div className="aspect-square w-full overflow-hidden bg-zinc-900 flex items-center justify-center relative">
                    <img 
                      src={selectedPost.image_url} 
                      alt="Post Graphic" 
                      className="w-full h-full object-cover select-none" 
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col items-start justify-end text-left select-none pointer-events-none">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">SEOWebAgency</span>
                      <h3 className="text-base font-black text-white leading-tight mt-1">{selectedPost.service}</h3>
                    </div>
                  </div>

                  {/* Instagram Action Row */}
                  <div className="px-4 pt-3 flex items-center justify-between text-black dark:text-white">
                    <div className="flex items-center gap-4">
                      <Heart className="w-5 h-5 hover:text-rose-500 transition-colors cursor-pointer" />
                      <MessageCircle className="w-5 h-5 cursor-pointer" />
                      <Send className="w-5 h-5 cursor-pointer" />
                    </div>
                    <Bookmark className="w-5 h-5 cursor-pointer" />
                  </div>

                  {/* Likes count */}
                  <div className="px-4 pt-2 text-[10px] font-extrabold text-black dark:text-white">
                    Liked by seowebagency and 142 others
                  </div>

                  {/* Caption & Hashtags Container */}
                  <div className="px-4 pb-4 pt-1.5 text-xs text-black dark:text-white leading-relaxed space-y-2">
                    <p className="whitespace-pre-line">
                      <span className="font-extrabold mr-1.5">seoweb_agency</span>
                      {selectedPost.caption}
                    </p>
                    <p className="font-semibold text-indigo-500 dark:text-cyan-400">
                      {selectedPost.hashtags}
                    </p>
                    
                    <p className="text-[8px] opacity-40 font-bold uppercase tracking-wider pt-2">
                      {new Date(selectedPost.created_at).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>

                </div>

                {/* Publish & Approve Actions (MD Column Span 5) */}
                <div className="md:col-span-5 space-y-5 text-left">
                  
                  {/* Actions Box */}
                  <div className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-5 rounded-2xl shadow-md">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider opacity-60 mb-4 border-b border-black/5 dark:border-white/5 pb-2">
                      Manual Controls
                    </h4>

                    <div className="space-y-3">
                      <button
                        onClick={handlePublish}
                        disabled={isPublishing || selectedPost.status.startsWith("Published")}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-extrabold text-xs hover:opacity-95 shadow-md shadow-pink-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isPublishing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Publishing...
                          </>
                        ) : (
                          <>
                            <Instagram className="w-4 h-4" />
                            Approve & Publish
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(selectedPost.post_id)}
                        disabled={isDeleting}
                        className="w-full py-3 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold text-rose-500 hover:bg-rose-500/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Draft
                      </button>
                    </div>
                  </div>

                  {/* Toggle API log console */}
                  <button 
                    onClick={() => setShowLogs(!showLogs)}
                    className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase opacity-60 hover:opacity-100 transition-opacity pl-2 cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{showLogs ? "Hide API Log Console" : "Show API Log Console"}</span>
                  </button>

                  {/* Simulated API log console */}
                  {showLogs && (
                    <div className="bg-black/95 dark:bg-zinc-950 border border-white/5 rounded-2xl p-4 font-mono text-[9px] text-cyan-400 overflow-hidden shadow-xl max-w-sm">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2">
                        <span className="text-zinc-500">GRAPH API TRACE // v19.0</span>
                        <span className="flex items-center gap-1 text-[8px] text-emerald-400 font-bold">
                          <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                          ONLINE
                        </span>
                      </div>
                      
                      <div className="h-32 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800 pr-1 text-left">
                        {apiLogs.length > 0 ? (
                          apiLogs.map((log, idx) => (
                            <div key={idx} className={
                              log.startsWith("[API-RESPONSE]") ? "text-emerald-400" :
                              log.startsWith("[API-ERROR]") ? "text-rose-500" :
                              log.startsWith("[API-REQUEST]") ? "text-amber-400" : "text-cyan-400"
                            }>
                              {log}
                            </div>
                          ))
                        ) : (
                          <div className="text-zinc-500 opacity-60">// Queue empty. Tap 'Approve & Publish' to capture payload dispatches.</div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            ) : (
              <div className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-12 rounded-3xl flex flex-col items-center justify-center text-center opacity-60 h-[450px]">
                <Instagram className="w-12 h-12 mb-4 text-zinc-400" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-black dark:text-white">No Draft Selected</h3>
                <p className="text-xs max-w-xs mt-2 font-semibold">Select a generated social post from the Content Library below or generate a new draft to get started.</p>
              </div>
            )}

          </div>

        </div>

        {/* BOTTOM: Content Library Grid Section */}
        <section className="mt-12">
          <div className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-3xl shadow-xl text-left overflow-x-auto">
            <div className="flex items-center justify-between mb-6 border-b border-black/5 dark:border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Content Library</h3>
              </div>
              <span className="text-[10px] font-mono opacity-60 uppercase bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md border border-black/5 dark:border-white/5">
                Total Archive: {posts.length} entries
              </span>
            </div>

            {posts.length > 0 ? (
              <table className="w-full text-xs font-semibold text-black dark:text-white border-collapse">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 opacity-60 text-left">
                    <th className="pb-3 font-bold uppercase tracking-wider">Service</th>
                    <th className="pb-3 font-bold uppercase tracking-wider">Topic / Target Prompt</th>
                    <th className="pb-3 font-bold uppercase tracking-wider">Status</th>
                    <th className="pb-3 font-bold uppercase tracking-wider">Generated Date</th>
                    <th className="pb-3 text-right font-bold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr 
                      key={post.post_id} 
                      onClick={() => setSelectedPost(post)}
                      className={`border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer ${
                        selectedPost?.post_id === post.post_id ? "bg-primary/5 dark:bg-primary/10" : ""
                      }`}
                    >
                      <td className="py-4 font-extrabold text-indigo-500 dark:text-cyan-400">{post.service}</td>
                      <td className="py-4 max-w-xs truncate opacity-80">{post.topic || "General Update"}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase border ${
                          post.status.startsWith("Published")
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="py-4 opacity-50 text-[10px]">
                        {new Date(post.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedPost(post)}
                            className="px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 text-[10px] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => handleDelete(post.post_id)}
                            className="p-1 rounded-lg hover:bg-rose-500/10 text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10 opacity-60 font-semibold text-xs">
                Your Content Library is currently empty. Input parameters above to populate drafts.
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
