import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  BarChart as ChartIcon, Layers as ProductIcon, Plus, Link2, BookOpen as BlogIcon, 
  Settings as SettingsIcon, Users as UsersIcon, Trash2, Edit as EditIcon, Save, 
  PlusCircle, CheckCircle, ArrowRightCircle, Sparkles, AlertCircle, FileText, Check, FileCheck
} from "lucide-react";
import { Product, Article, NewsletterSubscription, IntegrationSettings } from "../types";

interface AdminViewProps {
  products: Product[];
  articles: Article[];
  subscribers: NewsletterSubscription[];
  settings: IntegrationSettings;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateArticles: (articles: Article[]) => void;
  onUpdateSettings: (settings: IntegrationSettings) => void;
  onDeleteSubscriber: (email: string) => void;
}

type AdminTab = "analytics" | "products" | "blog" | "integrations" | "subscribers";

export default function AdminView({
  products,
  articles,
  subscribers,
  settings,
  onUpdateProducts,
  onUpdateArticles,
  onUpdateSettings,
  onDeleteSubscriber,
}: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");
  const [editProductState, setEditProductState] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // New Product Form State
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("AI Tools");
  const [newProdTagline, setNewProdTagline] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdLink, setNewProdLink] = useState("");
  const [newProdImg, setNewProdImg] = useState("");
  const [newProdPinImg, setNewProdPinImg] = useState("");
  const [newProdRating, setNewProdRating] = useState("4.8");

  // New Article Form State
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [newArtTitle, setNewArtTitle] = useState("");
  const [newArtCategory, setNewArtCategory] = useState("Side Hustle Ideas");
  const [newArtExcerpt, setNewArtExcerpt] = useState("");
  const [newArtContent, setNewArtContent] = useState("");
  const [newArtAuthor, setNewArtAuthor] = useState("Ronak Patel");
  const [newArtPinImg, setNewArtPinImg] = useState("");

  // Integration settings form state
  const [gaId, setGaId] = useState(settings.googleAnalyticsId);
  const [pinId, setPinId] = useState(settings.pinterestTagId);
  const [discText, setDiscText] = useState(settings.customAffiliateDisclosure);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Generate XML Sitemap
  const { sitemapXml } = SEOInspectionTools({ products, articles });

  // Handle Save Integration settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      googleAnalyticsId: gaId,
      pinterestTagId: pinId,
      customAffiliateDisclosure: discText,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product? All reviews and stats will be removed.")) {
      const filtered = products.filter((p) => p.id !== id);
      onUpdateProducts(filtered);
    }
  };

  // Add product submission
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdDesc || !newProdLink) {
      alert("Please populate the name, description and affiliate link parameters.");
      return;
    }
    const slug = newProdName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug,
      name: newProdName,
      tagline: newProdTagline || "Automated tools and passive growth structures.",
      shortDescription: newProdDesc,
      category: newProdCategory,
      rating: parseFloat(newProdRating) || 4.7,
      affiliateLink: newProdLink,
      imageUrl: newProdImg || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      pinterestImageUrl: newProdPinImg || undefined,
      featured: false,
      clicks: 0,
      pricing: {
        regularPrice: "$97",
        salePrice: "$47",
        couponCode: "LAUNCH2026",
        refundPolicy: "30-Day Money-Back Guarantee"
      },
      review: {
        quickVerdict: `We highly recommend ${newProdName} for anyone looking to scale side income models fast.`,
        whatIs: `What is ${newProdName}? This is a powerful automated framework developed to help you streamline digital client management and unlock side hustle opportunities. Test logs reveal robust returns on user operations.`,
        features: [
          "Hyper-speed integration templates.",
          "Dynamic visual configurations.",
          "User feedback channels."
        ],
        benefits: [
          "Saves critical hours weekly.",
          "Minimizes software overhead."
        ],
        whoIsItFor: [
          "Affiliate marketers, side hustlers, digital assistants and freelancers."
        ],
        pros: [
          "Extremely reliable performance metric structures."
        ],
        cons: [
          "Initial orientation tutorials are recommended."
        ],
        verdict: `We highly recommend ${newProdName} for anyone looking to scale side income models fast.`,
        faqs: [
          {
            question: "Is there support provided?",
            answer: "Yes, 24/7 client care desk options are available."
          }
        ]
      }
    };

    onUpdateProducts([newProduct, ...products]);
    setIsAddingProduct(false);
    
    // Reset Form
    setNewProdName("");
    setNewProdTagline("");
    setNewProdDesc("");
    setNewProdLink("");
    setNewProdImg("");
    setNewProdPinImg("");
  };

  // Edit product save
  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProductState) return;

    const updated = products.map((p) => {
      if (p.id === editProductState.id) {
        return editProductState;
      }
      return p;
    });

    onUpdateProducts(updated);
    setEditProductState(null);
  };

  // Add Article submission
  const handleAddArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle || !newArtExcerpt || !newArtContent) {
      alert("Please complete the title, excerpt and detailed content content.");
      return;
    }
    const slug = newArtTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      slug,
      title: newArtTitle,
      excerpt: newArtExcerpt,
      content: newArtContent,
      category: newArtCategory,
      readTime: "7 min read",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      author: newArtAuthor,
      pinterestImageUrl: newArtPinImg || undefined,
    };

    onUpdateArticles([newArticle, ...articles]);
    setIsAddingArticle(false);

    // Reset Form
    setNewArtTitle("");
    setNewArtExcerpt("");
    setNewArtContent("");
    setNewArtPinImg("");
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const filtered = articles.filter((a) => a.id !== id);
      onUpdateArticles(filtered);
    }
  };

  // Calculate stats
  const totalClicks = products.reduce((acc, p) => acc + (p.clicks || 0), 0);
  const maxClicksProduct = products.length > 0 ? [...products].sort((a,b) => b.clicks - a.clicks)[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in" id="admin-view-root">
      
      {/* Header Panel */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 h-44 w-44 bg-purple-600/20 blur-2xl rounded-full" />
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-200 text-[10px] font-bold uppercase tracking-widest rounded-full border border-purple-500/30">
            <Sparkles className="h-3.5 w-3.5 text-purple-300" />
            Live Affiliate command Suite
          </div>
          <h1 className="font-sans font-extrabold text-3xl tracking-tight leading-none">
            Digital Income Labs® <span className="text-blue-400">Admin</span>
          </h1>
          <p className="text-slate-400 text-xs">
            Edit active reviews, customize affiliate redirects, and monitor marketing metrics offline-first in real time.
          </p>
        </div>
        
        {/* Dynamic Counter HUD */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-center">
            <span className="block text-2xl font-extrabold text-blue-400">{totalClicks}</span>
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">Clicks Tracked</span>
          </div>
          <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-center">
            <span className="block text-2xl font-extrabold text-purple-400">{subscribers.length}</span>
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">Subscribers</span>
          </div>
        </div>
      </div>

      {/* Main Tab Controls Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          onClick={() => { setActiveTab("analytics"); setEditProductState(null); setIsAddingProduct(false); setIsAddingArticle(false); }}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "analytics"
              ? "bg-slate-900 text-white font-extrabold"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <ChartIcon className="h-4 w-4" />
          Click Analytics
        </button>
        <button
          onClick={() => { setActiveTab("products"); setEditProductState(null); setIsAddingProduct(false); setIsAddingArticle(false); }}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "products"
              ? "bg-slate-900 text-white font-extrabold"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <ProductIcon className="h-4 w-4" />
          Product Manager ({products.length})
        </button>
        <button
          onClick={() => { setActiveTab("blog"); setEditProductState(null); setIsAddingProduct(false); setIsAddingArticle(false); }}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "blog"
              ? "bg-slate-900 text-white font-extrabold"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <BlogIcon className="h-4 w-4" />
          Blog Publisher
        </button>
        <button
          onClick={() => { setActiveTab("integrations"); setEditProductState(null); setIsAddingProduct(false); setIsAddingArticle(false); }}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "integrations"
              ? "bg-slate-900 text-white font-extrabold"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <SettingsIcon className="h-4 w-4" />
          SEO & Integration
        </button>
        <button
          onClick={() => { setActiveTab("subscribers"); setEditProductState(null); setIsAddingProduct(false); setIsAddingArticle(false); }}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "subscribers"
              ? "bg-slate-900 text-white font-extrabold"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <UsersIcon className="h-4 w-4" />
          Subscribers ({subscribers.length})
        </button>
      </div>

      {/* TAB CONTENT: Click Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Beautiful pure CSS telemetry bar chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-3xs space-y-4">
              <h3 className="font-sans font-bold text-slate-900 text-base">
                Affiliate Outlinks Click Velocity
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Real-time tracking of outbound referrals. Clicks are logged instantly whenever a user triggers a 'Get Started' or 'Visit Website' button.
              </p>
              
              {/* Custom Bar Chart visualization */}
              <div className="space-y-4 pt-4">
                {products.map((p) => {
                  const percentage = totalClicks > 0 ? Math.round((p.clicks / totalClicks) * 100) : 0;
                  return (
                    <div key={p.id} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-800">{p.name}</span>
                        <span className="font-mono text-slate-500">
                          <strong>{p.clicks} clicks</strong> ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.max(percentage, 2)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Key highlights panel */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-3xs space-y-6">
              <h3 className="font-sans font-bold text-slate-900 text-base">
                Telemetry Insights
              </h3>
              
              {maxClicksProduct ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="block font-bold text-emerald-950">Top converting asset</span>
                    <span className="block text-slate-600 leading-relaxed mt-1">
                      <strong>{maxClicksProduct.name}</strong> is currently your highest-converting affiliate page, logging <strong>{maxClicksProduct.clicks}</strong> outbound redirects.
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No click data registered yet.</p>
              )}

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 flex items-start gap-3 text-xs">
                <AlertCircle className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-purple-950 block">Pinterest Pin Setup</span>
                  <p className="text-slate-600 leading-relaxed">
                    To trigger traffic loops, upload a modern Canva Pinterest graphic pinning back directly to e.g. <code>https://digitalincomelabs.com/[product-slug]-review</code>.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: Product Manager */}
      {activeTab === "products" && (
        <div className="space-y-6">
          
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-3xs">
            <span className="text-xs text-slate-500 font-bold">Manage product listing details & outbound referral routes</span>
            {!isAddingProduct && !editProductState && (
              <button
                onClick={() => setIsAddingProduct(true)}
                className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add New Product
              </button>
            )}
          </div>

          {/* Form: Add Product */}
          {isAddingProduct && (
            <div className="bg-white border rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <h3 className="font-bold text-slate-900 text-sm">Create New Product with automatic Review</h3>
                <button 
                  onClick={() => setIsAddingProduct(false)}
                  className="text-xs text-slate-400 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SmartAgentX Bundle"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Side Hustle Ideas">Side Hustle Ideas</option>
                    <option value="AI Tools">AI Tools</option>
                    <option value="Passive Income">Passive Income</option>
                    <option value="Make Money Online">Make Money Online</option>
                    <option value="Affiliate Marketing">Affiliate Marketing</option>
                    <option value="YouTube Automation">YouTube Automation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. Automate social scheduling on complete autopilot"
                    value={newProdTagline}
                    onChange={(e) => setNewProdTagline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Launch Rating (1.0 - 5.0)</label>
                  <input
                    type="text"
                    placeholder="4.8"
                    value={newProdRating}
                    onChange={(e) => setNewProdRating(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Write a highly-converting 2-sentence marketing excerpt summarizing values..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your outlink Affiliate Link</label>
                  <input
                    type="url"
                    required
                    placeholder="e.g. https://jvzoo.com/smartagentx?aff=yourname"
                    value={newProdLink}
                    onChange={(e) => setNewProdLink(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mock Product Image URL</label>
                  <input
                    type="text"
                    placeholder="Leave blank for automatic placeholder visual pattern..."
                    value={newProdImg}
                    onChange={(e) => setNewProdImg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold animate-transition"
                  />
                </div>
                
                <div className="md:col-span-2 pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Save & Create review
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Form: Edit Product */}
          {editProductState && (
            <div className="bg-white border rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <h3 className="font-bold text-slate-900 text-sm">Edit {editProductState.name} Details</h3>
                <button 
                  onClick={() => setEditProductState(null)}
                  className="text-xs text-slate-400 hover:text-slate-800"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSaveEditProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Edit Affiliate Link</label>
                  <input
                    type="text"
                    value={editProductState.affiliateLink}
                    onChange={(e) => setEditProductState({ ...editProductState, affiliateLink: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200  rounded-md p-2.5 text-xs font-semibold focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Edit Image Link</label>
                  <input
                    type="text"
                    value={editProductState.imageUrl}
                    onChange={(e) => setEditProductState({ ...editProductState, imageUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-xs font-semibold focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Edit Short Summary</label>
                  <textarea
                    rows={3}
                    value={editProductState.shortDescription}
                    onChange={(e) => setEditProductState({ ...editProductState, shortDescription: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-xs font-semibold focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pinterest Image (Overlay url Link)</label>
                  <input
                    type="text"
                    value={editProductState.pinterestImageUrl || ""}
                    placeholder="Insert custom Pinterest pinning image link..."
                    onChange={(e) => setEditProductState({ ...editProductState, pinterestImageUrl: e.target.value || undefined })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Website Link</label>
                  <input
                    type="text"
                    value={editProductState.officialWebsite || ""}
                    onChange={(e) => setEditProductState({ ...editProductState, officialWebsite: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Status Clicks (Adjust count)</label>
                  <input
                    type="number"
                    value={editProductState.clicks}
                    onChange={(e) => setEditProductState({ ...editProductState, clicks: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-xs font-semibold"
                  />
                </div>

                {/* Nested Pricing & Verdict edits */}
                <div className="md:col-span-2 border-t pt-4 mt-2">
                  <h4 className="text-xs font-bold text-slate-800 mb-2">Edit Pricing & Special Offer Specifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Regular Price</label>
                      <input
                        type="text"
                        value={editProductState.pricing?.regularPrice || ""}
                        onChange={(e) => setEditProductState({
                          ...editProductState,
                          pricing: {
                            ...(editProductState.pricing || { regularPrice: "", salePrice: "", couponCode: "", refundPolicy: "" }),
                            regularPrice: e.target.value
                          }
                        })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Your Special Price</label>
                      <input
                        type="text"
                        value={editProductState.pricing?.salePrice || ""}
                        onChange={(e) => setEditProductState({
                          ...editProductState,
                          pricing: {
                            ...(editProductState.pricing || { regularPrice: "", salePrice: "", couponCode: "", refundPolicy: "" }),
                            salePrice: e.target.value
                          }
                        })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Promo Coupon Code</label>
                      <input
                        type="text"
                        value={editProductState.pricing?.couponCode || ""}
                        onChange={(e) => setEditProductState({
                          ...editProductState,
                          pricing: {
                            ...(editProductState.pricing || { regularPrice: "", salePrice: "", couponCode: "", refundPolicy: "" }),
                            couponCode: e.target.value
                          }
                        })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Refund Guarantee Policy</label>
                      <input
                        type="text"
                        value={editProductState.pricing?.refundPolicy || ""}
                        onChange={(e) => setEditProductState({
                          ...editProductState,
                          pricing: {
                            ...(editProductState.pricing || { regularPrice: "", salePrice: "", couponCode: "", refundPolicy: "" }),
                            refundPolicy: e.target.value
                          }
                        })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Edit Quick Verdict Synopsis</label>
                  <textarea
                    rows={2}
                    value={editProductState.review?.quickVerdict || ""}
                    onChange={(e) => setEditProductState({
                      ...editProductState,
                      review: {
                        ...(editProductState.review || { quickVerdict: "", whatIs: "", features: [], benefits: [], whoIsItFor: [], pros: [], cons: [], verdict: "", faqs: [] }),
                        quickVerdict: e.target.value
                      }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-xs font-semibold"
                  />
                </div>

                <div className="md:col-span-2 flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Save modifications
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditProductState(null)}
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Central Directory Grid list representation */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-xs">
                <thead className="bg-slate-50 font-bold text-slate-500 text-left">
                  <tr>
                    <th className="px-6 py-3.5">Product Name</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Rating</th>
                    <th className="px-6 py-3.5">Redirect Target Outlink</th>
                    <th className="px-6 py-3.5 text-center">clicks count</th>
                    <th className="px-6 py-3.5 text-right">actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img 
                          src={p.imageUrl} 
                          alt="" 
                          className="h-8 w-8 rounded-sm object-cover bg-slate-100 shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="block font-bold text-slate-900">{p.name}</span>
                          <span className="block text-[10px] text-slate-400 font-mono">/{p.slug}-review</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-sm bg-slate-100 font-semibold">{p.category}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-amber-600">{p.rating} ★</td>
                      <td className="px-6 py-4 max-w-[150px] truncate">
                        <span className="text-[10px] font-mono text-blue-600 underline">
                          {p.affiliateLink}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-slate-900">{p.clicks}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => setEditProductState(p)}
                          className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                          title="Edit link & description"
                        >
                          <EditIcon className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-rose-600 hover:text-rose-900 inline-flex items-center gap-1 ml-2"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: Blog publisher */}
      {activeTab === "blog" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-3xs">
            <span className="text-xs text-slate-500 font-bold">Write, publish, and schedule SEO articles to drive Pinterest loops</span>
            {!isAddingArticle && (
              <button
                onClick={() => setIsAddingArticle(true)}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all cursor-pointer"
              >
                <PlusCircle className="h-4 w-4" />
                Write New Guide Post
              </button>
            )}
          </div>

          {isAddingArticle && (
            <div className="bg-white border rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <h3 className="font-sans font-bold text-slate-900 text-sm">Publish New Side Hustle Guide</h3>
                <button 
                  onClick={() => setIsAddingArticle(false)}
                  className="text-xs text-slate-400 hover:text-slate-800"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleAddArticleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Article title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10 High Yield Side Hustles For 2026"
                      value={newArtTitle}
                      onChange={(e) => setNewArtTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Topic Category</label>
                    <select
                      value={newArtCategory}
                      onChange={(e) => setNewArtCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold focus:outline-none"
                    >
                      <option value="Side Hustle Ideas">Side Hustle Ideas</option>
                      <option value="AI Tools">AI Tools</option>
                      <option value="Passive Income">Passive Income</option>
                      <option value="Make Money Online">Make Money Online</option>
                      <option value="Affiliate Marketing">Affiliate Marketing</option>
                      <option value="YouTube Automation">YouTube Automation</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt (Meta description preview)</label>
                    <input
                      type="text"
                      required
                      placeholder="A short engaging hook summary displaying inside search layouts..."
                      value={newArtExcerpt}
                      onChange={(e) => setNewArtExcerpt(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={newArtAuthor}
                      onChange={(e) => setNewArtAuthor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pinterest Image overlay link (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/promo-image"
                      value={newArtPinImg}
                      onChange={(e) => setNewArtPinImg(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detail Content Markdown Paragraphs</label>
                  <p className="text-[10px] text-slate-400 mb-1">Use <code>### Heading Name</code> for core headings, and leave empty lines to divide structural blocks.</p>
                  <textarea
                    rows={12}
                    required
                    placeholder="### 1. Identify Your Core Strength ... \n\nStarting online models requires deep dedication. Draft your guide structures here..."
                    value={newArtContent}
                    onChange={(e) => setNewArtContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-mono focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Publish toDispatch Feed
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingArticle(false)}
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
                  >
                    Abort
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List of Published Articles */}
          <div className="bg-white border rounded-2xl p-5 shadow-3xs space-y-4">
            <h4 className="font-sans font-bold text-slate-900 text-sm">Published Lab Articles</h4>
            <div className="divide-y text-xs">
              {articles.map((art) => (
                <div key={art.id} className="py-3 flex justify-between items-center hover:bg-slate-50/50 px-2 rounded-sm">
                  <div>
                    <span className="font-bold text-slate-900 block">{art.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">/blog/{art.slug} • Published by {art.author} • {art.date}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold">{art.category}</span>
                    <button
                      onClick={() => handleDeleteArticle(art.id)}
                      className="text-rose-600 hover:text-rose-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: SEO & Integrations */}
      {activeTab === "integrations" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input Form settings */}
            <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-3xs space-y-5">
              <h3 className="font-sans font-bold text-slate-900 text-base">
                Analytics & Pixel Integrations
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Google Analytics Measurement ID</label>
                  <input
                    type="text"
                    placeholder="G-XXXXXXXXXX"
                    value={gaId}
                    onChange={(e) => setGaId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Logs site view distributions and click telemetries automatically.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pinterest Advertising Tag ID</label>
                  <input
                    type="text"
                    placeholder="PIN-XXXXXXXXXX"
                    value={pinId}
                    onChange={(e) => setPinId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Required to bind Pinterest Pin clicks with affiliate outlink records.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Custom Affiliate Disclosure Paragraph</label>
                  <textarea
                    rows={4}
                    value={discText}
                    onChange={(e) => setDiscText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  Save configurations
                </button>
                {settingsSaved && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="h-4 w-4" />
                    Saved successfully!
                  </span>
                )}
              </div>
            </form>

            {/* XML Sitemap & Schema review tool */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-3xs space-y-4">
              <h3 className="font-sans font-bold text-slate-900 text-base flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-purple-600" />
                SEO Verification Assets
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150/60 font-medium">
                  <span className="block font-bold text-slate-800">Crawlable XML Sitemap</span>
                  <p className="text-slate-500 text-[10px] leading-relaxed mt-1">
                    Digital Income Labs automatically structures a compliant XML Sitemap of all review assets and articles to optimize crawler coverage. View structural map below:
                  </p>
                  
                  <textarea
                    readOnly
                    rows={6}
                    value={sitemapXml}
                    className="w-full mt-2 p-2 bg-slate-900 text-slate-300 font-mono text-[9px] rounded-lg select-all border border-slate-800 focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150/60 font-medium">
                  <span className="block font-bold text-slate-800">Dynamic Pinterest Rich Pin Schema</span>
                  <p className="text-slate-500 text-[10px] leading-relaxed mt-1">
                    Structured product microdata (JSON-LD) is actively injected in the HTML Header on every review details page traversal to support Pinterest catalog indexing.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: Subscribers */}
      {activeTab === "subscribers" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-3xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <div>
              <h3 className="font-sans font-bold text-slate-900 text-base">
                Newsletter Subscribers Lead database
              </h3>
              <p className="text-slate-500 text-xs">
                Review and manage reader sign-ups registered via homepage newsletter blocks.
              </p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-sm font-bold">
              {subscribers.length} Emails
            </span>
          </div>

          {subscribers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-xs text-left">
                <thead className="bg-slate-50 font-bold text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Lead name</th>
                    <th className="px-6 py-3">Email Address</th>
                    <th className="px-6 py-3">Subscription Date</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {subscribers.map((sub, index) => (
                    <tr key={sub.id || index} className="hover:bg-slate-50/50">
                      <td className="px-6 py-3.5 font-bold text-slate-900">
                        {sub.name}
                      </td>
                      <td className="px-6 py-3.5 font-mono text-blue-600 underline">
                        {sub.email}
                      </td>
                      <td className="px-6 py-3.5 text-slate-500">
                        {sub.timestamp ? new Date(sub.timestamp).toLocaleString() : "June 17, 2026, 8:45 PM"}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button
                          onClick={() => onDeleteSubscriber(sub.email)}
                          className="text-rose-600 hover:text-rose-900 font-semibold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-slate-400 italic text-xs py-8 text-center">
              No list subscribers currently registered. Test user-signups by inserting values into the home page newsletter section blocks!
            </p>
          )}
        </div>
      )}

    </div>
  );
}
