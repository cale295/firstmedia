import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Public layout — renders Navbar and Footer for all public-facing pages.
 * This route group does not affect the URL (parentheses are omitted from routes).
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-grow pt-[72px]">{children}</main>
      <Footer />
    </div>
  );
}
