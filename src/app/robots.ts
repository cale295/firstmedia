import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/dashboard/", "/api/private/"],
    },
    sitemap: "https://paketfirstmedia.web.id/sitemap.xml", // Replace with your actual deployed URL
  };
}
