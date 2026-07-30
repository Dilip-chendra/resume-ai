import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/shared/cta-section";
import Link from "next/link";
import { ArrowRight, LayoutTemplate } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume Templates | Resume AI",
  description: "Browse our collection of modern, professional, and ATS-optimized resume templates.",
};

const templates = [
  { name: "Modern", category: "Technology", color: "from-blue-500 to-cyan-500" },
  { name: "Professional", category: "Corporate", color: "from-zinc-500 to-zinc-700" },
  { name: "Minimal", category: "Design", color: "from-gray-300 to-gray-400" },
  { name: "Creative", category: "Marketing", color: "from-pink-500 to-rose-500" },
  { name: "Executive", category: "Leadership", color: "from-slate-700 to-slate-900" },
  { name: "Student", category: "Entry Level", color: "from-emerald-400 to-teal-500" },
  { name: "Software Engineer", category: "Engineering", color: "from-violet-500 to-indigo-500" },
  { name: "Data Scientist", category: "Data", color: "from-indigo-400 to-cyan-400" },
  { name: "Product Manager", category: "Product", color: "from-orange-400 to-red-500" },
];

export default function TemplatesPage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10 mb-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Resume Templates that Win Interviews
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Every template is meticulously crafted to be parsed by ATS scanners while looking stunning to human recruiters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div key={template.name} className="group relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                {/* Visual Placeholder for Template */}
                <div className={`h-48 bg-gradient-to-br ${template.color} opacity-20 group-hover:opacity-30 transition-opacity flex items-center justify-center`}>
                  <LayoutTemplate className="w-16 h-16 text-white/50" />
                </div>
                
                <div className="p-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
                    {template.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{template.name}</h3>
                  <Link href="/dashboard/resumes/new" className="inline-flex items-center text-sm font-semibold text-white hover:text-violet-400 transition-colors">
                    Use Template <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
