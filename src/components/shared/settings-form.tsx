"use client";

import { useState, useTransition } from "react";
import { updateAISettingsAction } from "@/core/use-cases/settings.actions";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, AlertCircle, Loader2, FileText, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsFormProps {
  initialResumeSample: string;
  initialCoverLetterSample: string;
}

export function SettingsForm({ initialResumeSample, initialCoverLetterSample }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const result = await updateAISettingsAction(data) as any;
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Resume Sample */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
            <FileText className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Resume Formatting Sample</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Paste your ideal resume here. The AI will strictly follow this exact structure, section order, and style.
            </p>
          </div>
        </div>
        <textarea
          name="resumeSample"
          defaultValue={initialResumeSample}
          rows={18}
          placeholder={`Paste your reference resume here...\n\nExample:\nJohn Doe\njohn@email.com | (555) 123-4567 | linkedin.com/in/john\n\nPROFESSIONAL SUMMARY\nResult-driven Software Engineer with 5 years of experience...\n\nTECHNICAL SKILLS\nLanguages: Python, JavaScript, TypeScript\nFrameworks: React, Node.js, FastAPI\n...`}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none font-mono"
        />
      </div>

      {/* Cover Letter Sample */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
            <Mail className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Cover Letter Formatting Sample</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Paste your ideal cover letter. The AI will replicate the tone, structure, opening, closing, and paragraph style.
            </p>
          </div>
        </div>
        <textarea
          name="coverLetterSample"
          defaultValue={initialCoverLetterSample}
          rows={12}
          placeholder={`Dear Hiring Manager,\n\nI am excited to apply for the [Position] at [Company]. As a [background], I bring...\n\n...\n\nSincerely,\nJohn Doe`}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none font-mono"
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
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            AI formatting samples saved! Future resumes will follow your style.
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 gap-2"
      >
        {isPending ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
        ) : (
          <><Sparkles className="w-4 h-4" /> Save AI Preferences</>
        )}
      </Button>
    </form>
  );
}
