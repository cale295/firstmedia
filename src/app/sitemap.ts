import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://paketfirstmedia.web.id";

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  try {
    const supabase = await createClient();
    const { data: areas } = await supabase
      .from("areas")
      .select("slug")
      .eq("active", true);

    if (areas) {
      areas.forEach((area) => {
        if (area.slug) {
          routes.push({
            url: `${baseUrl}/first-media-${area.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return routes;
}
