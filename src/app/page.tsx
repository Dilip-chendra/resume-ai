import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FeaturesSection } from "@/components/shared/features-section";
import { TestimonialsSection } from "@/components/shared/testimonials-section";
import { PricingSection } from "@/components/shared/pricing-section";
import { FAQSection } from "@/components/shared/faq-section";
import { CTASection } from "@/components/shared/cta-section";

export default function HomePage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
