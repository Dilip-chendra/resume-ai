"use client";

import { motion, Variants } from "framer-motion";
import {
  Sparkles, FileSearch, Target, PenLine,
  Link2, MessageSquare, BarChart3, Download,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Resume Writer",
    description: "Generate tailored, professional resume content in seconds. Choose from professional, student, or executive tones.",
    gradient: "from-violet-500 to-fuchsia-500",
    shadow: "shadow-violet-500/20",
  },
  {
    icon: FileSearch,
    title: "ATS Scanner",
    description: "Instantly analyze your resume against any job description. Get a score, missing keywords, and actionable suggestions.",
    gradient: "from-indigo-500 to-blue-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    icon: Target,
    title: "Job Matching",
    description: "Paste any job description and see exactly how your resume matches — with a keyword comparison and gap analysis.",
    gradient: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/20",
  },
  {
    icon: PenLine,
    title: "Cover Letter Generator",
    description: "Generate a personalized, compelling cover letter tailored to the specific role and company in under 30 seconds.",
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: Link2,
    title: "LinkedIn Optimizer",
    description: "Optimize your LinkedIn headline, about section, and experience to attract recruiters and pass LinkedIn's algorithm.",
    gradient: "from-sky-500 to-cyan-500",
    shadow: "shadow-sky-500/20",
  },
  {
    icon: MessageSquare,
    title: "Interview Prep",
    description: "Get AI-generated behavioral, technical, and company-specific interview questions based on your resume and target role.",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    icon: BarChart3,
    title: "Career Analytics",
    description: "Track your application success, resume performance over time, and get insights to continuously improve your job search.",
    gradient: "from-purple-500 to-violet-500",
    shadow: "shadow-purple-500/20",
  },
  {
    icon: Download,
    title: "One-Click Export",
    description: "Export your polished resume as PDF, DOCX, or Markdown. Print-ready, perfectly formatted, every single time.",
    gradient: "from-zinc-400 to-zinc-600",
    shadow: "shadow-zinc-500/20",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10">
            Everything you need
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5">
            A complete AI career toolkit
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            From resume creation to interview prep — every tool you need to land your dream job, all in one platform.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map(({ icon: Icon, title, description, gradient, shadow }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div
                className={`relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} shadow-lg ${shadow} mb-4`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">{title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
