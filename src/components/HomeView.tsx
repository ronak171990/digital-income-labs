import React, { useState } from "react";
import { 
  ArrowRight, Sparkles, BookOpen, User, Calendar, Clock, 
  CheckCircle, Briefcase, Cpu, TrendingUp, DollarSign, Layers, Tv, Mail 
} from "lucide-react";
import { Product, Article } from "../types";
import ProductCard from "./ProductCard";

interface HomeViewProps {
  products: Product[];
  articles: Article[];
  onNavigate: (view: string, params?: any) => void;
  onTrackClick: (productId: string) => void;
  onSubscribe: (name: string, email: string) => boolean;
}

export default function HomeView({ 
  products, 
  articles, 
  onNavigate, 
  onTrackClick, 
  onSubscribe 
}: HomeViewProps) {
  
  // Newsletter Form State
  const [subName, setSubName] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);
  const [subError, setSubError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Premium Custom Auto-Scroller State & Effect for Product Widget
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    // Scroll speed: 8 pixels per second (unbelievably smooth, ultra-readable, extremely premium)
    const speed = 8; 

    const step = (time: number) => {
      if (!isHovered && scrollContainer) {
        const delta = (time - lastTime) / 1000;
        scrollContainer.scrollTop += speed * delta;

        // Loop back smoothly once we slide near the bottom limit
        if (scrollContainer.scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight - 2) {
          scrollContainer.scrollTop = 0;
        }
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim() || !subEmail.trim()) {
      setSubError("Please complete both your name and email addresses.");
      return;
    }
    const success = onSubscribe(subName, subEmail);
    if (success) {
      setSubSuccess(true);
      setSubError("");
      setSubName("");
      setSubEmail("");
    } else {
      setSubError("This email is already subscribed!");
    }
  };

  // Helper lists of premium indicators for our review widget
  const getPremiumBadge = (idx: number) => {
    const badges = ["Trending", "Editor's Choice", "Beginner Friendly", "Popular", "High Yield", "Top Choice"];
    return badges[idx % badges.length];
  };

  const getPremiumBadgeStyle = (idx: number) => {
    const styles = [
      "bg-rose-50 text-rose-700 border-rose-100",
      "bg-amber-50 text-amber-700 border-amber-100",
      "bg-emerald-50 text-emerald-700 border-emerald-100",
      "bg-indigo-50 text-indigo-700 border-indigo-100",
      "bg-blue-50 text-blue-700 border-blue-100",
      "bg-purple-50 text-purple-700 border-purple-100"
    ];
    return styles[idx % styles.length];
  };

  // Display all 7 products in order
  const allHomeProducts = products.slice(0, 7);

  // Filter products based on search query
  const filteredHomeProducts = allHomeProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter articles based on search query
  const filteredHomeArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Map icons to categories
  const getCategoryIcon = (catName: string) => {
    switch (catName) {
      case "Side Hustle Ideas":
        return <Briefcase className="h-5 w-5 text-blue-600" />;
      case "AI Tools":
        return <Cpu className="h-5 w-5 text-purple-600" />;
      case "Passive Income":
        return <TrendingUp className="h-5 w-5 text-emerald-600" />;
      case "Make Money Online":
        return <DollarSign className="h-5 w-5 text-rose-600" />;
      case "Affiliate Marketing":
        return <Layers className="h-5 w-5 text-amber-600" />;
      case "YouTube Automation":
        return <Tv className="h-5 w-5 text-indigo-600" />;
      default:
        return <TrendingUp className="h-5 w-5 text-slate-600" />;
    }
  };

  const getCategoryBg = (catName: string) => {
    switch (catName) {
      case "Side Hustle Ideas": return "bg-blue-50 border-blue-100/60";
      case "AI Tools": return "bg-purple-50 border-purple-100/60";
      case "Passive Income": return "bg-emerald-50 border-emerald-100/60";
      case "Make Money Online": return "bg-rose-50 border-rose-100/60";
      case "Affiliate Marketing": return "bg-amber-50 border-amber-100/60";
      case "YouTube Automation": return "bg-indigo-50 border-indigo-100/60";
      default: return "bg-slate-50 border-slate-100";
    }
  };

  const categoriesList = [
    "Side Hustle Ideas",
    "AI Tools",
    "Passive Income",
    "Make Money Online",
    "Affiliate Marketing",
    "YouTube Automation"
  ];

  return (
    <div className="space-y-12 pb-20 animate-fade-in" id="homepage-root">
      
      {/* SECTION 1: Premium Interactive Hero Section (Reduced Padding to align higher) */}
      <section className="relative overflow-hidden bg-radial from-slate-100/40 via-white to-white pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Core Copy */}
          <div className="space-y-6 text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
              <Sparkles className="h-3 w-3 fill-blue-100" />
              Verified side hustles for 2026
            </div>
            
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-[54px] tracking-tight text-slate-900 leading-tight">
              Discover Side Hustles, AI Tools & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Passive Income Ideas</span> That Actually Work
            </h1>
            
            <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Discover trusted AI tools, side hustles, and online income opportunities with expert reviews, beginner guides, and actionable insights.
            </p>

            {/* Elegant Interactive Search Bar */}
            <div className="pt-1 max-w-md relative z-20">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search AI Tools, Side Hustles, Reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 pl-10 pr-12 text-xs font-semibold shadow-xs focus:outline-none transition-all placeholder-slate-400 text-slate-800"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => onNavigate("reviews")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold tracking-wide shadow-md shadow-blue-200 transition-all cursor-pointer"
                id="hero-explore-btn"
              >
                Explore Reviews
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => onNavigate("blog")}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-sm font-bold border border-slate-200 shadow-sm transition-all cursor-pointer"
                id="hero-learn-btn"
              >
                Read Beginner Guides
              </button>
            </div>

            {/* Trust Bar below buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold rounded-full border border-amber-100 shadow-3xs">
                <span>⭐</span> 50+ Product Reviews
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-100 shadow-3xs">
                <span>🤝</span> Verified Vendor Partners
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-bold rounded-full border border-indigo-100 shadow-3xs">
                <span>📈</span> Updated Weekly
              </span>
            </div>
          </div>

          {/* Right Column: Premium Pause-on-Hover Infinite Auto-Scrolling Widget */}
          <div className="relative flex justify-center items-center">
            
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-radial from-blue-100 to-purple-100 blur-2xl opacity-75 rounded-full" />
            
            {/* High-contrast premium featured list within PC mockup windows */}
            <div className="relative w-full max-w-md sm:max-w-xl bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2.5xl space-y-4">
              
              {/* Mock Window Controls and Label */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-sans">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-md border border-slate-100 flex items-center gap-1">
                  <span>⚡</span> ACTIVE DIRECTORY RATINGS
                </div>
                <div className="h-2.5 w-2.5" />
              </div>

              {/* Infinite Slow scrolling container (paused on hover) */}
              <div 
                ref={scrollRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="space-y-4 max-h-[350px] overflow-y-auto pr-1 divide-y divide-slate-100 scrollbar-thin select-none cursor-pointer transition-colors duration-150"
              >
                {products.slice(0, 7).map((prod, idx) => {
                  const badgeText = getPremiumBadge(idx);
                  const badgeStyle = getPremiumBadgeStyle(idx);
                  return (
                    <div key={prod.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4 group/item text-left">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shrink-0 relative">
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.name} 
                            onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${prod.slug}/100/100`; }}
                            className="w-full h-full object-cover group-hover/item:scale-105 transition-all"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors truncate">
                              {prod.name}
                            </h4>
                            <span className={`text-[8px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 border rounded-sm flex-shrink-0 ${badgeStyle}`}>
                              {badgeText}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-800">⭐ {prod.rating}/5</span>
                            <span className="text-slate-300 text-[9px]">•</span>
                            <p className="text-[10px] text-slate-500 line-clamp-1">
                              {prod.tagline}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onNavigate("review-detail", prod.slug)}
                        className="shrink-0 px-3 py-1.5 bg-slate-50 hover:bg-blue-600 border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-white transition-all rounded-lg text-[10px] font-bold cursor-pointer inline-flex items-center gap-1"
                      >
                        Read Review
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Trust Statement Bar directly below the hero section */}
      <div className="text-center py-4 bg-slate-50/65 border-b border-slate-100">
        <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
          <span>Independent Reviews</span>
          <span className="text-slate-300">•</span>
          <span>No Sponsored Rankings</span>
          <span className="text-slate-300">•</span>
          <span>Updated Weekly</span>
        </p>
      </div>

      {/* Trust Indicators Bar */}
      <div className="bg-white border-b border-slate-100 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <span className="text-xl shrink-0">✅</span>
              <div>
                <span className="block font-bold text-slate-800 text-xs sm:text-sm">Verified Reviews</span>
                <span className="text-[10px] text-slate-400">100% human-tested systems</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <span className="text-xl shrink-0">✅</span>
              <div>
                <span className="block font-bold text-slate-800 text-xs sm:text-sm">Beginner Friendly Guides</span>
                <span className="text-[10px] text-slate-400">Zero tech experience required</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <span className="text-xl shrink-0">✅</span>
              <div>
                <span className="block font-bold text-slate-800 text-xs sm:text-sm">Updated Weekly</span>
                <span className="text-[10px] text-slate-400">Fresh audits for June 2026</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <span className="text-xl shrink-0">✅</span>
              <div>
                <span className="block font-bold text-slate-800 text-xs sm:text-sm">No Hidden Costs</span>
                <span className="text-[10px] text-slate-400">Free educational content always</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1.8: Digital Cash-flow Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="text-left space-y-2">
              <span className="text-xs font-bold text-amber-600 tracking-wider uppercase bg-amber-50 px-3.5 py-1.5 rounded-full">
                📊 Affiliate Leaderboard
              </span>
              <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
                2026 Recommended Income Solutions Head-to-Head
              </h2>
              <p className="text-slate-500 text-xs text-left">
                Quick-compare verified digital products based on category, utility strengths, and overall tested trust scorecard.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-400 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 self-start md:self-auto uppercase tracking-wider">
              Updated: June 2026
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest bg-slate-50/50">
                  <th className="py-4 px-4 rounded-l-xl text-left">Product</th>
                  <th className="py-4 px-4 text-left">Best For</th>
                  <th className="py-4 px-4 text-left">Category</th>
                  <th className="py-4 px-4 text-left font-mono">Pricing</th>
                  <th className="py-4 px-4 text-left">Rating</th>
                  <th className="py-4 px-4 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((prod, idx) => {
                  const ratingInt = Math.round(prod.rating);
                  const stars = "⭐".repeat(ratingInt) + "☆".repeat(5 - ratingInt);
                  const price = prod.discountPrice || prod.salePrice || prod.regularPrice || "Discount Active";
                  return (
                    <tr 
                      key={prod.slug} 
                      className="hover:bg-slate-50/70 transition-colors text-xs font-semibold text-slate-700"
                    >
                      <td className="py-4 px-4 font-bold text-slate-950 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600 font-bold">{idx + 1}.</span>
                          <button 
                            onClick={() => onNavigate("review-detail", prod.slug)}
                            className="hover:text-blue-600 hover:underline text-left cursor-pointer transition-colors font-bold"
                          >
                            {prod.name}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 text-left font-normal">{prod.bestFor || "Digital Entrepreneurs"}</td>
                      <td className="py-4 px-4 text-left">
                        <span className="px-2.5 py-1 bg-slate-50 border border-slate-100/80 rounded-full font-bold uppercase text-[9px] text-slate-500">
                          {prod.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-left font-mono font-bold text-blue-700">{price}</td>
                      <td className="py-4 px-4 text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-500 tracking-wider text-[11px]">{stars}</span>
                          <span className="text-[10px] text-slate-400 font-bold">({prod.rating})</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => onNavigate("review-detail", prod.slug)}
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold tracking-wider inline-flex items-center gap-1 cursor-pointer transition-all shadow-3xs"
                        >
                          Read Review
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 2: Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full">
            {searchQuery ? "Search Results" : "Expert Product Assessments"}
          </span>
          <h2 className="font-sans font-extrabold text-3xl text-slate-900 tracking-tight">
            {searchQuery ? `Search results for "${searchQuery}"` : "Top Performing Affiliate Solutions & Systems"}
          </h2>
          <p className="text-slate-600 text-sm animate-fade-in">
            {searchQuery 
              ? `Found ${filteredHomeProducts.length} matching reviews and ${filteredHomeArticles.length} articles.` 
              : "Read comprehensive, unbiased reviews parameters including pricing, exact utility benefits, cons worksheets, and direct developer portal pathways."
            }
          </p>
        </div>

        {/* Product Cards Grid */}
        {filteredHomeProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" id="products-grid">
            {filteredHomeProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onNavigate={onNavigate}
                onTrackClick={onTrackClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 border border-slate-100 rounded-2xl p-6 max-w-xl mx-auto">
            <p className="text-sm font-semibold text-slate-600">No matching tools or reviews discovered for "{searchQuery}".</p>
            <button 
              onClick={() => setSearchQuery("")} 
              className="mt-3 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Dynamic Articles Search Results Box */}
        {searchQuery.trim() !== "" && filteredHomeArticles.length > 0 && (
          <div className="mt-12 pt-12 border-t border-slate-100 space-y-6 animate-fade-in">
            <h3 className="font-sans font-extrabold text-lg text-slate-800">Matching Articles ({filteredHomeArticles.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHomeArticles.map((article) => (
                <div 
                  key={article.id}
                  onClick={() => onNavigate("blog-detail", article.slug)}
                  className="p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl cursor-pointer transition-all group flex flex-col justify-between shadow-3xs hover:shadow-sm"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">{article.category}</span>
                    <h4 className="font-sans font-bold text-sm text-slate-900 leading-snug group-hover:text-purple-600 transition-colors">{article.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{article.excerpt}</p>
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 mt-3 group-hover:underline flex items-center gap-1">Read Article <ArrowRight className="h-3 w-3" /></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!searchQuery && (
          <div className="text-center pt-8">
            <button
              onClick={() => onNavigate("reviews")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer"
            >
              Show All Detailed Reviews
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION 3: Categories Section */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
              Explore Income Categories
            </h2>
            <p className="text-slate-500 text-sm">
              Filter reviews and articles by your specific side-income interest.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {categoriesList.map((categoryName) => {
              const matchedProducts = products.filter(p => p.category === categoryName);
              const matchedArticles = articles.filter(a => a.category === categoryName);
              const itemsCount = matchedProducts.length + matchedArticles.length;
              
              return (
                <div 
                  key={categoryName}
                  onClick={() => onNavigate("category", categoryName)}
                  className={`p-5 rounded-2xl border ${getCategoryBg(categoryName)} hover:border-slate-300 transition-all cursor-pointer flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md group`}
                >
                  <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-3">
                    {getCategoryIcon(categoryName)}
                  </div>
                  <h3 className="font-sans font-bold text-xs text-slate-800 leading-tight">
                    {categoryName}
                  </h3>
                  <span className="text-[9px] font-mono text-slate-500 font-semibold px-2 py-0.5 bg-white/80 rounded-md mt-2 border border-slate-100 shadow-3xs">
                    {itemsCount} {itemsCount === 1 ? "resource" : "resources"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-purple-600 tracking-wider uppercase bg-purple-50 px-3 py-1 rounded-full">
              Side Hustle Masterclass
            </span>
            <h2 className="font-sans font-extrabold text-3xl text-slate-900 tracking-tight mt-2">
              Actionable Handbooks & Strategies
            </h2>
          </div>
          <button
            onClick={() => onNavigate("blog")}
            className="text-blue-600 hover:text-blue-700 text-xs font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer"
          >
            Read Digital Blog
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <div 
              key={article.id}
              onClick={() => onNavigate("blog-detail", article.slug)}
              className="bg-white rounded-2xl border border-slate-100 hover:border-purple-100 p-4 shadow-3xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-video relative rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <img 
                    src={article.pinterestImageUrl || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80"} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-base text-slate-800 leading-snug group-hover:text-purple-600 transition-colors mb-2">
                  {article.title}
                </h3>
                
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                <span>Unlock Free Guide</span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4.5: Featured Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2 animate-fade-in">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full">
            In-Depth Analysis
          </span>
          <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
            Featured Product Reviews
          </h2>
          <p className="text-slate-500 text-xs">
            In-depth, unbiased, and hands-on evaluations of top performing digital income systems and AI resources.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((prod) => {
            return (
              <div
                key={prod.slug}
                onClick={() => onNavigate("review-detail", prod.slug)}
                className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 hover:border-blue-100 shadow-3xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <span className="text-sm">⭐</span>
                  <h3 className="font-sans font-extrabold text-sm text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {prod.name} Review
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {prod.tagline}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">RATING:</span>
                      <span className="text-[10px] text-amber-500 font-extrabold flex items-center gap-0.5">
                        {prod.rating} ★★★★★
                      </span>
                    </div>
                  </div>
                </div>
                
                <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 mt-4 group-hover:underline">
                  Read Review →
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: Beautiful Live Newsletter Subscriptions */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl text-center">
          
          {/* Subtle design decals */}
          <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-white/5 blur-xl" />
          <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-white/5 blur-xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex h-12 w-12 rounded-full bg-white/10 items-center justify-center mb-1">
              <Mail className="h-6 w-6 text-white" />
            </div>
            
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
              Get Weekly Side Hustle & AI Income Ideas
            </h2>
            
            <p className="text-blue-100 text-sm max-w-lg mx-auto">
              Join 12,400+ smart side-hustlers. Get our exclusive breakdown of trending income secrets, downloadable Pinterest worksheets, and tool reviews directly in your inbox.
            </p>

            {subSuccess ? (
              <div className="p-4 bg-white/15 rounded-xl border border-white/20 flex flex-col items-center gap-2 animate-scale-up">
                <CheckCircle className="h-8 w-8 text-emerald-300" />
                <span className="font-bold text-sm">Welcome to Digital Income Labs!</span>
                <span className="text-xs text-blue-100">Check your email shortly for your complimentary 2026 Side Hustle Manual.</span>
                <button
                  onClick={() => setSubSuccess(false)}
                  className="mt-2 text-xs text-white underline hover:no-underline"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribeSubmit} className="space-y-3 max-w-md mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Ronak)"
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder-blue-200 border border-white/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:bg-white/20 transition-all text-left"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your best email"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder-blue-200 border border-white/20 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:bg-white/20 transition-all text-left"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-neutral-50 text-blue-700 font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Subscribe to Laboratory Dispatch
                </button>

                {subError && (
                  <p className="text-xs text-rose-200 font-bold mt-1">
                    {subError}
                  </p>
                )}
              </form>
            )}

            <p className="text-[10px] text-blue-200">
              Spam is strictly forbidden. unsubscribe immediately in 1 click at any time.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
