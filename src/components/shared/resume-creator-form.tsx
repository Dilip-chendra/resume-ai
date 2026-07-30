"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createResumeAction } from "@/core/use-cases/resume.actions";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const tones = [
  { value: "professional", label: "Professional", desc: "Confident & polished" },
  { value: "student", label: "Student", desc: "Emphasizes education & projects" },
  { value: "executive", label: "Executive", desc: "Leadership & strategic focus" },
] as const;

type Tone = (typeof tones)[number]["value"];

export function ResumeCreatorForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [tone, setTone] = useState<Tone>("professional");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("tone", tone);

    startTransition(async () => {
      const result = await createResumeAction(data) as any;
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(true);
        if (result.guest) {
          sessionStorage.setItem("guestResume", JSON.stringify({
            title: data.get("title"),
            content: result.content
          }));
          setTimeout(() => router.push(`/dashboard/resumes/preview`), 1000);
        } else if (result.resumeId) {
          setTimeout(() => router.push(`/dashboard/resumes/${result.resumeId}`), 1000);
        }
      }
    });
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300" htmlFor="title">Resume Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="e.g. Senior Software Engineer Resume"
          className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
        />
      </div>

      {/* Job Title */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300" htmlFor="jobTitle">Target Job Title</label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          required
          placeholder="e.g. Full Stack Engineer at a Series B startup"
          className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
        />
      </div>

      {/* Experience */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300" htmlFor="experience">
          Your Experience
          <span className="ml-2 text-xs text-zinc-600">(paste your work history, projects, education)</span>
        </label>
        <textarea
          id="experience"
          name="experience"
          required
          rows={6}
          placeholder="E.g. 3 years at Acme Corp as a React developer, built a dashboard that reduced load times by 40%. Previously interned at..."
          className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
        />
      </div>

      {/* Skills */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300" htmlFor="skills">
          Skills
          <span className="ml-2 text-xs text-zinc-600">(comma-separated)</span>
        </label>
        <input
          id="skills"
          name="skills"
          type="text"
          required
          placeholder="React, TypeScript, Node.js, PostgreSQL, AWS..."
          className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
        />
      </div>

      {/* Tone Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Writing Tone</label>
        <div className="grid grid-cols-3 gap-3">
          {tones.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTone(t.value)}
              className={`rounded-xl border p-3 text-left transition-all duration-200 ${
                tone === t.value
                  ? "border-violet-500/50 bg-violet-500/10 text-white"
                  : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:border-white/20 hover:text-zinc-300"
              }`}
            >
              <p className="text-xs font-semibold">{t.label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Job Description (optional) */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300" htmlFor="jobDescription">
          Job Description
          <span className="ml-2 text-xs text-zinc-600">(optional — for ATS optimization)</span>
        </label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          rows={4}
          placeholder="Paste the job description here for maximum ATS optimization..."
          className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending || success}
        size="lg"
        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-violet-500/20 gap-2 h-12"
      >
        {success ? (
          <>
            <CheckCircle2 className="w-4 h-4" /> Resume created! Redirecting...
          </>
        ) : isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Generating with AI...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" /> Generate AI Resume
            <ArrowRight className="w-4 h-4 ml-auto" />
          </>
        )}
      </Button>
    </motion.form>
  );
}
