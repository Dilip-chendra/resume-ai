"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FileText, Clock, MoreVertical, ArrowRight, Trash2, Edit, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteResumeAction } from "@/core/use-cases/resume.actions";

interface Resume {
  id: string;
  title: string;
  updatedAt: Date;
}

interface ResumeCardProps {
  resume: Resume;
}

export function ResumeCard({ resume }: ResumeCardProps) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }
    startTransition(async () => {
      await deleteResumeAction(resume.id);
      setShowConfirm(false);
    });
  };

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all hover:border-white/20 flex flex-col h-[280px]">
      {/* Document Preview */}
      <div className="h-40 bg-zinc-950/50 border-b border-white/5 rounded-t-2xl p-4 overflow-hidden relative">
        <div className="w-full h-full bg-white text-black p-3 rounded-sm shadow-sm text-[8px] opacity-20 blur-[1px]">
          <div className="font-bold text-[12px] mb-1">{resume.title}</div>
          <div className="w-1/3 h-1 bg-zinc-300 mb-4" />
          <div className="space-y-1.5">
            <div className="w-full h-1 bg-zinc-200" />
            <div className="w-5/6 h-1 bg-zinc-200" />
            <div className="w-full h-1 bg-zinc-200" />
            <div className="w-4/6 h-1 bg-zinc-200" />
          </div>
        </div>

        {/* Overlay CTA */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="sm" className="bg-white text-black hover:bg-zinc-200" asChild>
            <Link href={`/dashboard/resumes/${resume.id}`}>
              Edit <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-1.5" asChild>
            <Link href={`/dashboard/resumes/preview?id=${resume.id}`}>
              <ExternalLink className="w-3.5 h-3.5" />
              Preview
            </Link>
          </Button>
        </div>
      </div>

      {/* Meta */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-auto">
          <div>
            <h3 className="font-semibold text-white truncate max-w-[200px]">{resume.title}</h3>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Updated {new Date(resume.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md text-zinc-500 hover:text-white hover:bg-white/10 -mr-2 -mt-1 outline-none" aria-label="Resume options">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white w-44">
              <DropdownMenuItem onClick={() => window.location.href = `/dashboard/resumes/${resume.id}`} className="flex items-center gap-2 cursor-pointer">
                <Edit className="w-3.5 h-3.5" />
                Edit Resume
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = `/dashboard/resumes/preview?id=${resume.id}`} className="flex items-center gap-2 cursor-pointer">
                <ExternalLink className="w-3.5 h-3.5" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={handleDelete}
                className={`flex items-center gap-2 cursor-pointer ${showConfirm ? "text-red-400 focus:text-red-400 focus:bg-red-500/10" : "text-zinc-400 hover:text-red-400"}`}
                disabled={isPending}
              >
                <Trash2 className="w-3.5 h-3.5" />
                {showConfirm ? "Confirm Delete" : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
