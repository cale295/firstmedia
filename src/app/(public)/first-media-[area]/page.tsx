import { Metadata } from "next";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Packages from "@/sections/Packages";
import Coverage from "@/sections/Coverage";

interface Props {
  params: Promise<{ area: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const areaStr = area || "";
  const formattedArea = areaStr.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return { title: `Pasang First Media ${formattedArea}` };
}

export default async function LocalAreaPage({ params }: Props) {
  const { area } = await params;
  const formattedArea = (area || "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return (
    <>
      <Hero localArea={formattedArea} />
      <Features />
      <Packages />
      <Coverage />
    </>
  );
}
