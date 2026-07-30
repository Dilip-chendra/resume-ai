"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { runATSAnalysisAction } from "@/core/use-cases/resume.actions";
import { Button } from "@/components/ui/button";
import {
  ScanText, Loader2, CheckCircle2, AlertCircle,
  TrendingUp, KeyRound, Lightbulb, Target, FileText
} from "lucide-react";

interface ATSResult {
  score: number;
  missingKeywords: string[];
  presentKeywords: string[];
  suggestions: string[];
  summary: string;
}

export function ATSScannerForm({ resumeId }: { resumeId?: string }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setResult(null);

    const formData = new FormData(e.currentTarget);
    if (resumeId) {
      formData.set("resumeId", resumeId);
    }

    startTransition(async () => {
      const res = await runATSAnalysisAction(formData);
      if (res.error) {
        setError(res.error);
      } else if (res.success && res.analysis) {
        setResult(res.analysis as ATSResult);
      }
    });
  }

  const scoreColor =
    result?.score && result.score >= 80
      ? "text-emerald-400"
      : result?.score && result.score >= 60
      ? "text-amber-400"
      : "text-red-400";

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!resumeId && (
          <div className="space-y-1.5 mb-4">
            <label className="text-sm font-medium text-zinc-300" htmlFor="resumeText">
              Resume Content
            </label>
            <textarea
              id="resumeText"
              name="resumeText"
              required
              rows={8}
              placeholder="Paste your full resume here..."
              className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
            />
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-300" htmlFor="jobDescription">
            Job Description
            <span className="ml-2 text-xs text-zinc-600">(paste the full job posting)</span>
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            required
            rows={10}
            placeholder="Paste the job description here for analysis..."
            className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
          />
        </div>

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
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white border-0 shadow-lg gap-2 h-12"
        >
          {isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing with AI...</>
          ) : (
            <><ScanText className="w-4 h-4" /> Scan My Resume</>
          )}
        </Button>
      </form>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {/* Score */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-zinc-400" />
                  <span className="text-sm font-semibold text-zinc-300">ATS Compatibility Score</span>
                </div>
                <span className={`text-3xl font-extrabold ${scoreColor}`}>{result.score}/100</span>
              </div>
              <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    result.score >= 80 ? "bg-emerald-500" : result.score >= 60 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-3">{result.summary}</p>
            </div>

            {/* Missing Keywords */}
            {result.missingKeywords.length > 0 && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <KeyRound className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-300">Missing Keywords ({result.missingKeywords.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((kw) => (
                    <span key={kw} className="px-2.5 py-1 text-xs rounded-full border border-red-500/30 bg-red-500/10 text-red-300">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Present Keywords */}
            {result.presentKeywords.length > 0 && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">Matched Keywords ({result.presentKeywords.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.presentKeywords.map((kw) => (
                    <span key={kw} className="px-2.5 py-1 text-xs rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-semibold text-violet-300">Improvement Suggestions</span>
                </div>
                <ul className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Target className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
