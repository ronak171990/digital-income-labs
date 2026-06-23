import { useState, useEffect } from "react";
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ARTICLES, 
  CATEGORIES 
} from "./data";
import { 
  Product, 
  Article, 
  NewsletterSubscription, 
  IntegrationSettings 
} from "./types";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ReviewsView from "./components/ReviewsView";
import ReviewTemplateView from "./components/ReviewTemplateView";
import CategoryView from "./components/CategoryView";
import BlogView from "./components/BlogView";
import AdminView from "./components/AdminView";
import StaticPages from "./components/StaticPages";

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<string>("home");
  const [currentParams, setCurrentParams] = useState<any>(null);

  // Core Persisted Database State
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  console.log(products);
  const [subscribers, setSubscribers] = useState<NewsletterSubscription[]>([]);
  const [settings, setSettings] = useState<IntegrationSettings>({
    googleAnalyticsId: "G-LABS2026",
    pinterestTagId: "PIN-AUDIT993",
    customAffiliateDisclosure: "",
  });

  // Initial Load from localStorage
  useEffect(() => {
    // 1. Products
    const storedProducts = localStorage.getItem("labs_products");
    if (storedProducts) {
      try {
        const parsed = JSON.parse(storedProducts);
        const isLegacy = parsed.length !== INITIAL_PRODUCTS.length || parsed.some((p: any) => !p.pricing || typeof p.pricing !== 'object' || !p.officialWebsite || (p.slug === 'smartagentx-bundle' && !p.bestFor) || (p.slug === 'onemanarmy-ai-bundle' && !p.pricing.tiers) || (p.slug === 'shopreelai-premium' && (!p.pricing.tiers || p.pricing.salePrice === '$67')) || (p.slug === '7-figure-accelerator' && (!p.pricing.tiers || p.pricing.regularPrice === '$497')) || (p.slug === 'get-paid-to-review-apps' && (p.pricing.salePrice === '$27' || !p.seoTitle)) || (p.slug === 'get-paid-to-use-facebook-twitter-youtube' && p.pricing.regularPrice === '$37') || (p.slug === 'vid-fortune-ai' && (!p.seoTitle || p.pricing.regularPrice === '$97')) || (p.slug === 'youtube-content-king' && (!p.seoTitle || p.pricing.salePrice === '$97')));
        if (isLegacy) {
          setProducts(INITIAL_PRODUCTS);
          localStorage.setItem("labs_products", JSON.stringify(INITIAL_PRODUCTS));
        } else {
          setProducts(parsed);
        }
      } catch (e) {
        setProducts(INITIAL_PRODUCTS);
      }
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem("labs_products", JSON.stringify(INITIAL_PRODUCTS));
    }

    // 2. Articles
    const storedArticles = localStorage.getItem("labs_articles");
    if (storedArticles) {
      try {
        setArticles(JSON.parse(storedArticles));
      } catch (e) {
        setArticles(INITIAL_ARTICLES);
      }
    } else {
      setArticles(INITIAL_ARTICLES);
      localStorage.setItem("labs_articles", JSON.stringify(INITIAL_ARTICLES));
    }

    // 3. Subscribers
    const storedSubscribers = localStorage.getItem("labs_subscribers");
    if (storedSubscribers) {
      try {
        setSubscribers(JSON.parse(storedSubscribers));
      } catch (e) {
        setSubscribers([]);
      }
    } else {
      // Seed a couple demo leads to make admin view look professional immediately
      const demoSubscribers: NewsletterSubscription[] = [
        {
          id: "sub-1",
          name: "Ronak Patel",
          email: "ronakpatel171990@gmail.com",
          timestamp: new Date("2026-06-17T12:00:00Z").toISOString(),
        },
        {
          id: "sub-2",
          name: "Alice Vance",
          email: "alice@sideincome.net",
          timestamp: new Date("2026-06-16T15:30:00Z").toISOString(),
        }
      ];
      setSubscribers(demoSubscribers);
      localStorage.setItem("labs_subscribers", JSON.stringify(demoSubscribers));
    }

    // 4. Settings
    const storedSettings = localStorage.getItem("labs_settings");
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (e) {
        // default settings remain
      }
    }
  }, []);

  // Sync state modifications to Local Storage beautifully
  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("labs_products", JSON.stringify(updatedProducts));
  };

  const handleUpdateArticles = (updatedArticles: Article[]) => {
    setArticles(updatedArticles);
    localStorage.setItem("labs_articles", JSON.stringify(updatedArticles));
  };

  const handleUpdateSettings = (updatedSettings: IntegrationSettings) => {
    setSettings(updatedSettings);
    localStorage.setItem("labs_settings", JSON.stringify(updatedSettings));
  };

  const handleDeleteSubscriber = (email: string) => {
    const filtered = subscribers.filter((s) => s.email !== email);
    setSubscribers(filtered);
    localStorage.setItem("labs_subscribers", JSON.stringify(filtered));
  };

  // Sync view state with browser's URL path or hash (supporting manual reload/direct entry of "/admin")
  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === "/admin" || path === "/admin/" || hash === "#/admin" || hash === "#admin" || hash === "admin") {
        setCurrentView("admin");
        setCurrentParams(null);
      } else if (path === "/reviews" || path === "/reviews/" || hash === "#/reviews" || hash === "#reviews") {
        setCurrentView("reviews");
        setCurrentParams(null);
      } else if (path === "/blog" || path === "/blog/" || hash === "#/blog" || hash === "#blog") {
        setCurrentView("blog");
        setCurrentParams(null);
      } else if (path === "/about" || path === "/about/" || hash === "#/about" || hash === "#about") {
        setCurrentView("about");
        setCurrentParams(null);
      } else if (path === "/contact" || path === "/contact/" || hash === "#/contact" || hash === "#contact") {
        setCurrentView("contact");
        setCurrentParams(null);
      } else if (path.startsWith("/reviews/") || hash.startsWith("#/reviews/")) {
        const slug = path.startsWith("/reviews/") ? path.slice(9) : hash.slice(10);
        if (slug) {
          setCurrentView("review-detail");
          setCurrentParams(slug);
        }
      } else if (path.startsWith("/blog/") || hash.startsWith("#/blog/")) {
        const slug = path.startsWith("/blog/") ? path.slice(6) : hash.slice(7);
        if (slug) {
          setCurrentView("blog-detail");
          setCurrentParams(slug);
        }
      } else if (path.startsWith("/category/") || hash.startsWith("#/category/")) {
        const name = path.startsWith("/category/") ? decodeURIComponent(path.slice(10)) : decodeURIComponent(hash.slice(11));
        if (name) {
          setCurrentView("category");
          setCurrentParams(name);
        }
      } else if (path.startsWith("/legal/") || hash.startsWith("#/legal/")) {
        const type = path.startsWith("/legal/") ? path.slice(7) : hash.slice(8);
        if (type) {
          setCurrentView("legal");
          setCurrentParams(type);
        }
      }
    };

    handleUrlRouting();
    window.addEventListener("popstate", handleUrlRouting);
    return () => window.removeEventListener("popstate", handleUrlRouting);
  }, []);

  // Navigations Orchestrator
  const handleNavigate = (view: string, params: any = null) => {
    setCurrentView(view);
    setCurrentParams(params);
    // Smooth scroll back to standard top coordinates of browser viewport
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Sync path/hash so a manual reload or direct copy/paste behaves correctly
    try {
      if (view === "admin") {
        window.history.pushState(null, "", "/admin");
      } else if (view === "home") {
        window.history.pushState(null, "", "/");
      } else if (view === "reviews") {
        window.history.pushState(null, "", "/reviews");
      } else if (view === "blog") {
        window.history.pushState(null, "", "/blog");
      } else if (view === "about") {
        window.history.pushState(null, "", "/about");
      } else if (view === "contact") {
        window.history.pushState(null, "", "/contact");
      } else if (view === "category") {
        window.history.pushState(null, "", `/category/${encodeURIComponent(params)}`);
      } else if (view === "review-detail") {
        window.history.pushState(null, "", `/reviews/${params}`);
      } else if (view === "blog-detail") {
        window.history.pushState(null, "", `/blog/${params}`);
      } else if (view === "legal") {
        window.history.pushState(null, "", `/legal/${params}`);
      }
    } catch (e) {
      console.warn("History API pushState failed, using fallback navigation", e);
    }
  };

  // Track outbound referral click event
  const handleTrackClick = (productId: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, clicks: (p.clicks || 0) + 1 };
      }
      return p;
    });
    handleUpdateProducts(updated);
    
    // Simulate Custom Google Analytics or Pinterest Conversion Event logger
    console.log(`[SEO TELEMETRY EVENT] Triggered outlink redirection to partner vendor database!`, {
      productId,
      gaId: settings.googleAnalyticsId,
      pinTag: settings.pinterestTagId,
      timestamp: new Date().toISOString()
    });
  };

  // Newsletter subscription handler
  const handleSubscribe = (name: string, email: string): boolean => {
    const emailExists = subscribers.some(
      (s) => s.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (emailExists) {
      return false; // already registered
    }

    const newSub: NewsletterSubscription = {
      id: `sub-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      timestamp: new Date().toISOString(),
    };

    const updated = [newSub, ...subscribers];
    setSubscribers(updated);
    localStorage.setItem("labs_subscribers", JSON.stringify(updated));
    return true; // success
  };

  // View switch logic mapping
  const renderMainView = () => {
    switch (currentView) {
      case "home":
        return (
          <HomeView
            products={products}
            articles={articles}
            onNavigate={handleNavigate}
            onTrackClick={handleTrackClick}
            onSubscribe={handleSubscribe}
          />
        );
      
      case "category":
        return (
          <CategoryView
            categoryName={currentParams || "AI Tools"}
            products={products}
            articles={articles}
            onNavigate={handleNavigate}
            onTrackClick={handleTrackClick}
          />
        );

      case "reviews":
        return (
          <ReviewsView
            products={products}
            onNavigate={handleNavigate}
            onTrackClick={handleTrackClick}
          />
        );

      case "review-detail":
        const targetProduct = products.find((p) => p.slug === currentParams);
        if (targetProduct) {
          return (
            <ReviewTemplateView
              product={targetProduct}
              products={products}
              articles={articles}
              onNavigate={handleNavigate}
              onTrackClick={handleTrackClick}
            />
          );
        }
        // Fallback if not found
        return (
          <ReviewsView
            products={products}
            onNavigate={handleNavigate}
            onTrackClick={handleTrackClick}
          />
        );

      case "blog":
        return (
          <BlogView
            articles={articles}
            products={products}
            onNavigate={handleNavigate}
          />
        );

      case "blog-detail":
        return (
          <BlogView
            articles={articles}
            products={products}
            selectedArticleSlug={currentParams}
            onNavigate={handleNavigate}
          />
        );

      case "admin":
        return (
          <AdminView
            products={products}
            articles={articles}
            subscribers={subscribers}
            settings={settings}
            onUpdateProducts={handleUpdateProducts}
            onUpdateArticles={handleUpdateArticles}
            onUpdateSettings={handleUpdateSettings}
            onDeleteSubscriber={handleDeleteSubscriber}
          />
        );

      case "about":
        return <StaticPages pageType="about" onNavigate={handleNavigate} />;
      
      case "contact":
        return <StaticPages pageType="contact" onNavigate={handleNavigate} />;

      case "legal":
        return <StaticPages pageType={currentParams || "privacy"} onNavigate={handleNavigate} />;

      default:
        return (
          <HomeView
            products={products}
            articles={articles}
            onNavigate={handleNavigate}
            onTrackClick={handleTrackClick}
            onSubscribe={handleSubscribe}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between">
      <div>
        {/* Responsive Header */}
        <Navbar 
          currentView={currentView} 
          onNavigate={handleNavigate} 
          isAdmin={true} 
        />

        {/* Dynamic Navigation Content Viewport */}
        <main className="relative">
          {renderMainView()}
        </main>
      </div>

      {/* Trust Footer with disclosure overrides */}
      <Footer 
        onNavigate={handleNavigate} 
        disclosureText={settings.customAffiliateDisclosure || undefined}
      />
    </div>
  );
}
