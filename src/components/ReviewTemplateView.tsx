import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Star, ShieldCheck, Check, AlertTriangle, ArrowLeft, ExternalLink, Calendar, User, LayoutGrid, Award, CheckSquare, X } from "lucide-react";
import { Product, Article } from "../types";

interface ReviewTemplateViewProps {
  product: Product;
  products?: Product[];
  articles?: Article[];
  onNavigate: (view: string, params?: any) => void;
  onTrackClick: (productId: string) => void;
}

export default function ReviewTemplateView({ 
  product, 
  products = [], 
  articles = [], 
  onNavigate, 
  onTrackClick 
}: ReviewTemplateViewProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.imageUrl);
  const [showSticky, setShowSticky] = useState(false);
  const isVidFortune = product.slug === "vid-fortune-ai";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOutboundClick = () => {
    onTrackClick(product.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const r = product.review;

console.log("Slug:", product.slug);
console.log("Product:", product);
console.log("Review:", product.review);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in" id={`review-page-${product.slug}`}>
      <Helmet>
  
 

  {/* Open Graph */}
  <meta property="og:type" content="article" />
  <meta property="og:title" content={product.seoTitle} />
  <meta property="og:description" content={product.shortDescription} />
  <meta
    property="og:url"
    content={`https://thedigitalincomelabs.com/reviews/${product.slug}`}
  />
  <meta property="og:image" content={product.imageUrl} />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={product.seoTitle} />
  <meta
    name="twitter:description"
    content={product.shortDescription}
  />
  <meta name="twitter:image" content={product.imageUrl} />

  {/* Review Schema */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Review",

      author: {
        "@type": "Person",
        name: "Ronak Patel"
      },

      publisher: {
        "@type": "Organization",
        name: "The Digital Income Labs",
        url: "https://thedigitalincomelabs.com"
      },

      itemReviewed: {
        "@type": "SoftwareApplication",
        name: product.name,
        image: product.imageUrl,
        description: product.shortDescription,
        applicationCategory: product.category,
        operatingSystem: "Web"
      },

      reviewRating: {
        "@type": "Rating",
        ratingValue: product.rating,
        bestRating: "5"
      }
    })}
  </script>

  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",

    "mainEntity":
      product.faqs?.map((faq) => ({
        "@type": "Question",

        "name": faq.question,

        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      })) || []
  })}
</script>

{/* Breadcrumb Schema */}
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://thedigitalincomelabs.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reviews",
        item: "https://thedigitalincomelabs.com/reviews"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://thedigitalincomelabs.com/reviews/${product.slug}`
      }
    ]
  })}
</script>

