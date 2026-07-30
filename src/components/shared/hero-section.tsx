"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const floatingBadges = [
  { icon: "ðŸ“„", label: "ATS Optimized", color: "from-violet-500/20 to-violet-500/5", delay: 0 },
  { icon: "âœ¨", label: "AI Powered", color: "from-indigo-500/20 to-indigo-500/5", delay: 0.2 },
  { icon: "ðŸš€", label: "Land More Interviews", color: "from-pink-500/20 to-pink-500/5", delay: 0.4 },
];

const stats = [
  { value: "200K+", label: "Resumes Created" },
  { value: "94%", label: "ATS Pass Rate" },
  { value: "3x", label: "More Interviews" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-radial from-violet-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        {/* Blinking FOMO Offer */}
        <motion.div variants={itemVariants} className="mb-8 mt-4">
          <Link href="#pricing">
            <div className="relative group cursor-pointer inline-flex items-center justify-center">
              {/* Outer pulsing glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur animate-pulse opacity-40 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative px-6 py-2.5 rounded-full border border-emerald-500/50 bg-zinc-950/80 text-emerald-300 font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2.5 backdrop-blur-xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                LIMITED TIME: CLAIM YOUR 100% FREE PRO ACCOUNT
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Announcement Badge */}
        <motion.div variants={itemVariants}>
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 text-xs border-violet-500/30 bg-violet-500/10 text-violet-300 gap-1.5 rounded-full hover:bg-violet-500/20 transition-colors cursor-default"
          >
            <Sparkles className="w-3 h-3" />
            Powered by Gemini AI & NVIDIA NIM
            <span className="inline-flex items-center gap-1 ml-1 text-violet-400">
              New <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6"
        >
          <span className="text-white">Your Dream Job</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            Starts with a
          </span>
          <br />
          <span className="text-white">Perfect Resume.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10"
        >
          Create a world-class, ATS-optimized resume in minutes. Our AI analyzes job descriptions, tailors your content, and ensures you pass every ATS filter â€” automatically.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            size="lg"
            className="h-12 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 gap-2 text-base font-semibold"
            asChild
          >
            <Link href="/dashboard">
              Build My Resume â€” Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white backdrop-blur-sm transition-all text-base gap-2"
            asChild
          >
            <Link href="#features">
              See how it works
            </Link>
          </Button>
        </motion.div>

        {/* Trust signals */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 mb-16 text-sm text-zinc-500">
          {["No credit card required", "Free forever plan", "3 AI resumes included"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 sm:gap-16 mb-16">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                {value}
              </span>
              <span className="text-xs sm:text-sm text-zinc-500 mt-1">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Hero UI Preview */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-4xl"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/30 via-indigo-500/30 to-pink-500/30 rounded-2xl blur-xl" />
          <div className="relative rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-950/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full max-w-xs mx-auto h-5 rounded bg-white/5 border border-white/10 flex items-center px-3">
                  <span className="text-xs text-zinc-600">app.resumeai.com/builder</span>
                </div>
              </div>
            </div>
            {/* App Preview content placeholder */}
            <div className="p-6 grid grid-cols-5 gap-4 min-h-[320px]">
              {/* Left panel */}
              <div className="col-span-2 space-y-3">
                <div className="h-6 w-3/4 rounded-md bg-violet-500/20 border border-violet-500/20" />
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-5/6 rounded bg-white/5" />
                <div className="h-4 w-4/6 rounded bg-white/5" />
                <div className="h-px bg-white/10 my-4" />
                <div className="h-5 w-2/3 rounded-md bg-indigo-500/20 border border-indigo-500/20" />
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-3/4 rounded bg-white/5" />
                <div className="h-px bg-white/10 my-4" />
                <div className="h-5 w-2/3 rounded-md bg-pink-500/20 border border-pink-500/20" />
                <div className="flex gap-2 flex-wrap">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-6 w-16 rounded-full bg-white/5 border border-white/10" />
                  ))}
                </div>
              </div>
              {/* Right panel â€” AI Writer */}
              <div className="col-span-3 rounded-xl border border-white/10 bg-zinc-950/50 p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold text-violet-300">AI Resume Writer</span>
                  <div className="ml-auto flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
                    <span className="text-xs text-zinc-600">Generating...</span>
                  </div>
                </div>
                {[1,2,3,4,5,6].map(i => (
                  <div
                    key={i}
                    className="h-3 rounded bg-gradient-to-r from-white/5 to-white/[0.02]"
                    style={{ width: `${[100,85,92,75,88,60][i-1]}%` }}
                  />
                ))}
                <div className="mt-2 p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-amber-400 font-medium">ATS Score: 96/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

