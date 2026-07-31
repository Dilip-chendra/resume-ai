"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateCoverLetterAction } from "@/core/use-cases/resume.actions";
import { Button } from "@/components/ui/button";
import {
  PenLine, Loader2, CheckCircle2, AlertCircle, Sparkles, Copy, FileText, Download, Printer
} from "lucide-react";
import { ResumeRenderer } from "./resume-renderer";
import { exportResumePdf } from "@/lib/pdf-export";

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
  const [exporting, setExporting] = useState(false);
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

  async function handleDownloadPdf() {
    if (exporting) return;
    setExporting(true);
    try {
      await exportResumePdf("cv-paper", `Cover_Letter`);
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <style>{`
        @media print {
          @page { margin: 0; }
          body * { visibility: hidden !important; }
          #cv-paper, #cv-paper * { visibility: visible !important; }
          #cv-paper {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100% !important;
            padding: 18mm 20mm !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
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
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2 bg-zinc-900 border-white/10 hover:bg-white/5 text-white"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Text"}
              </Button>
              <Button
                size="sm"
                onClick={handleDownloadPdf}
                disabled={exporting}
                className="gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white border-0 hover:from-pink-500 hover:to-rose-500"
              >
                {exporting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {exporting ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto pb-4 flex justify-center">
            <div
              id="cv-paper"
              className="bg-white shadow-2xl w-full"
              style={{
                maxWidth: "720px",
                minHeight: "960px",
                padding: "44px 52px",
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              <ResumeRenderer text={result} variant="cover-letter" />
            </div>
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
    </>
  );
}
