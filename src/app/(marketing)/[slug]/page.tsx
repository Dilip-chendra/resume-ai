import { Metadata } from "next";
import { notFound } from "next/navigation";
import { seoPages } from "@/content/seo-pages";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(seoPages).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = seoPages[resolvedParams.slug];

  if (!page) {
    return {};
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://resume-ai.com";

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${appUrl}/${page.slug}`,
    },
  };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const resolvedParams = await params;
  const page = seoPages[resolvedParams.slug];

  if (!page) {
    notFound();
  }

  const faqSchema = {
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const softwareSchema = {
    name: "Resume AI Builder",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <JsonLd type="FAQPage" data={faqSchema} />
        <JsonLd type="SoftwareApplication" data={softwareSchema} />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950"></div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              {page.heroHeadline}
            </h1>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              {page.heroSubheadline}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="h-12 px-8 bg-white text-black hover:bg-zinc-200 text-base" asChild>
                <Link href="/dashboard/resumes/new">
                  Build Your Resume <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-zinc-900/50 border-y border-white/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Our {page.title.split('|')[0].trim()}?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {page.features.map((feature, i) => (
                <div key={i} className="bg-zinc-900 border border-white/10 p-8 rounded-2xl hover:border-violet-500/50 transition-colors">
                  <CheckCircle2 className="w-8 h-8 text-violet-500 mb-6" />
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content & SEO Body */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl prose prose-invert prose-violet">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {page.faqs.map((faq, i) => (
                <div key={i} className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-zinc-400 m-0">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Bottom CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-violet-600/10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-zinc-400 mb-10">Join thousands of professionals landing their dream jobs with our {page.title.split('|')[0].trim().toLowerCase()}.</p>
            <Button size="lg" className="h-14 px-10 bg-violet-600 hover:bg-violet-500 text-white text-lg rounded-full" asChild>
              <Link href="/sign-up">Create Free Account</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
