import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PricingSection } from "@/components/shared/pricing-section";
import { FAQSection } from "@/components/shared/faq-section";

export const metadata: Metadata = {
  title: "Pricing | Resume AI",
  description: "Simple, transparent pricing for the ultimate AI resume builder. Free forever plan available.",
};

export default function PricingPage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent pointer-events-none blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              No hidden fees. No surprise charges. Start for free and upgrade when you need more power.
            </p>
          </div>

          <PricingSection />
          
          <div className="mt-32">
            <FAQSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
