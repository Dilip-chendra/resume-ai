"use client";

import { useState, useTransition } from "react";
import { updateResumeAction } from "@/core/use-cases/resume.actions";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Save, CheckCircle2, Download } from "lucide-react";
import Link from "next/link";
import { ResumeRenderer } from "@/components/shared/resume-renderer";
import { exportResumePdf } from "@/lib/pdf-export";

const PAPER_ID = "resume-paper-editor";

export function ResumeEditorForm({ resume }: { resume: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(resume.title);
  const [content, setContent] = useState(
    typeof resume.content.raw === "string"
      ? resume.content.raw
      : JSON.stringify(resume.content, null, 2)
  );
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      const res = await updateResumeAction({
        resumeId: resume.id,
        title,
        content: { ...resume.content, raw: content },
      });
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  }

  async function handleDownloadPdf() {
    if (exporting) return;
    setExporting(true);
    try {
      await exportResumePdf(PAPER_ID, `${title}_Resume`);
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      {/* Print-only: show ONLY the resume paper */}
      <style>{`
        @media print {
          @page { margin: 0; }
          body * { visibility: hidden !important; }
          #${PAPER_ID}, #${PAPER_ID} * { visibility: visible !important; }
          #${PAPER_ID} {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100% !important;
            padding: 18mm 20mm !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="flex flex-col h-screen bg-zinc-950 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-zinc-900/60 shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/resumes" className="text-zinc-500 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-0 text-lg font-bold text-white focus:ring-0 focus:outline-none min-w-[220px]"
              placeholder="Resume Title..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPdf}
              disabled={exporting}
              className="gap-2 bg-zinc-900 border-white/10 text-white hover:bg-white/10"
            >
              {exporting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {exporting ? "Generating..." : "Download PDF"}
            </Button>

            <Button
              onClick={handleSave}
              disabled={isPending}
              size="sm"
              className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 hover:from-violet-500"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : saved ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saved ? "Saved!" : "Save"}
            </Button>
          </div>
        </div>

        {/* Body — Split Panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Text Editor */}
          <div className="w-1/2 border-r border-white/10 flex flex-col bg-zinc-950">
            <p className="text-[10px] text-zinc-600 px-4 pt-3 pb-1 font-semibold uppercase tracking-widest">
              Edit Content
            </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 w-full bg-transparent border-0 px-5 pb-6 text-[13px] text-zinc-300 font-mono focus:ring-0 focus:outline-none resize-none leading-relaxed"
              placeholder="Your resume content will appear here..."
            />
          </div>

          {/* Right: Live Preview */}
          <div className="w-1/2 bg-zinc-900/30 overflow-y-auto p-6 flex justify-center">
            <div
              id={PAPER_ID}
              className="bg-white shadow-2xl w-full"
              style={{
                maxWidth: "720px",
                minHeight: "960px",
                padding: "44px 52px",
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              <ResumeRenderer text={content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
