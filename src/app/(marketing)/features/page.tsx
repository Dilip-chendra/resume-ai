import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/shared/cta-section";
import { Sparkles, FileText, BarChart, FileBadge, Zap, History, Download, Link2, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Features | Resume AI",
  description: "Explore all the powerful features of Resume AI, from AI Generation and ATS Scanning to Cover Letters and LinkedIn Import.",
};

const allFeatures = [
  { icon: Sparkles, title: "AI Resume Builder", description: "Generate compelling, metric-driven achievements in seconds based on your job title." },
  { icon: BarChart, title: "ATS Resume Scanner", description: "Score your resume against enterprise tracking systems to ensure it gets seen." },
  { icon: FileText, title: "Cover Letter Generator", description: "Write highly personalized cover letters that match the job description instantly." },
  { icon: FileBadge, title: "Resume Templates", description: "Choose from dozens of premium, ATS-optimized layouts tailored to your industry." },
  { icon: Zap, title: "Resume Optimizer", description: "Identify keyword gaps and get actionable suggestions to improve your match rate." },
  { icon: Briefcase, title: "LinkedIn Import", description: "Turn your LinkedIn profile into a polished resume with one click." },
  { icon: Link2, title: "Job Matching", description: "Paste a job URL and instantly analyze how well your resume matches the requirements." },
  { icon: History, title: "Resume Versioning", description: "Create and manage multiple versions of your resume for different job applications." },
  { icon: Download, title: "PDF Export", description: "Download pixel-perfect, selectable PDF files that parsers can read easily." },
];

export default function FeaturesPage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Everything you need to <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">get hired.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Our platform is packed with powerful features designed to give you an unfair advantage in the job market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {allFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl hover:border-violet-500/50 hover:bg-zinc-900 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
