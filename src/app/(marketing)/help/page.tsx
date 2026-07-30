import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Search, Book, FileText, LifeBuoy } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center | Resume AI",
  description: "Get help with Resume AI. Browse tutorials, FAQs, and contact support.",
};

const helpCategories = [
  { icon: Book, title: "Getting Started", desc: "Learn the basics of the builder." },
  { icon: FileText, title: "Billing & Plans", desc: "Manage your subscription." },
  { icon: LifeBuoy, title: "Troubleshooting", desc: "Fix common export issues." },
];

export default function HelpPage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent pointer-events-none blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            How can we help?
          </h1>
          
          <div className="relative max-w-xl mx-auto mb-16">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-zinc-900 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow shadow-lg"
              placeholder="Search for answers..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {helpCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title} className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all text-left cursor-pointer group">
                  <Icon className="w-8 h-8 text-violet-400 mb-4 group-hover:text-violet-300 transition-colors" />
                  <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-zinc-400">{category.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-zinc-400 mb-6">Our support team is always ready to assist you with any technical or billing questions.</p>
            <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 bg-white text-black hover:bg-zinc-200 font-semibold rounded-full transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
