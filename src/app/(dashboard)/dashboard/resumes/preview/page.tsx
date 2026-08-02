"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Copy,
  CheckCircle2,
  Download,
  AlertCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResumeRenderer } from "@/components/shared/resume-renderer";
import { exportResumePdf } from "@/lib/pdf-export";

export default function GuestResumePreview() {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("guestResume");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  function handleCopy() {
    if (!data) return;
    navigator.clipboard.writeText(data.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDownloadPdf() {
    if (!data || exporting) return;
    setExporting(true);
    try {
      await exportResumePdf("resume-paper-guest", data.title);
    } finally {
      setExporting(false);
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 p-6 md:p-10 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">No Resume Found</h1>
        <p className="text-zinc-400 mb-6">
          We couldn&apos;t find your generated resume in this session.
        </p>
        <Button asChild>
          <Link href="/dashboard/resumes/new">Create a New Resume</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Print-only styles: hide everything except the paper */}
      <style>{`
        @media print {
          @page { margin: 0; size: a4 portrait; }
          body { background: white !important; }
          .no-print { display: none !important; }
          #resume-paper-guest {
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
            display: block !important;
          }
          .a4-page {
            box-shadow: none !important;
            margin: 0 !important;
            break-after: page;
          }
        }
      `}</style>

      <div className="min-h-screen bg-zinc-950">
        {/* Top Toolbar */}
        <div className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur-sm border-b border-white/10 px-6 py-3 flex items-center justify-between no-print">
          <Link
            href="/dashboard/resumes"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2 bg-zinc-900 border-white/10 hover:bg-white/10 text-white"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy Text"}
            </Button>

            <Button
              size="sm"
              onClick={handleDownloadPdf}
              disabled={exporting}
              className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0"
            >
              {exporting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {exporting ? "Generating PDF..." : "Download PDF"}
            </Button>
          </div>
        </div>

        {/* Guest Warning */}
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mb-6">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200/80">
              <strong className="text-amber-200">Guest Mode:</strong> This resume is not
              saved.{" "}
              <Link href="/sign-in" className="underline font-medium text-amber-100">
                Sign In
              </Link>{" "}
              to save and access your resumes any time.
            </p>
          </div>
        </div>

        {/* Resume Paper — this is what gets exported to PDF */}
        <div className="w-full flex justify-center pb-20">
          <div id="resume-paper-guest" className="w-full max-w-[210mm]">
            <ResumeRenderer text={data.content} />
          </div>
        </div>

        {/* CTA to sign up */}
        <div className="max-w-4xl mx-auto px-6 pb-16 text-center">
          <div className="rounded-2xl border border-violet-500/20 bg-violet-600/10 p-8 inline-block">
            <FileText className="w-8 h-8 text-violet-400 mx-auto mb-3" />
            <p className="text-white font-semibold text-lg mb-2">
              Want to save and edit this resume?
            </p>
            <p className="text-zinc-400 text-sm mb-5">
              Create a free account to manage multiple resumes, export anytime, and more.
            </p>
            <Button
              className="bg-violet-600 hover:bg-violet-500 text-white"
              asChild
            >
              <Link href="/sign-up">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
