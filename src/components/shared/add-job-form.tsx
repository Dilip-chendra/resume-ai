"use client";

import { useState, useTransition } from "react";
import { addJobAction } from "@/core/use-cases/jobs.actions";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AddJobForm() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const data = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await addJobAction(data) as any;
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setOpen(false);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Job added successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {!open ? (
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="gap-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white w-full"
        >
          <Plus className="w-4 h-4" />
          Add Job Application
        </Button>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 space-y-4"
        >
          <h3 className="font-semibold text-white text-sm">New Job Application</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Job Title *</label>
              <input
                name="title"
                required
                placeholder="e.g. Senior Software Engineer"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Company *</label>
              <input
                name="company"
                required
                placeholder="e.g. Google"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Job URL (optional)</label>
            <input
              name="url"
              type="url"
              placeholder="https://..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Job Description (optional)</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Paste the job description for ATS analysis..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={isPending}
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 gap-2"
            >
              {isPending ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</> : <><Plus className="w-3.5 h-3.5" /> Save Job</>}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => { setOpen(false); setError(""); }}
              className="text-zinc-500 hover:text-zinc-300"
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
}
