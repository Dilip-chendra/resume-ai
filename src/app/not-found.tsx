"use client";

import Link from "next/link";
import { Search, Home, FileText, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

const popularLinks = [
  { label: "AI Resume Builder", href: "/ai-resume-builder" },
  { label: "ATS Resume Scanner", href: "/ats-scanner" },
  { label: "Resume Templates", href: "/templates" },
  { label: "Cover Letter Generator", href: "/cover-letter-generator" },
];

export default function NotFound() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-violet-600/10 via-transparent to-transparent pointer-events-none blur-3xl" />
        
        <div className="max-w-2xl w-full text-center relative z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">
              404
            </h1>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Page not found
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
            </p>
          </div>

          {/* Dummy Search bar for aesthetics / UX as requested */}
          <div className="relative max-w-md mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-zinc-900 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow shadow-lg"
              placeholder="Search ResumeAI..."
            />
          </div>

          <div className="pt-8">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
              Popular Pages
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {popularLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-zinc-300 hover:text-white transition-colors"
                >
                  <FileText className="w-4 h-4 text-violet-400" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex justify-center gap-4">
            <Button size="lg" className="h-12 px-8 bg-violet-600 hover:bg-violet-500 text-white rounded-full gap-2" asChild>
              <Link href="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full gap-2 border-white/10 hover:bg-white/5" asChild>
              <Link href="/help">
                Help Center
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
