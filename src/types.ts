export interface PriceTier {
  name: string;
  price: string;
  regularPrice?: string;
  features?: string[];
}

export interface ProductPricing {
  regularPrice?: string;
  salePrice?: string;
  couponCode?: string;
  refundPolicy?: string;
  tiers?: PriceTier[];
  customPricingText?: string;
  commission?: string;
  vendor?: string;
  paymentType?: string;
}

export interface ReviewSection {
  quickVerdict: string;
  whatIs: string;
  features: string[];
  benefits: string[];
  whoIsItFor: string[];
  pros: string[];
  cons: string[];
  verdict: string;
  faqs: { question: string; answer: string }[];
  comparison: [
  {
    feature: "One Dashboard",
    oneManArmy: true,
    traditionalTools: false
  }
];
useCases: [
  {
    title: "Faceless Affiliate Business",
    description: "Build a TikTok Shop affiliate business without showing your face."
  },
  {
    title: "Multiple Niches",
    description: "Create content across Beauty, Tech, Fitness, Pets and more."
  },
  {
    title: "Agency Services",
    description: "Create affiliate video systems for clients and charge premium fees."
  }
],  

  recommendedFor?: string[];
  notIdealFor?: string[];
}

export interface ProductScore {
  overall: number;
  easeOfUse: number;
  features: number;
  valueForMoney: number;
  support: number;
}

export interface ProductCTA {
  text: string;
  buttonText: string;
  couponCode?: string;
}

export interface Product {
  id: string;
  slug: string; // e.g. "smartagentx-bundle"
  name: string;
  tagline: string;
  shortDescription: string;
  category: string;
  rating: number; // e.g. 4.8
  officialWebsite?: string;
  affiliateLink: string;
  imageUrl: string;
  pinterestImageUrl?: string;
  review: ReviewSection;
  featured: boolean;
  clicks: number;
  pricing: ProductPricing;
  score?: ProductScore;
  cta?: ProductCTA;
  couponCode?: string;
  regularPrice?: string;
  discountPrice?: string;
  refundPolicy?: string;
  bestFor?: string;
  badge?: string;
  salePrice?: string;
  savings?: string;
  updatedDate?: string;
  quickVerdict?: string;
  recommended?: boolean;
  affiliateDisclosure?: string;
  ctaSecondaryText?: string;
  seoTitle?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich HTML-supported string
  category: string;
  readTime: string;
  date: string;
  author: string;
  pinterestImageUrl?: string;
}

export interface ClickLog {
  id: string;
  productId: string;
  productName: string;
  timestamp: string;
  referrer: string;
}

export interface NewsletterSubscription {
  id: string;
  name: string;
  email: string;
  timestamp: string;
}

export interface IntegrationSettings {
  googleAnalyticsId: string;
  pinterestTagId: string;
  customAffiliateDisclosure: string;
}
