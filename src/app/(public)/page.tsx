/** 
 * Server-side Page combining all sections
 */
import dynamic from "next/dynamic";
import Hero from "@/sections/Hero";

const Features = dynamic(() => import("@/sections/Features"));
const Packages = dynamic(() => import("@/sections/Packages"));
const Coverage = dynamic(() => import("@/sections/Coverage"));
const FAQ = dynamic(() => import("@/sections/FAQ"));

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