</Helmet>

      {/* Dynamic SEO Injector */}
      

      {/* Back and Breadcrumbs Navigation */}
      <div className="space-y-4 pb-4 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate("reviews")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all reviews
          </button>
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
            UPDATED FOR 2026
          </span>
        </div>
        
        {/* Dynamic Breadcrumbs */}
        <nav className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 flex-wrap">
          <button onClick={() => onNavigate("home")} className="hover:text-blue-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate("reviews")} className="hover:text-blue-600 transition-colors">Reviews</button>
          <span>/</span>
          <span className="text-slate-600 font-semibold truncate">{product.name} Review</span>
        </nav>
      </div>

      {/* Hero Header */}
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Trust Badge */}
          <span className="bg-amber-50 text-amber-800 text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-lg border border-amber-200/70 inline-flex items-center gap-1.5 shadow-2xs">
            ⭐ Digital Income Labs Expert Review
          </span>
          <span className="bg-blue-50 text-blue-800 text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-lg border border-blue-100 inline-flex items-center">
            {product.category}
          </span>
          <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 text-xs font-extrabold text-emerald-800 shadow-2xs">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating} / 5 Rating</span>
          </div>
        </div>

        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight tracking-tight">
          {product.name}™ | Official Site #1 – Features, Pricing & Verdict
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
          {product.tagline} Is this automated software system worth the price tag in 2026? Find out in our transparent, deep-dive analyst report.
        </p>

        {/* Author metadata panel */}
        <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              RP
            </div>
            <div>
              <span className="block font-bold text-slate-800">Ronak Patel</span>
              <span className="block text-[10px]">Senior Affiliate Lab Editor</span>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <div>
            <span className="block text-slate-400">Date Published</span>
            <span className="block font-bold text-slate-800">June 17, 2026</span>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <div>
            <span className="block text-slate-400">Verification</span>
            <span className="block font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 fill-emerald-50" /> Test-Verified Vetted
            </span>
          </div>
        </div>

        {/* Affiliate Disclosure if configured in product */}
        {product.affiliateDisclosure && (
          <div className="text-[11px] text-slate-400 italic bg-blue-50/20 border border-blue-100/30 rounded-xl px-4 py-2.5 text-left flex items-start gap-2">
            <span className="text-blue-500 font-bold not-italic shrink-0">ℹ️ Disclosure:</span>
            <span>{product.affiliateDisclosure}</span>
          </div>
        )}
      </header>

      {/* Primary Grid Layout: Column Main & Sidebar */}
      <div className={`grid grid-cols-1 gap-8 ${isVidFortune ? "lg:grid-cols-[1fr_370px]" : "lg:grid-cols-3"}`}>
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10" id="review-content">
          
          {/* Main Visual Image Card */}
          <div className="rounded-2xl overflow-hidden border border-slate-100 aspect-video bg-slate-50 shadow-xs relative">
            <img 
              src={imgSrc} 
              alt={product.name} 
              onError={() => setImgSrc(`https://picsum.photos/seed/${product.slug}/600/400`)}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.pinterestImageUrl && (
              <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[10px] text-slate-500 font-mono px-3 py-1 rounded-md border border-slate-200 shadow-sm">
                Pinterest Pin Included
              </span>
            )}
          </div>

          {/* Quick Verdict Highlights Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-left">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-sans font-extrabold text-xs text-slate-800 uppercase tracking-widest">
                  LAB RATING & VERDICT
                </h3>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shrink-0">
                RECOMMENDED: YES ✅
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-slate-200 pb-4">
              <div>
                <span className="text-slate-400 block mb-0.5">Rating:</span>
                <span className="font-extrabold text-slate-900 text-sm">{product.rating} / 5.0 ⭐</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Pricing:</span>
                <span className="font-extrabold text-blue-600 text-sm">
                  {product.pricing?.salePrice || product.discountPrice || "Discount Active"}
                </span>
              </div>
              {(product.pricing?.refundPolicy || product.refundPolicy) && (
                <div>
                  <span className="text-slate-400 block mb-0.5">Guarantee:</span>
                  <span className="font-bold text-emerald-600 text-[11px] leading-tight">
                    {product.pricing?.refundPolicy || product.refundPolicy}
                  </span>
                </div>
              )}
              <div>
                <span className="text-slate-400 block mb-0.5">Best For:</span>
                <span className="font-bold text-slate-700 text-[10px] leading-tight line-clamp-2">
                  {product.bestFor || product.tagline || "Digital Businesses"}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                Quick Verdict:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {product.review?.quickVerdict || r.verdict}
              </p>
            </div>
          </div>

          {/* SECTION 1: What Is */}
          <section className="space-y-4">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
              What Is {product.name}?
            </h2>
            <div className="text-slate-700 text-sm leading-relaxed space-y-3">
              <p>{r.whatIs}</p>
            </div>
          </section>

          {/* SECTION 2: Features */}
          <section className="space-y-4">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
              Key Features analyzed
            </h2>
            <p className="text-xs text-slate-500">
              The platform incorporates the subsequent functional mechanisms engineered to maximize output speeds:
            </p>
            <ul className="space-y-2.5">
              {r.features.map((feat, index) => (
                <li key={index} className="flex items-start gap-2.5 text-slate-700 text-sm">
                  <span className="h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 border border-blue-100">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* SECTION 3: Benefits */}
          <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-sans font-bold text-lg text-slate-900">
              Expected Client Benefits
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {r.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 items-start text-xs text-slate-700">
                  <CheckSquare className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-800">Benefit {index + 1}</span>
                    {benefit}
                  </div>
                </div>
              ))}
            </ul>
          </section>

          {/* SECTION 4: Who Is It For */}
          <section className="space-y-4">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight text-left">
              Who Should Buy {product.name}?
            </h2>
            
            {r.recommendedFor && r.notIdealFor ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {/* Recommended For (Green) */}
                <div className="bg-emerald-50/25 border border-emerald-100 p-5 rounded-2xl space-y-3.5 text-left">
                  <span className="inline-block font-sans font-extrabold text-[10px] text-emerald-800 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                    Recommended For
                  </span>
                  <ul className="space-y-2.5">
                    {r.recommendedFor?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 text-xs text-left">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Ideal For (Amber/Red) */}
                <div className="bg-rose-50/15 border border-rose-100 p-5 rounded-2xl space-y-3.5 text-left">
                  <span className="inline-block font-sans font-extrabold text-[10px] text-rose-800 uppercase tracking-widest bg-rose-50 border border-rose-100 px-2.5 py-1 rounded">
                    Not Ideal For
                  </span>
                  <ul className="space-y-2.5">
                    {r.notIdealFor?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 text-xs text-left">
                        <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <p className="text-slate-600 text-xs text-left">
                  This digital workspace is highly appropriate for:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {r.whoIsItFor.map((target, index) => (
                    <div key={index} className="p-3.5 bg-white border border-slate-100 rounded-xl flex items-center gap-2.5 shadow-3xs text-left">
                      <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                      <span className="text-xs font-semibold text-slate-700">{target}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* SECTION: Comparison */}
<section className="space-y-4">
  <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
    Comparison
  </h2>

  <span className="text-xs text-slate-400 block mb-2">
    We compared the key capabilities and pricing to help you evaluate this product objectively:
  </span>

  <div className="overflow-x-auto">
    <table className="w-full border border-slate-200 rounded-2xl overflow-hidden bg-white">
      <thead className="bg-slate-50">
        <tr className="border-b border-slate-200">
          <th className="p-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Feature
          </th>

          <th className="p-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-700">
            {product.name}
          </th>

          <th className="p-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Traditional Tools
          </th>
        </tr>
      </thead>

      <tbody>
        {r.comparison?.map((item, idx) => (
          <tr
            key={idx}
            className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <td className="p-4 text-sm font-semibold text-slate-700">
              {item.feature}
            </td>

            <td className="p-4 text-center text-sm font-medium text-slate-700">
              {item.oneManArmy === true
                ? "✅"
                : item.oneManArmy === false
                ? "❌"
                : item.oneManArmy}
            </td>

            <td className="p-4 text-center text-sm font-medium text-slate-700">
              {item.traditionalTools === true
                ? "✅"
                : item.traditionalTools === false
                ? "❌"
                : item.traditionalTools}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

          {/* SECTION 5: Pros & Cons */}
          <section className="space-y-4">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
              Pros & Cons Analysis
            </h2>
            <span className="text-xs text-slate-400 block mb-2">
              We assessed core strengths and limitations to guarantee an objective product overview:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Pros column */}
              <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-2xl space-y-3">
                <span className="text-emerald-800 font-extrabold text-xs tracking-wider uppercase bg-emerald-100 px-2.5 py-1 rounded-sm">
                  PROS
                </span>
                <ul className="space-y-2">
                  {r.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-xs text-left">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons column */}
              <div className="bg-amber-50/40 border border-amber-100 p-5 rounded-2xl space-y-3">
                <span className="text-amber-800 font-extrabold text-xs tracking-wider uppercase bg-amber-100 px-2.5 py-1 rounded-sm">
                  CONSTRAINTS
                </span>
                <ul className="space-y-2">
                  {r.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-xs text-left">
                      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </section>

          {/* SECTION 6: Pricing */}
          <section className="space-y-6 bg-purple-50/30 border border-purple-100 p-6 rounded-2xl">
            <div className="space-y-2">
              <h2 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
                Pricing Options
              </h2>
              {product.pricing?.customPricingText ? (
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {product.pricing.customPricingText}
                </p>
              ) : (
                <>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    The {product.name} is currently available in multiple launch structures. The standard Regular Price is normally listed up to{" "}
                    <span className="font-bold text-slate-500 line-through">{product.pricing?.regularPrice || product.regularPrice || "$97"}</span>. However, during the active launch window, you can purchase it with substantial introductory discounts.
                  </p>
                  {(product.pricing?.couponCode || product.couponCode) && (
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Be sure to use coupon promo code <span className="font-mono bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded font-bold text-amber-800">{product.pricing?.couponCode || product.couponCode}</span> at the checkout to capture this maximum available value.
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Premium Tiers Render */}
            {product.pricing?.tiers && product.pricing.tiers.length > 0 && (
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 gap-5 pt-1 ${isVidFortune ? "items-start" : ""}`}
                style={isVidFortune ? { alignItems: "flex-start" } : undefined}
              >
                {product.pricing.tiers.map((tier, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white border border-slate-200/65 rounded-2xl p-5 shadow-xs flex flex-col hover:border-purple-300 hover:shadow-xs transition-all text-left ${
                      isVidFortune ? "h-auto space-y-3" : "justify-between space-y-4"
                    }`}
                    style={isVidFortune ? { height: "auto" } : undefined}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <h4 className="font-sans font-extrabold text-slate-900 text-sm tracking-wide uppercase">
                          {tier.name}
                        </h4>
                        {tier.regularPrice && (
                          <span className="text-[11px] text-slate-400 font-medium line-through shrink-0">
                            Valued: {tier.regularPrice}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-slate-900 font-black text-2xl tracking-tight">{tier.price}</span>
                      </div>

                      {tier.features && tier.features.length > 0 && (
                        <ul className="space-y-1.5 pt-1.5">
                          {tier.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-slate-600 text-xs text-left">
                              <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(product.pricing?.refundPolicy || product.refundPolicy) && (
              <div className="pt-2">
                <p className="text-xs text-slate-500 italic bg-white/70 border border-purple-100/60 rounded-xl px-4 py-2.5 text-left flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">🛡️ Guarantee:</span>
                  <span>Your investment is fully covered and risk-free, protected by a secure <strong>{product.pricing?.refundPolicy || product.refundPolicy}</strong>.</span>
                </p>
              </div>
            )}
          </section>

          {/* SECTION 7: Our Rating */}
{product.score && (
  <section className="space-y-6 bg-white border border-slate-200 p-6 rounded-2xl">
    <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
      ⭐ Our Rating
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-4 bg-slate-50 rounded-xl">
        <span className="text-xs text-slate-500">Overall</span>
        <p className="text-2xl font-black text-blue-600">
          {product.score.overall}/5
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl">
        <span className="text-xs text-slate-500">Ease of Use</span>
        <p className="text-xl font-bold">
          {product.score.easeOfUse}/5
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl">
        <span className="text-xs text-slate-500">Features</span>
        <p className="text-xl font-bold">
          {product.score.features}/5
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl">
        <span className="text-xs text-slate-500">
          Value For Money
        </span>
        <p className="text-xl font-bold">
          {product.score.valueForMoney}/5
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl sm:col-span-2">
        <span className="text-xs text-slate-500">Support</span>
        <p className="text-xl font-bold">
          {product.score.support}/5
        </p>
      </div>
    </div>
  </section>
)}

          {/* SECTION 8: Special Offer */}
{product.cta && (
  <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white space-y-4">
    <h2 className="font-sans font-extrabold text-2xl">
      {product.cta.text}
    </h2>

    {product.cta.couponCode && (
      <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-lg">
        <span>Coupon Code:</span>
        <span className="font-mono font-black">
          {product.cta.couponCode}
        </span>
      </div>
    )}

    <a
      href={product.affiliateLink}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onClick={handleOutboundClick}
      className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-extrabold hover:scale-105 transition"
    >
      {product.cta.buttonText}
      <ExternalLink className="h-4 w-4" />
    </a>
      <div className="flex justify-center gap-4 text-xs text-white/80 mt-4">
  <span>🔒 Secure Checkout</span>
  <span>💳 One-Time Payment</span>
  <span>🛡️ 30-Day Guarantee</span>
</div>

  </section>
)}

    {/* SECTION 7: My Verdict */}
          <section className="space-y-4">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
              My Verdict
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed italic border-l-4 border-purple-600 pl-4">
              "{r.verdict}"
            </p>
          </section>

          

          {/* SECTION 8: Frequently Asked Questions */}
          <section className="space-y-4">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3">
              {r.faqs?.map((faq, index) => (
                <div key={index} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                  <span className="block font-bold text-xs text-slate-800">
                    Q: {faq.question}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A: {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Author Box for EEAT Verification */}
          <div className="border border-slate-200 bg-slate-50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 mt-10">
            <div className="h-14 w-14 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-extrabold text-white text-lg shadow-md shrink-0">
              RP
            </div>
            <div className="text-center md:text-left space-y-1">
              <div>
                <h4 className="font-sans font-extrabold text-slate-900 text-sm">Ronak Patel</h4>
                <p className="text-[10px] font-semibold text-slate-500">Data Analyst | AI Enthusiast | Digital Income Researcher</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Helping people discover side hustles, AI tools, and online business opportunities.
              </p>
            </div>
          </div>

          {/* Related Reviews (SEO & navigation boost) */}
          <div className="space-y-4 pt-10 border-t border-slate-100 mt-10">
            <h3 className="font-sans font-extrabold text-slate-800 text-sm uppercase tracking-wider">Related Reviews You May Also Like:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products
                .filter(p => p.slug !== product.slug)
                .slice(0, 3)
                .map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => onNavigate("review-detail", item.slug)}
                    className="p-4 bg-white hover:bg-slate-50 border border-slate-150 hover:border-blue-100 rounded-xl transition-all cursor-pointer group text-left flex flex-col justify-between space-y-3 shadow-3xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{item.category}</span>
                      <h4 className="font-sans font-extrabold text-xs text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {item.name} Review
                      </h4>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold">{item.badge || "AI Solution"}</span>
                      <span className="text-[10px] font-bold text-blue-600 group-hover:underline">Read →</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Related Articles SEO improvements */}
          <div className="space-y-4 pt-10 border-t border-slate-100 mt-10">
            <h3 className="font-sans font-extrabold text-md text-slate-900 uppercase tracking-wider text-xs text-slate-400">You May Also Like:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles
                .slice(0, 4)
                .map((article, idx) => (
                  <div 
                    key={idx}
                    onClick={() => onNavigate("blog-detail", article.slug)}
                    className="p-4 bg-white hover:bg-slate-50 border border-slate-100 hover:border-blue-100 rounded-xl transition-all cursor-pointer group"
                  >
                    <span className="text-[9px] font-bold text-blue-600 tracking-wider uppercase block mb-1">{article.category || "Insight"}</span>
                    <p className="text-xs font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>

        </div>

        {/* Sidebar Sticky Panel with Conversion Links */}
        <div className="lg:col-span-1">
          <div className={`sticky top-20 bg-white border border-slate-200/80 rounded-2xl shadow-sm ${
            isVidFortune ? "p-6 space-y-8" : "p-5 space-y-6"
          }`}>
            
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono text-blue-600 font-extrabold uppercase bg-blue-50 px-2.5 py-1 rounded-sm">
                OFFICIAL VENDOR PARTNER
              </span>
              <h3 className="font-sans font-extrabold text-lg text-slate-900 pt-1">
                {product.name}
              </h3>
              <p className="text-slate-500 text-xs">
                Launch discounts are currently active. Click the actions below to access.
              </p>
            </div>

            {(product.pricing?.couponCode || product.couponCode) && (
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 text-xs space-y-2 text-left">
                <span className="block font-sans font-extrabold text-[10px] text-amber-800 uppercase tracking-wider">
                  🔥 Special Launch Offer
                </span>
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Regular Price:</span>
                  <span className="line-through text-slate-400">{product.pricing?.regularPrice || product.regularPrice}</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Discount:</span>
                  <span className="text-emerald-600 font-bold">SALE ACTIVE</span>
                </div>
                <div className="flex justify-between font-extrabold text-slate-900 border-t border-amber-150 pt-2 text-xs">
                  <span>Your Special Price:</span>
                  <span className="text-blue-600 font-mono text-sm">{product.pricing?.salePrice || product.discountPrice}</span>
                </div>
                <div className="bg-white border border-amber-100 rounded-lg p-2 flex items-center justify-between mt-1 text-[11px]">
                  <span className="text-slate-500 font-bold">Use Code:</span>
                  <span className="font-mono font-extrabold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded border border-amber-200">
                    {product.pricing?.couponCode || product.couponCode}
                  </span>
                </div>
                {(product.pricing?.refundPolicy || product.refundPolicy) && (
                  <div className="text-[10px] text-slate-500 font-medium pt-1 text-center flex items-center justify-center gap-1 border-t border-amber-100 pt-1.5">
                    <ShieldCheck className="h-3 w-3 text-emerald-600 shrink-0" />
                    <span>{product.pricing?.refundPolicy || product.refundPolicy}</span>
                  </div>
                )}
              </div>
            )}

            <div className={`space-y-3 ${isVidFortune ? "pt-2" : ""}`}>
              {/* Visit button 1 */}
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="nofollow noopener noreferrer"
                onClick={handleOutboundClick}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all shadow-md cursor-pointer ${
                  isVidFortune 
                    ? "px-4 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-blue-100/50" 
                    : "px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs shadow-blue-100"
                }`}
                id="sidebar-official-link-1"
              >
                Visit Official Website
                <ExternalLink className="h-4 w-4" />
              </a>

              {/* Visit button 2 */}
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="nofollow noopener noreferrer"
                onClick={handleOutboundClick}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all shadow-md cursor-pointer ${
                  isVidFortune 
                    ? "px-4 py-3.5 bg-purple-600 hover:bg-purple-700 text-white text-sm shadow-purple-100/50" 
                    : "px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs shadow-purple-100"
                }`}
                id="sidebar-official-link-2"
              >
                {product.ctaSecondaryText || "Get Started Now"}
                <ShieldCheck className="h-4 w-4" />
              </a>
            </div>

            {/* Quick Metrics */}
            <div className={`pt-4 border-t border-slate-100 text-left ${
              isVidFortune 
                ? "space-y-4 text-sm leading-6 text-slate-600 break-words whitespace-normal [word-break:break-word]" 
                : "space-y-2.5 text-xs text-slate-600"
            }`}>
              <div className="flex justify-between">
                <span className="text-slate-400">Our Rating:</span>
                <span className="font-bold text-amber-500">{product.rating} ★★★★★</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="font-semibold text-slate-800">{product.category}</span>
              </div>
              
              {/* Optional Digistore24 / Side Hustle Info */}
              {isVidFortune ? (
                <div className="space-y-1 block py-1.5 border-y border-slate-100 my-1 bg-slate-50/55 p-3 rounded-xl">
                  <span className="block text-slate-400 uppercase tracking-wider text-[10px] font-bold">Current Offer</span>
                  <span className="block font-extrabold text-slate-900 text-sm leading-6">$17.95 One-Time Payment</span>
                  <span className="block text-slate-500 font-semibold text-xs leading-5">Limited-Time Founders Deal</span>
                </div>
              ) : (
                product.pricing?.salePrice && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Price:</span>
                    <span className="font-extrabold text-slate-800">{product.pricing.salePrice}</span>
                  </div>
                )
              )}
              {product.pricing?.commission && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Commission:</span>
                  <span className="font-bold text-emerald-600">{product.pricing.commission}</span>
                </div>
              )}
              {product.pricing?.vendor && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Vendor:</span>
                  <span className="font-semibold text-slate-800">{product.pricing.vendor}</span>
                </div>
              )}
              {product.pricing?.paymentType && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Type:</span>
                  <span className="font-semibold text-slate-800">{product.pricing.paymentType}</span>
                </div>
              )}

              {product.bestFor && (
                <div className="space-y-2 py-1.5">
                  <span className="block text-slate-400 font-medium pb-0.5">Best For:</span>
                  {isVidFortune ? (
                    <div className="flex flex-wrap gap-1.5">
                      {["Affiliate Marketers", "YouTube Creators", "Beginners", "Agencies", "Bloggers"].map((tag, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 shadow-3xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="block font-semibold text-slate-700 bg-slate-50 border border-slate-100 p-2 rounded-lg text-[10px] leading-relaxed">
                      {product.bestFor}
                    </span>
                  )}
                </div>
              )}
              {(product.pricing?.refundPolicy || product.refundPolicy) && !(product.pricing?.couponCode || product.couponCode) && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Guarantee:</span>
                  <span className="font-semibold text-emerald-600">{product.pricing?.refundPolicy || product.refundPolicy}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Secure Direct Partner:</span>
                <span className="font-semibold text-emerald-600">Yes (Verified Link)</span>
              </div>
            </div>

            {/* Social Share / Bookmarking links */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleShare}
                className="w-full text-center text-xs text-purple-700 font-bold hover:underline"
              >
                {copiedLink ? "Link copied to clipboard!" : "Share this expert review"}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Sticky Bottom CTA Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/80 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] py-3 px-4 z-40 transition-all duration-300 transform ${
          showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 bg-blue-50 border border-blue-100 rounded-lg items-center justify-center hidden sm:flex shrink-0">
              <span className="text-sm">🚀</span>
            </div>
            <div className="text-left min-w-0">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">VETTED OFFER</span>
              <h4 className="text-xs font-extrabold text-slate-900 truncate">Access {product.name} Official Website</h4>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate("reviews")}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all hidden sm:inline-block cursor-pointer"
            >
              All Reviews
            </button>
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
              onClick={handleOutboundClick}
              className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold transition-all shadow-md shadow-blue-100 cursor-pointer"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

    </article>
  );
}
