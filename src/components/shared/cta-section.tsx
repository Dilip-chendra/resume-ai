"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-zinc-950 to-indigo-900/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-radial from-violet-600/25 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-2xl shadow-violet-500/40 mb-8">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Ready to land your
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              dream job?
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mb-10">
            Join 200,000+ professionals who use ResumeAI to create stunning, ATS-optimized resumes that get results. Start free today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="h-14 px-10 text-base font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all gap-2"
              asChild
            >
              <Link href="/dashboard">
                Build my resume now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-base border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
              asChild
            >
              <Link href="#pricing">View pricing</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-zinc-600">
            No credit card required · Free forever plan · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
