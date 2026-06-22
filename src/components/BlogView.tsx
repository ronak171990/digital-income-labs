import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Search, BookOpen, Clock, User, ArrowLeft, ArrowRight, Share2, Sparkles,
  AlertTriangle, Award, CheckCircle, ShieldCheck, Users, Video, Palette, 
  FileText, Briefcase, Copy, Heart, MessageSquare, Laptop, Phone, ExternalLink, Calendar,
  ChevronRight
} from "lucide-react";
import { Article, Product } from "../types";


interface BlogViewProps {
  articles: Article[];
  products?: Product[];
  selectedArticleSlug?: string;
  onNavigate: (view: string, params?: any) => void;
}

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'side-hustle-card' | 'hr' | 'blockquote';
  text?: string;
  isSub?: boolean;
  id?: string;
  listItems?: string[];
  // Side Hustle Card specific fields
  shNumber?: string;
  shTitle?: string;
  shDesc?: string;
  shIncome?: string;
  shRequirement?: string;
  shLinkedProduct?: string;
}

export default function BlogView({ articles, products = [], selectedArticleSlug, onNavigate }: BlogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // If a slug is explicitly specified, rendered in Article Detail Mode
  const activeArticle = articles.find((a) => a.slug === selectedArticleSlug);

  // Scroll tracking for progress indicator
  useEffect(() => {
    if (!activeArticle) return;
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeArticle]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackToBlog = () => {
    onNavigate("blog");
  };

  const filteredArticles = articles.filter((a) => {
    return (
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Extract Side Hustle card details or specific items
  const renderSideHustleIcon = (shNumber: string, title: string) => {
    const t = title.toLowerCase();
    if (t.includes("feedback") || t.includes("review")) return <ShieldCheck className="h-5 w-5 text-blue-600" />;
    if (t.includes("moderator") || t.includes("social")) return <Users className="h-5 w-5 text-purple-600" />;
    if (t.includes("youtube") || t.includes("video")) return <Video className="h-5 w-5 text-rose-600" />;
    if (t.includes("designer") || t.includes("product") || t.includes("etsy")) return <Palette className="h-5 w-5 text-amber-600" />;
    if (t.includes("copy") || t.includes("write")) return <FileText className="h-5 w-5 text-emerald-600" />;
    return <Briefcase className="h-5 w-5 text-indigo-600" />;
  };

  if (activeArticle) {
    // Compile content blocks for advanced layouts
    const rawParagraphs = activeArticle.content.split("\n\n");
    const blocks: ContentBlock[] = [];
    let headingIdx = 0;

    for (let i = 0; i < rawParagraphs.length; i++) {
      const para = rawParagraphs[i].trim();
      if (!para) continue;

      if (para === "---") {
        blocks.push({ type: 'hr' });
        continue;
      }

      // Check if it's a side hustle heading e.g., "### 1. User Interface Feedback Partner"
      const sideHustleHeadingMatch = para.match(/^###\s+(\d+)\.\s+(.*)$/);
      if (sideHustleHeadingMatch && activeArticle.slug === "25-side-hustle-ideas-for-beginners") {
        const shNumber = sideHustleHeadingMatch[1];
        const shTitle = sideHustleHeadingMatch[2];

        // Look ahead for description and details
        let shDesc = "";
        let shIncome = "";
        let shRequirement = "";
        let shLinkedProduct = "";

        // Next block could be description
        if (i + 1 < rawParagraphs.length && !rawParagraphs[i + 1].startsWith("#") && !rawParagraphs[i + 1].startsWith("*")) {
          shDesc = rawParagraphs[i + 1].trim();
          i++; // Consume description
        }

        // Next block or lookahead could be the list items containing Details
        if (i + 1 < rawParagraphs.length && rawParagraphs[i + 1].startsWith("*")) {
          const listText = rawParagraphs[i + 1].trim();
          const lines = listText.split("\n");
          lines.forEach(line => {
            if (line.includes("Potential Income:")) {
              shIncome = line.replace(/^\*\s*\*\*Potential Income:\*\*\s*/, "").replace(/^\*\s*Potential Income:\s*/, "").replace(/\[.*?\]/g, "").trim();
            } else if (line.includes("Requirement:")) {
              shRequirement = line.replace(/^\*\s*\*\*Requirement:\*\*\s*/, "").replace(/^\*\s*Requirement:\s*/, "").trim();
            }
          });
          i++; // Consume list factors
        }

        // Map to internal tools based on keywords
        const lowerTitle = shTitle.toLowerCase();
        const lowerDesc = shDesc.toLowerCase();
        if (lowerTitle.includes("feedback") || lowerDesc.includes("review apps")) {
          shLinkedProduct = "get-paid-to-review-apps";
        } else if (lowerTitle.includes("moderator") || lowerDesc.includes("facebook") || lowerDesc.includes("youtube") || lowerDesc.includes("twitter")) {
          shLinkedProduct = "get-paid-to-use-facebook-twitter-youtube";
        } else if (lowerTitle.includes("youtube") || lowerTitle.includes("faceless") || lowerDesc.includes("vid fortune") || lowerDesc.includes("youtube content")) {
          shLinkedProduct = "vid-fortune-ai";
        } else if (lowerTitle.includes("product designer") || lowerDesc.includes("budget") || lowerDesc.includes("etsy")) {
          shLinkedProduct = "shopreelai-premium";
        }

        blocks.push({
          type: 'side-hustle-card',
          shNumber,
          shTitle,
          shDesc,
          shIncome,
          shRequirement,
          shLinkedProduct,
          id: `h-sh-${shNumber}-${shTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
        });
        continue;
      }

      // Normal head identifiers
      if (para.startsWith("### ")) {
        const text = para.replace("### ", "");
        blocks.push({
          type: 'heading',
          isSub: true,
          text,
          id: `h-sub-${headingIdx++}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
        });
      } else if (para.startsWith("## ")) {
        const text = para.replace("## ", "");
        blocks.push({
          type: 'heading',
          isSub: false,
          text,
          id: `h-main-${headingIdx++}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
        });
      } else if (para.startsWith("* ")) {
        const items = para.split("\n").map(li => li.replace("* ", ""));
        blocks.push({
          type: 'list',
          listItems: items
        });
      } else if (para.startsWith("> ")) {
        blocks.push({
          type: 'blockquote',
          text: para.replace(/^>\s*/, "")
        });
      } else {
        blocks.push({
          type: 'paragraph',
          text: para
        });
      }
    }

    // Dynamic Top Table of Contents generator
    const headings = blocks.filter(b => b.type === 'heading' || b.type === 'side-hustle-card').map(b => ({
      text: b.type === 'side-hustle-card' ? `${b.shNumber}. ${b.shTitle}` : (b.text || ""),
      id: b.id || "",
      isSub: b.type === 'heading' ? b.isSub : true
    }));

    const handleScrollToHeading = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    // Internal recommendations extraction from product dataset
    const relatedReviews = products.filter(p => p.slug !== "7-figure-accelerator").slice(0, 2);
    const recommendedTools = products.filter(p => p.rating && p.rating >= 4.7).slice(0, 3);
    const otherGuides = articles.filter(a => a.slug !== activeArticle.slug).slice(0, 2);

    return (
      <div className="bg-slate-50/20 min-h-screen pb-16 relative" id={`article-page-${activeArticle.slug}`}>
        
        {/* Sticky reading progress indicator */}
        <div className="fixed top-0 left-0 w-full h-[4px] bg-slate-100 z-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-75"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>

        {/* Dynamic SEO coordinates updates */}
        <Helmet>
  <title>Blog | The Digital Income Labs</title>

  <meta
    name="description"
    content="Read the latest articles on AI tools, side hustles, passive income ideas and digital products."
  />

  <link
    rel="canonical"
    href="https://thedigitalincomelabs.com/blog"
  />
</Helmet>

        {/* Hero Section Container */}
        <div className="bg-white border-b border-slate-100 py-10 sm:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            {/* Nav Back Header */}
            <div className="flex justify-between items-center pb-6 mb-6 border-b border-slate-100">
              <button
                onClick={handleBackToBlog}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Side Hustles Blog
              </button>
              <span className="text-[10px] font-mono text-purple-600 font-extrabold uppercase bg-purple-50 px-2.5 py-1 rounded-sm tracking-wider">
                EDITORIAL MASTERCLASS
              </span>
            </div>

            {/* Article Head Title styling */}
            <header className="space-y-6">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[10px] font-extrabold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-blue-100">
                <Sparkles className="h-3.5 w-3.5" />
                {activeArticle.category}
              </span>
              
              <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight lg:leading-[1.15]">
                {activeArticle.title}
              </h1>

              {/* Enhanced detailed metadata */}
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400 font-medium pt-1">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <User className="h-4 w-4 text-blue-500" />
                  By <strong>{activeArticle.author}</strong>
                </span>
                <span className="text-slate-250 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="h-4 w-4 text-purple-500" />
                  {activeArticle.readTime}
                </span>
                <span className="text-slate-250 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  Last Updated: <span className="font-semibold text-slate-800">{activeArticle.date || "June 19, 2026"}</span>
                </span>
              </div>

              {/* Estimated Reading progress indicator bar */}
              <div className="pt-3 border-t border-slate-100 max-w-md">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                  <span>Estimated Reading Commitment</span>
                  <span className="text-blue-600 font-bold">{activeArticle.readTime}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(30, parseInt(activeArticle.readTime) * 8))}%` }}
                  />
                </div>
              </div>
            </header>

            {/* Featured Image with heavy branding */}
            <div className="mt-8 sm:mt-10 rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/80 aspect-video relative max-h-[500px] shadow-lg group cursor-pointer bg-slate-50">
              <img 
                src={activeArticle.pinterestImageUrl || "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80"}
                alt={activeArticle.title} 
                onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${activeArticle.slug}/1200/800`; }}
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>

        {/* Central Article Grid Layout */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Primary Main content */}
            <div className="lg:col-span-8 space-y-10 relative" id="article-main-body">
              
              {/* Sticky Social share panel on absolute hover track */}
              <div className="hidden xl:block absolute -left-16 top-0 w-10">
                <div className="sticky top-28 bg-white border border-slate-200/70 rounded-full p-2 shadow-md flex flex-col items-center gap-3.5">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest relative pt-1 [writing-mode:vertical-lr] select-none">
                    SHARE
                  </span>
                  <button 
                    onClick={() => {
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(activeArticle.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                    }}
                    className="text-slate-400 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer"
                    title="Share on X"
                  >
                    <span className="font-black text-[10px]">𝕏</span>
                  </button>
                  <button 
                    onClick={() => {
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                    }}
                    className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer"
                    title="Share on Facebook"
                  >
                    <span className="font-extrabold text-[10px]">FB</span>
                  </button>
                  <hr className="w-4 border-slate-100" />
                  <button 
                    onClick={handleShare}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${copied ? "text-emerald-600 bg-emerald-50" : "text-slate-400 hover:text-purple-600 hover:bg-purple-50"}`}
                    title="Copy Link Address"
                  >
                    {copied ? <span className="font-bold text-xs">✓</span> : <Share2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Dynamic block rendering */}
              <div className="prose prose-slate max-w-4xl text-slate-800 text-[16px] leading-[1.8] space-y-8">
                {blocks.map((block, index) => {
                  
                  // Side hustle card
                  if (block.type === 'side-hustle-card') {
                    return (
                      <div 
                        id={block.id} 
                        key={index} 
                        className="bg-white border-2 border-slate-100 hover:border-blue-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start relative group my-8"
                      >
                        {/* Circle badge of Idea */}
                        <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/70 shadow-3xs">
                          {renderSideHustleIcon(block.shNumber || "1", block.shTitle || "")}
                        </div>

                        {/* Title text & info details */}
                        <div className="flex-grow space-y-4">
                          <div>
                            <span className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1 uppercase tracking-wider">
                              SIDE HUSTLE IDEA #{block.shNumber}
                            </span>
                            <h4 className="font-sans font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-blue-600 transition-colors mt-2.5">
                              {block.shTitle}
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed mt-2 font-medium">
                              {block.shDesc}
                            </p>
                          </div>

                          {/* Specific stats */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {block.shIncome && (
                              <div className="flex items-center gap-3 bg-emerald-50/40 border border-emerald-100/60 p-3 rounded-2xl text-emerald-950">
                                <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider">Potential Income</span>
                                <span className="font-bold text-sm text-emerald-800">{block.shIncome}</span>
                              </div>
                            )}
                            {block.shRequirement && (
                              <div className="flex items-center gap-3 bg-indigo-50/40 border border-indigo-100/60 p-3 rounded-2xl text-indigo-950">
                                <span className="font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider">Requirement</span>
                                <span className="font-bold text-sm text-indigo-800">{block.shRequirement}</span>
                              </div>
                            )}
                          </div>

                          {/* Trigger outbound flow */}
                          {block.shLinkedProduct && (
                            <div className="pt-2">
                              <button
                                onClick={() => onNavigate("review-detail", block.shLinkedProduct)}
                                className="inline-flex items-center gap-2 text-xs font-bold bg-slate-900 hover:bg-blue-600 text-white hover:text-white px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer hover:shadow-md"
                              >
                                Read Digital Labs Review
                                <ArrowRight className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // Heading renders
                  if (block.type === 'heading') {
                    if (block.isSub) {
                      return (
                        <h3 
                          id={block.id} 
                          key={index} 
                          className="font-sans font-extrabold text-xl sm:text-2xl text-slate-800 pt-6 pb-2 transition-colors scroll-mt-24"
                        >
                          {block.text}
                        </h3>
                      );
                    } else {
                      return (
                        <h2 
                          id={block.id} 
                          key={index} 
                          className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 pt-8 pb-3 border-b border-slate-100 transition-colors scroll-mt-24"
                        >
                          {block.text}
                        </h2>
                      );
                    }
                  }

                  // Lists styling and bullet conversions
                  if (block.type === 'list') {
                    return (
                      <div key={index} className="bg-slate-50 border border-slate-150/40 p-6 md:p-8 rounded-3xl my-6 space-y-4 shadow-3xs">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block pb-1">Verified Evaluation Checklist</span>
                        <ul className="space-y-3.5">
                          {block.listItems?.map((li, i) => (
                            <li key={i} className="flex items-start gap-3.5 text-slate-700 font-semibold text-sm">
                              <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold">
                                ✓
                              </span>
                              <span>{li}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  // Blockquotes styling
                  if (block.type === 'blockquote') {
                    return (
                      <blockquote key={index} className="bg-slate-50 border-l-[6px] border-slate-300 italic px-6 py-4.5 rounded-r-2xl text-slate-700 font-medium">
                        "{block.text}"
                      </blockquote>
                    );
                  }

                  // Divider
                  if (block.type === 'hr') {
                    return <hr key={index} className="border-t border-slate-200/80 my-8" />;
                  }

                  // Normal paragraph or customized Callouts
                  if (block.text) {
                    const ltext = block.text.toLowerCase();
                    
                    // Match Editor's note warning / alert triggers
                    if (ltext.includes("editor's note")) {
                      return (
                        <div key={index} className="bg-amber-50/70 border-l-[6px] border-amber-500 rounded-r-2xl p-6 shadow-3xs text-sm leading-7 text-amber-900 flex gap-4 items-start border border-y-amber-100 border-r-amber-100">
                          <BookOpen className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span className="font-extrabold uppercase tracking-wider text-[11px] text-amber-800 block">Editor's Verification Note</span>
                            <p className="font-medium text-amber-950/80 text-[14px]">
                              {block.text.replace(/^(Editor's Note:|\*\*Editor's Note:\*\*)\s*/i, "")}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    // Match Tips/Guidelines callout
                    if (ltext.startsWith("tips for side hustle success") || ltext.includes("core best practices")) {
                      return (
                        <div key={index} className="bg-blue-50/70 border-l-[6px] border-blue-500 rounded-r-2xl p-6 shadow-3xs text-sm leading-7 text-blue-950 flex gap-4 items-start border border-y-blue-100 border-r-blue-100">
                          <Sparkles className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="space-y-2">
                            <span className="font-extrabold uppercase tracking-wider text-[11px] text-blue-700 block">Pro Hustler Guidance</span>
                            <div className="font-medium text-slate-800 text-[14px] space-y-2">
                              {block.text.split("\n").map((line, lidx) => (
                                <p key={lidx}>{line.replace(/^###?\s*/, "")}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Match Risk Warning callout
                    if (ltext.includes("results vary") || ltext.includes("disclaimers:") || ltext.includes("warning:")) {
                      return (
                        <div key={index} className="bg-rose-50/70 border-l-[6px] border-rose-500 rounded-r-2xl p-6 shadow-3xs text-sm leading-7 text-rose-950 flex gap-4 items-start border border-y-rose-100 border-r-rose-100">
                          <AlertTriangle className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span className="font-extrabold uppercase tracking-wider text-[11px] text-rose-700 block">Transparency & Outcomes warning</span>
                            <p className="font-medium text-rose-950/80 text-[13.5px]">
                              {block.text}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    // Match Key Takeaway callout
                    if (ltext.includes("takeaway") || ltext.includes("ultimate framework") || ltext.includes("key takeaway")) {
                      return (
                        <div key={index} className="bg-purple-50/70 border-l-[6px] border-purple-500 rounded-r-2xl p-6 shadow-3xs text-sm leading-7 text-purple-950 flex gap-4 items-start border border-y-purple-100 border-r-purple-100">
                          <Award className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span className="font-extrabold uppercase tracking-wider text-[11px] text-purple-700 block">Strategic Key Takeaway</span>
                            <p className="font-medium text-purple-950/80 text-[14px] leading-relaxed">
                              {block.text}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <p key={index} className="text-slate-700 text-[15px] sm:text-[16px] leading-[1.8] my-4">
                        {block.text}
                      </p>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Central Disclosure */}
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/50 text-xs text-slate-500 leading-relaxed space-y-2">
                <p>
                  <strong>Risk Free Disclaimer:</strong> Digital Income Labs® is an independent, user-supported evaluation agency. We prioritize giving clear blueprints over marketing pitches. Products mentioned may pay commission support. We only accept systems that we personally evaluation or run internally.
                </p>
              </div>

              {/* Share Engagement toolbar bottom */}
              <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="font-bold text-sm block">Help other digital creators succeed!</span>
                  <span className="text-slate-400">Share this masterclass breakdown with your partner circles:</span>
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer text-white"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    {copied ? "Copied!" : "Copy URL"}
                  </button>
                </div>
              </div>

            </div>

            {/* Desktop Sticky Table of Contents Column */}
            <div className="lg:col-span-4 hidden lg:block sticky top-28 self-start space-y-6">
              
              {/* Central TOC panel */}
              {headings.length > 0 && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Table of Contents
                    </span>
                  </div>
                  <nav className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {headings.map((h, i) => (
                      <button
                        key={i}
                        onClick={() => handleScrollToHeading(h.id)}
                        className={`w-full text-left text-xs leading-relaxed transition-all cursor-pointer font-semibold block rounded px-2.5 py-1.5 ${
                          h.isSub 
                            ? "pl-6 text-slate-400 hover:text-blue-500 border-l border-slate-100 font-medium hover:border-blue-400" 
                            : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                        }`}
                      >
                        {h.text}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* Extra Widget Panel: Recommended Tools */}
              <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-indigo-100/70 rounded-2xl p-5 space-y-4">
                <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-widest block">Recommended Master Tools</span>
                <div className="space-y-3">
                  {recommendedTools.map((tool, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => onNavigate("review-detail", tool.slug)}
                      className="bg-white p-3 rounded-xl border border-indigo-100 hover:border-indigo-400 cursor-pointer shadow-3xs hover:shadow-xs transition-all flex items-center gap-3 group"
                    >
                      <div className="h-8 w-8 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0">
                        <img 
                          src={tool.imageUrl} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-xs font-bold text-slate-900 truncate group-hover:text-blue-650 transition-colors">{tool.name}</span>
                        <span className="block text-[10px] text-amber-500 font-extrabold">{tool.rating || "4.8"} ★★★★★</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Internal Linking Widgets Panel at End */}
          <div className="pt-16 mt-16 border-t border-slate-200/80 space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Related Reviews */}
              <div className="space-y-4">
                <h4 className="font-sans font-extrabold text-sm uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Related Product Reviews
                </h4>
                <div className="space-y-3">
                  {relatedReviews.map((rev, i) => (
                    <div 
                      key={i}
                      onClick={() => onNavigate("review-detail", rev.slug)}
                      className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-150 cursor-pointer shadow-3xs hover:shadow-xs transition-all flex gap-3.5 group"
                    >
                      <div className="bg-slate-50 w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                        <img src={rev.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{rev.name}</h5>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{rev.category}</p>
                        <span className="text-[10px] text-amber-500 font-bold block mt-1">{rev.rating} ★★★★★</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Guides / Continue Reading */}
              <div className="space-y-4">
                <h4 className="font-sans font-extrabold text-sm uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  Related Master Guides
                </h4>
                <div className="space-y-3">
                  {otherGuides.map((art, i) => (
                    <div 
                      key={i}
                      onClick={() => onNavigate("blog-detail", art.slug)}
                      className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-purple-150 cursor-pointer shadow-3xs hover:shadow-xs transition-all flex gap-3.5 group"
                    >
                      <div className="bg-slate-50 w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                        <img src={art.pinterestImageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-purple-600 transition-colors">{art.title}</h5>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">By {art.author}</p>
                        <span className="inline-flex items-center gap-1 text-[10px] text-purple-600 font-extrabold uppercase mt-1">{art.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Product Spotlight */}
              <div className="space-y-4">
                <h4 className="font-sans font-extrabold text-sm uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-600 animate-pulse" />
                  Recommended Business Tools
                </h4>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50/70 p-5 rounded-3xl border border-indigo-100/50 space-y-4">
                  <span className="bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-widest">SPOTLIGHT TOOL</span>
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-900">SmartAgentX Control Center</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                      Unify leads, copywriting templates, social funnels, and automated campaign workflows in a single hub.
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate("review-detail", "smartagentx-bundle")}
                    className="w-full py-2 bg-indigo-600 hover:bg-slate-900 text-white text-[11px] font-black rounded-lg transition"
                  >
                    Read Detailed Review
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Large Premium CTA section at the very bottom */}
          <div className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-900 text-white rounded-[2.5rem] p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
            
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="max-w-2xl mx-auto space-y-4 relative">
              <span className="bg-blue-500/20 text-white border border-blue-400/45 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                JOIN DIGITAL INCOME LABS®
              </span>
              <h3 className="font-sans font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                Ready to Start Your Side Hustle?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Explore verified AI tools, side hustles, and beginner-friendly income opportunities. Replace guesswork with proven systems.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3.5">
                <button
                  onClick={() => onNavigate("reviews")}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs sm:text-sm uppercase rounded-2xl shadow-md transition cursor-pointer"
                >
                  Explore Reviews
                </button>
                <button
                  onClick={() => onNavigate("blog")}
                  className="px-6 py-3.5 bg-indigo-500/25 hover:bg-indigo-500/50 text-white font-extrabold border border-indigo-400/40 text-xs sm:text-sm uppercase rounded-2xl transition cursor-pointer"
                >
                  Browse Guides
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // LISTING / BLOG DIRECTORY PAGE
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in" id="blog-listing">
      
      {/* SEO metadata */}
      <Helmet>
        <title>Blog | The Digital Income Labs</title>

      <meta
        name="description"
        content="Read the latest articles about AI tools, side hustles and passive income opportunities."
      />

      <link
        rel="canonical"
        href="https://thedigitalincomelabs.com/blog"
      />
      </Helmet>

      {/* Header Copy */}
      <div className="text-center max-w-2xl mx-auto space-y-3.5">
        <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100">
          Digital Dispatches
        </span>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          The Side Hustle Dispatch & Blog
        </h1>
        <p className="text-slate-550 text-[15px] leading-relaxed">
          Actionable blueprints, software roundups, and online commerce handbooks verified by our team.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-3xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search guides, strategies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Articles Grid Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onNavigate("blog-detail", article.slug)}
            className="bg-white rounded-3xl border border-slate-100 hover:border-blue-100 p-5 shadow-3xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Image Preview */}
              <div className="aspect-video relative rounded-2xl overflow-hidden mb-4 bg-slate-55 bg-slate-50">
                <img 
                  src={article.pinterestImageUrl || "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"}
                  alt={article.title} 
                  onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${article.slug}/600/400`; }}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full border shadow-sm">
                  {article.category}
                </span>
              </div>

              {/* Meta information */}
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mb-2">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {article.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>

              {/* Title links */}
              <h3 className="font-sans font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                {article.title}
              </h3>

              {/* Short excerpt */}
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                {article.excerpt}
              </p>
            </div>

            {/* Read actions */}
            <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              <span className="inline-flex items-center gap-1">
                Read Masterclass Guide
                <Sparkles className="h-3 w-3 text-purple-600 fill-purple-100 animate-pulse" />
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-all" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
