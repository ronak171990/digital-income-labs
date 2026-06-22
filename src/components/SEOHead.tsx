import { useEffect } from "react";
import { Product, Article } from "../types";

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  type?: "website" | "article" | "product";
  product?: Product;
  article?: Article;
}

export default function SEOHead({
  title,
  description,
  url = "https://thedigitalincomelabs.com",
  type = "website",
  product,
  article,
}: SEOHeadProps) {
  useEffect(() => {
    // Dynamically update head elements
    if (title.includes("Digital Income Labs")) {
      document.title = title;
    } else {
      document.title = `${title} | Digital Income Labs®`;
    }

    // Set meta description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Dynamic schema tags injection
    const existingSchema = document.getElementById("labs-ld-json");
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaScript = document.createElement("script");
    schemaScript.id = "labs-ld-json";
    schemaScript.type = "application/ld+json";

    let schemaData: any = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Digital Income Labs®",
      "url": "https://thedigitalincomelabs.com",
      "description": "Discover side hustle ideas, AI tools, passive income opportunities, and online business products.",
    };

    if (type === "product" && product) {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.imageUrl,
        "description": product.shortDescription,
        "brand": {
          "@type": "Brand",
          "name": product.name,
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "89",
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": "17.00",
          "highPrice": "297.00",
          "offerCount": "2",
        },
      };
    } else if (type === "article" && article) {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.excerpt,
        "image": article.pinterestImageUrl || "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
        "datePublished": "2026-06-12",
        "author": {
          "@type": "Person",
          "name": article.author,
        },
        "publisher": {
          "@type": "Organization",
          "name": "Digital Income Labs®",
          "logo": {
            "@type": "ImageObject",
            "url": "https://thedigitalincomelabs.com/icon.png",
          },
        },
      };
    }

    schemaScript.innerHTML = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(schemaScript);

    // Clean up
    return () => {
      const el = document.getElementById("labs-ld-json");
      if (el) el.remove();
    };
  }, [title, description, type, product, article]);

  return null; // Side-effect only
}

// Visual layout helper for generating dynamic SEO inspection assets for admins
export function SEOInspectionTools({
  products,
  articles,
}: {
  products: Product[];
  articles: Article[];
}) {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://thedigitalincomelabs.com/</loc>
    <lastmod>2026-06-17</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${products
  .map(
    (p) => `  <url>
    <loc>https://thedigitalincomelabs.com/${p.slug}-review</loc>
    <lastmod>2026-06-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
${articles
  .map(
    (a) => `  <url>
    <loc>https://thedigitalincomelabs.com/blog/${a.slug}</loc>
    <lastmod>2026-06-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return { sitemapXml };
}
