/** 
 * Server-side Page combining all sections
 */
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Packages from "@/sections/Packages";
import Coverage from "@/sections/Coverage";
import FAQ from "@/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Packages />
      <Coverage />
      <FAQ />
    </>
  );
}
