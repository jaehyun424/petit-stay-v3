import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/my",
        "/sitter",
        "/partner",
        "/booking/",
        "/checkout/",
        "/book/",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://petit-stay-v3.vercel.app"}/sitemap.xml`,
  };
}
