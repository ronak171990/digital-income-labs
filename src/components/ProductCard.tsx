import React from "react";
import { Star, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onNavigate: (view: string, params?: any) => void;
  onTrackClick: (productId: string) => void;
}

export default function ProductCard({ product, onNavigate, onTrackClick }: ProductCardProps) {
  const [imgSrc, setImgSrc] = React.useState(product.imageUrl);

  React.useEffect(() => {
    setImgSrc(product.imageUrl);
  }, [product.imageUrl]);

  const handleAffiliateClick = (e: React.MouseEvent) => {
    // Call telemetry tracking
    onTrackClick(product.id);
  };

  const getProductBadge = () => {
    const text = product.badge || "⭐ Editor's Choice";
    let colorClassName = "bg-amber-50 border-amber-100 text-amber-700";
    
    const lower = text.toLowerCase();
    if (lower.includes("trend") || lower.includes("hot")) {
      colorClassName = "bg-rose-50 border-rose-100 text-rose-700";
    } else if (lower.includes("beginner") || lower.includes("easy") || lower.includes("free") || lower.includes("save")) {
      colorClassName = "bg-emerald-50 border-emerald-100 text-emerald-700";
    } else if (lower.includes("new")) {
      colorClassName = "bg-blue-50 border-blue-100 text-blue-700";
    } else if (lower.includes("choice") || lower.includes("editor") || lower.includes("best")) {
      colorClassName = "bg-amber-50 border-amber-100 text-amber-700";
    }
    return { text, colorClassName };
  };

  const badge = getProductBadge();

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-100 hover:border-blue-100 p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
      id={`product-card-${product.slug}`}
    >
      <div>
        {/* Product Image and Category overlay */}
        <div className="relative rounded-xl overflow-hidden mb-4 aspect-video bg-slate-100">
          <img 
            src={imgSrc} 
            alt={product.name} 
            onError={() => setImgSrc(`https://picsum.photos/seed/${product.slug}/600/400`)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-slate-100 shadow-sm">
            {product.category}
          </span>
          {product.featured && (
            <span className="absolute top-3 right-3 bg-blue-600 text-white text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              TOP PICK 2026
            </span>
          )}
        </div>

        {/* Dynamic Badge row */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide border ${badge.colorClassName}`}>
            {badge.text}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide border bg-slate-50 border-slate-100 text-slate-400">
            Last Updated: June 2026
          </span>
        </div>

        {/* Title and Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-sans font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-900">{product.rating}</span>
          </div>
        </div>

        {/* Tagline / Subtitle */}
        <p className="text-xs text-slate-500 font-medium mb-3">
          {product.tagline}
        </p>

        {/* Description */}
        <p className="text-slate-600 text-xs leading-relaxed mb-5">
          {product.shortDescription}
        </p>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-50">
        <button
          onClick={() => onNavigate("review-detail", product.slug)}
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold select-none transition-all cursor-pointer"
        >
          Read Review
          <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <a
          href={product.affiliateLink}
          target="_blank"
          rel="nofollow noopener noreferrer"
          onClick={handleAffiliateClick}
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold select-none transition-all shadow-sm shadow-blue-100 hover:shadow-md cursor-pointer"
        >
          Get Started
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
