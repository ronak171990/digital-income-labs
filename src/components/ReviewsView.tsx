import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, SlidersHorizontal, ArrowUpDown, Star, LayoutGrid, Info } from "lucide-react";
import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ReviewsViewProps {
  products: Product[];
  onNavigate: (view: string, params?: any) => void;
  onTrackClick: (productId: string) => void;
}

type SortOption = "rating" | "clicks" | "name";

export default function ReviewsView({ products, onNavigate, onTrackClick }: ReviewsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("clicks");

  const categories = ["All", "Side Hustle Ideas", "AI Tools", "Passive Income", "Make Money Online", "Affiliate Marketing", "YouTube Automation"];

  // Filter & search products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "clicks") {
      return b.clicks - a.clicks; // most clicks first
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in" id="reviews-gallery">
      
      
      {/* Header Info */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Product Review Laboratory
        </h2>
        <p className="text-slate-500 text-sm">
          Browse unbiased audits of trending automation packages, e-commerce softwares, and side hustle boards.
        </p>
      </div>

      {/* Control panel (Search & Filters) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs space-y-4">
        
        {/* Row 1: Search & Sort selection */}
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search product name, tagline, features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="clicks">Popularity</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

        </div>

        {/* Row 2: Category Filters Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <SlidersHorizontal className="h-4 w-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Result Status */}
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span>Showing {sortedProducts.length} expert audits</span>
        {selectedCategory !== "All" && (
          <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-sm font-semibold">
            Filtered by: {selectedCategory}
          </span>
        )}
      </div>

      {/* Grid of Product Cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((p) => (
            <ProductCard 
              key={p.id}
              product={p}
              onNavigate={onNavigate}
              onTrackClick={onTrackClick}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <Info className="h-8 w-8 text-slate-400 mx-auto" />
          <h3 className="font-sans font-bold text-slate-800">No audits matches your lookup</h3>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            Try adjusting your search filters, checking the spelling, or resetting your category selections.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-3 inline-flex px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
