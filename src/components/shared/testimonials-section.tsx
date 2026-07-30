"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aisha Johnson",
    role: "Software Engineer at Google",
    avatar: "AJ",
    stars: 5,
    quote:
      "ResumeAI helped me go from 0 callbacks to 6 interviews in two weeks. The ATS scanner was a game-changer — I had no idea my resume was failing basic keyword checks.",
  },
  {
    name: "Marcus Chen",
    role: "Product Manager at Stripe",
    avatar: "MC",
    stars: 5,
    quote:
      "I was skeptical about AI-generated content, but the output quality is genuinely impressive. The executive tone option made my resume sound polished and authoritative.",
  },
  {
    name: "Priya Sharma",
    role: "Data Scientist at Netflix",
    avatar: "PS",
    stars: 5,
    quote:
      "As a career switcher, I had no idea how to position my skills. ResumeAI not only wrote my resume, it matched me to the right jobs and showed me exactly what keywords to add.",
  },
  {
    name: "Jordan Williams",
    role: "UX Designer at Figma",
    avatar: "JW",
    stars: 5,
    quote:
      "The LinkedIn optimizer alone was worth the Pro subscription. My profile views tripled in the first month after using it. Incredible tool.",
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director at HubSpot",
    avatar: "ER",
    stars: 5,
    quote:
      "The cover letter generator is insanely good. It tailors each letter to the specific company's voice and tone. I've never been more confident in my applications.",
  },
  {
    name: "Kenji Tanaka",
    role: "Backend Engineer at Vercel",
    avatar: "KT",
    stars: 5,
    quote:
      "Clean, fast, intuitive. I rebuilt my entire resume and cover letter package in one afternoon. Got an offer within 3 weeks. This is the real deal.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-zinc-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-violet-600/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10">
            Success stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5">
            Loved by job seekers worldwide
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Join thousands of professionals who have used ResumeAI to land interviews at top companies.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="break-inside-avoid rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9 border border-white/10">
                  <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xs font-semibold">
                    {t.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
