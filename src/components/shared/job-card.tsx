"use client";

import { useState, useTransition } from "react";
import { deleteJobAction } from "@/core/use-cases/jobs.actions";
import { Briefcase, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Job {
  id: string;
  title: string;
  company: string;
  url: string | null;
  description: string;
  createdAt: Date;
}

export function JobCard({ job }: { job: Job }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteJobAction(job.id);
    });
  }

  return (
    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-zinc-900/50 p-4 hover:border-white/20 transition-all group">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 shrink-0 mt-0.5">
        <Briefcase className="w-5 h-5 text-indigo-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-white">{job.title}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{job.company}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDelete}
              disabled={isPending}
              className="w-7 h-7 text-zinc-600 hover:text-red-400 hover:bg-red-500/10"
            >
              {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>
        {job.description && (
          <p className="text-xs text-zinc-600 mt-2 line-clamp-2">{job.description}</p>
        )}
        <p className="text-xs text-zinc-700 mt-2">
          Added {new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </div>
  );
}
