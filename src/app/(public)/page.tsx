/**
 * Server-side Page combining all sections.
 * Non-critical sections are dynamically imported to reduce initial bundle.
 * StructuredData injects the FAQ JSON-LD schema for rich results.
 */
import dynamic from "next/dynamic";
import Hero from "@/sections/Hero";

/** Skeleton placeholder — prevents CLS while sections hydrate */
const SectionSkeleton = () => (
  <div className="w-full py-24 bg-slate-50 animate-pulse">
    <div className="container mx-auto px-4 max-w-5xl space-y-6">
      <div className="h-6 bg-slate-200 rounded-full w-32 mx-auto" />
      <div className="h-10 bg-slate-200 rounded-full w-2/3 mx-auto" />
      <div className="h-5 bg-slate-100 rounded-full w-1/2 mx-auto" />
    </div>
  </div>
);

const Features = dynamic(() => import("@/sections/Features"), {
  loading: () => <SectionSkeleton />,
});
const Packages = dynamic(() => import("@/sections/Packages"), {
  loading: () => <SectionSkeleton />,
});
const Coverage = dynamic(() => import("@/sections/Coverage"), {
  loading: () => <SectionSkeleton />,
});
const FAQ = dynamic(() => import("@/sections/FAQ"), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Packages />
      <Features />
      <Coverage />
      <FAQ />
    </>
  );
}

