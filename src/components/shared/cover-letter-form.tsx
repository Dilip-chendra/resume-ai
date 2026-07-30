"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateCoverLetterAction } from "@/core/use-cases/resume.actions";
import { Button } from "@/components/ui/button";
import {
  PenLine, Loader2, CheckCircle2, AlertCircle, Sparkles, Copy, FileText
} from "lucide-react";

interface ResumeChoice {
  id: string;
  title: string;
}

const tones = [
  { value: "professional", label: "Professional", desc: "Confident & polished" },
  { value: "student", label: "Student", desc: "Eager & enthusiastic" },
  { value: "executive", label: "Executive", desc: "Strategic & leadership-focused" },
] as const;

export function CoverLetterForm({ resumes }: { resumes: ResumeChoice[] }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [tone, setTone] = useState<typeof tones[number]["value"]>("professional");
  const [copied, setCopied] = useState(false);
  const [selectedResume, setSelectedResume] = useState<string>(resumes.length > 0 ? resumes[0].id : "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setResult(null);
    setCopied(false);

    const formData = new FormData(e.currentTarget);
    formData.set("tone", tone);

    startTransition(async () => {
      const res = await generateCoverLetterAction(formData);
      if (res.error) {
        setError(res.error);
      } else if (res.success && res.content) {
        setResult(res.content);
      }
    });
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-8">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Source Resume */}
          {resumes.length > 0 ? (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300" htmlFor="resumeId">
                Select Saved Resume
              </label>
              <select
                id="resumeId"
                name="resumeId"
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all appearance-none"
              >
                <option value="">I want to paste a new resume instead...</option>
                {resumes.map((r) => (
                  <option key={r.id} value={r.id}>{r.title}</option>
                ))}
              </select>
            </div>
          ) : null}

          {!selectedResume && (
            <div className="space-y-1.5 mb-4">
              <label className="text-sm font-medium text-zinc-300" htmlFor="resumeText">
                Resume Content
              </label>
              <textarea
                id="resumeText"
                name="resumeText"
                required={!selectedResume}
                rows={6}
                placeholder="Paste your full resume here..."
                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Job Title */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300" htmlFor="jobTitle">Job Title</label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                required
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
              />
            </div>
            
            {/* Company */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300" htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="e.g. Acme Corp"
                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
              />
            </div>
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
                      ? "border-pink-500/50 bg-pink-500/10 text-white"
                      : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:border-white/20 hover:text-zinc-300"
                  }`}
                >
                  <p className="text-xs font-semibold">{t.label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300" htmlFor="jobDescription">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              required
              rows={5}
              placeholder="Paste the job description here..."
              className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
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

          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white border-0 shadow-lg gap-2 h-12"
          >
            {isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating Letter...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Generate Cover Letter</>
            )}
          </Button>
        </form>
      ) : (
        /* Result State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-400" /> Your Cover Letter
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2 bg-zinc-900 border-white/10 hover:bg-white/5"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy to Clipboard"}
            </Button>
          </div>
          
          <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 whitespace-pre-wrap text-sm text-zinc-300 leading-relaxed font-sans shadow-inner">
            {result}
          </div>

          <Button
            variant="ghost"
            className="w-full text-zinc-400 hover:text-white"
            onClick={() => setResult(null)}
          >
            Generate Another
          </Button>
        </motion.div>
      )}
    </div>
  );
}
