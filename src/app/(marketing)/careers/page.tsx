import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | Resume AI",
  description: "Join the team at Resume AI and help us build the future of recruitment technology.",
};

export default function CareersPage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent pointer-events-none blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-8">
            <Briefcase className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Work at ResumeAI
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-16">
            Help us build tools that empower millions of professionals to land their dream jobs.
          </p>

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">No open roles right now</h2>
            <p className="text-zinc-400 mb-8">
              We&apos;re currently not actively hiring for any specific roles. However, we&apos;re always on the lookout for exceptional talent in Engineering, Design, and Marketing.
            </p>
            <p className="text-zinc-400 mb-8">
              If you think you&apos;d be a great fit, we&apos;d still love to hear from you.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-full transition-colors">
              Send an open application
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
