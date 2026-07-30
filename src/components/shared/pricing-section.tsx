"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Timer, Rocket, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-28 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-zinc-950">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-violet-600/20 via-indigo-600/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Timer className="w-4 h-4 animate-pulse" />
            Limited Time Offer
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            World-class AI. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">100% Free.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We believe everyone deserves access to top-tier career tools. For a strictly limited time, we're opening our entire premium suite to early adopters for absolutely zero cost. No credit card required.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* FOMO Floating Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.3 }}
            className="absolute -top-6 -right-6 z-20"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-2 px-6 rounded-full shadow-2xl shadow-orange-500/30 border-2 border-white/20 whitespace-nowrap transform hover:scale-105 transition-transform cursor-default">
              🎉 Early Adopter Special
            </div>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-[2rem] border border-violet-500/50 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-violet-500/20 p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row gap-10 md:items-center"
          >
            {/* Inner Glow */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
            
            <div className="flex-1 relative z-10 space-y-6">
              <div>
                <Badge className="bg-violet-500/20 text-violet-300 border border-violet-500/30 px-3 py-1 mb-4 hover:bg-violet-500/30 transition-colors">
                  <Infinity className="w-4 h-4 mr-1.5 inline" />
                  Unlimited Access
                </Badge>
                <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                  Pro Builder <Sparkles className="w-6 h-6 text-amber-400" />
                </h3>
                <p className="text-zinc-400 mt-2">Everything you need to land your dream job, completely unlocked.</p>
              </div>

              <div className="flex items-end gap-3 pt-2">
                <span className="text-6xl font-extrabold text-white tracking-tighter">$0</span>
                <div className="flex flex-col pb-1.5">
                  <span className="text-zinc-500 line-through text-lg decoration-red-500/50 decoration-2 font-medium">
                    $29/mo
                  </span>
                  <span className="text-emerald-400 font-semibold text-sm">
                    Forever free for you
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-10 text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] rounded-xl group"
                asChild
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  Claim Your Free Account Now
                </Link>
              </Button>
              <p className="text-xs text-zinc-500 font-medium">
                ⚡️ Over 10,000+ professionals already joined this week.
              </p>
            </div>

            <div className="flex-1 relative z-10 bg-zinc-950/50 p-6 sm:p-8 rounded-2xl border border-white/5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">What's included in Pro:</h4>
              <ul className="space-y-4">
                {[
                  "Unlimited AI Resume Generations",
                  "Advanced ATS Optimization & Scoring",
                  "Premium Formatting & Pixel-Perfect PDF Export",
                  "AI Cover Letter Generator (Coming Soon)",
                  "Custom Formatting Templates",
                  "Dedicated Support & High-Priority Queue",
                  "Ad-free Experience"
                ].map((feature, i) => (
                  <motion.li 
                    key={feature} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className="bg-emerald-500/20 p-1 rounded-full shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-zinc-200 font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
