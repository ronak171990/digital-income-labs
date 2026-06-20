import React from "react";
import { Briefcase, Cpu, TrendingUp, DollarSign, Layers, Tv, ArrowLeft, ArrowRight } from "lucide-react";
import { Product, Article } from "../types";
import ProductCard from "./ProductCard";

interface CategoryViewProps {
  categoryName: string;
  products: Product[];
  articles: Article[];
  onNavigate: (view: string, params?: any) => void;
  onTrackClick: (productId: string) => void;
}

export default function CategoryView({ 
  categoryName, 
  products, 
  articles, 
  onNavigate, 
  onTrackClick 
}: CategoryViewProps) {
  
  const matchedProducts = products.filter((p) => p.category === categoryName);
  const matchedArticles = articles.filter((a) => a.category === categoryName);

  const getCategoryIcon = () => {
    switch (categoryName) {
      case "Side Hustle Ideas":
        return <Briefcase className="h-8 w-8 text-blue-600" />;
      case "AI Tools":
        return <Cpu className="h-8 w-8 text-purple-600" />;
      case "Passive Income":
        return <TrendingUp className="h-8 w-8 text-emerald-600" />;
      case "Make Money Online":
        return <DollarSign className="h-8 w-8 text-rose-600" />;
      case "Affiliate Marketing":
        return <Layers className="h-8 w-8 text-amber-600" />;
      case "YouTube Automation":
        return <Tv className="h-8 w-8 text-indigo-600" />;
      default:
        return <TrendingUp className="h-8 w-8 text-slate-600" />;
    }
  };

  const getHeroClass = () => {
    switch (categoryName) {
      case "Side Hustle Ideas": return "from-blue-500/10 to-transparent border-blue-100";
      case "AI Tools": return "from-purple-500/10 to-transparent border-purple-100";
      case "Passive Income": return "from-emerald-500/10 to-transparent border-emerald-100";
      case "Make Money Online": return "from-rose-500/10 to-transparent border-rose-100";
      case "Affiliate Marketing": return "from-amber-500/10 to-transparent border-amber-100";
      case "YouTube Automation": return "from-indigo-500/10 to-transparent border-indigo-100";
      default: return "from-slate-500/10 to-transparent border-slate-100";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in" id={`category-page-${categoryName.toLowerCase().replace(/\s+/g, "-")}`}>
      
      {/* Back Button Banner */}
      <div>
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to homepage
        </button>
      </div>

      {/* Category Hero Block */}
      <div className={`p-8 sm:p-12 rounded-3xl border bg-gradient-to-br ${getHeroClass()} flex flex-col md:flex-row justify-between items-start md:items-center gap-6`}>
        <div className="space-y-3">
          <div className="h-14 h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
            {getCategoryIcon()}
          </div>
          <h1 className="font-sans font-extrabold text-3xl text-slate-900 tracking-tight">
            {categoryName} Area
          </h1>
          <p className="text-slate-600 text-sm max-w-xl font-normal leading-relaxed">
            Browse our curated reviews, actionable handbooks, and vetted software tools mapped to the {categoryName} sector.
          </p>
        </div>

        {/* Aggregate Counter */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-150/60 shadow-xs text-center min-w-[150px]">
          <span className="block text-3xl font-extrabold text-slate-900 font-sans">
            {matchedProducts.length + matchedArticles.length}
          </span>
          <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-400 uppercase">
            TOTAL RESOURCES
          </span>
        </div>
      </div>

      {/* Products Segment */}
      <div className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="font-sans font-extrabold text-xl text-slate-900">
            Approved products & systems ({matchedProducts.length})
          </h2>
        </div>

        {matchedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedProducts.map((p) => (
              <ProductCard 
                key={p.id}
                product={p}
                onNavigate={onNavigate}
                onTrackClick={onTrackClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-xs italic py-4 bg-slate-50 px-4 rounded-xl border">
            Currently no standalone reviews under this category. Check back shortly as our lab team finishes assessments!
          </p>
        )}
      </div>

      {/* Articles Segment */}
      <div className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="font-sans font-extrabold text-xl text-slate-900">
            Practical Guides & Masterclasses ({matchedArticles.length})
          </h2>
        </div>

        {matchedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => onNavigate("blog-detail", article.slug)}
                className="bg-white rounded-2xl border border-slate-105 hover:border-slate-300 p-5 shadow-3xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <h3 className="font-sans font-bold text-base text-slate-800 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  <span>Start Guide Manual</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-xs italic py-4 bg-slate-50 px-4 rounded-xl border">
            Currently no articles mapped to this specific tag. Explore other categories or browse the central dispatch.
          </p>
        )}
      </div>

    </div>
  );
}
