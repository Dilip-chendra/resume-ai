"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Copy, CheckCircle2, Download, AlertCircle, Printer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GuestResumePreview() {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("guestResume");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  function handleCopy() {
    if (!data) return;
    navigator.clipboard.writeText(data.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (!data) return;
    const blob = new Blob([data.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handlePrint() {
    window.print();
  }

  if (!data) {
    return (
      <div className="min-h-full bg-zinc-950 p-6 md:p-10 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">No Resume Found</h1>
        <p className="text-zinc-400 mb-6">We couldn&apos;t find your generated resume in this session.</p>
        <Button asChild>
          <Link href="/dashboard/resumes/new">Create a New Resume</Link>
        </Button>
      </div>
    );
  }

  // Parse the plain-text resume into HTML with proper formatting
  function renderResume(text: string) {
    const lines = text.split("\n");
    const result: React.ReactNode[] = [];
    let inBulletList = false;
    let bulletItems: string[] = [];

    const flushBullets = () => {
      if (bulletItems.length > 0) {
        result.push(
          <ul key={`ul-${result.length}`} className="mt-1 mb-2 space-y-1 list-none pl-4">
            {bulletItems.map((item, i) => (
              <li key={i} className="text-[13px] leading-[1.55] text-zinc-700 flex gap-2">
                <span className="shrink-0 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
        bulletItems = [];
        inBulletList = false;
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      // Blank line
      if (!trimmed) {
        flushBullets();
        result.push(<div key={i} className="h-2" />);
        return;
      }

      // Horizontal rule separator
      if (trimmed === "---" || trimmed === "────────────────────────────────────────────────────────────────────────────────") {
        flushBullets();
        result.push(<hr key={i} className="border-zinc-300 my-2" />);
        return;
      }

      // Bullet point
      if (trimmed.startsWith("•")) {
        inBulletList = true;
        bulletItems.push(trimmed.slice(1).trim());
        return;
      }

      flushBullets();

      // Detect if line looks like a section header (ALL CAPS, short)
      const isHeader = trimmed === trimmed.toUpperCase() && trimmed.length > 2 && trimmed.length < 60 && /^[A-Z\s\/&]+$/.test(trimmed);

      // Detect if it's the name (first non-empty line, relatively short)
      if (i === 0 || (result.length === 0)) {
        result.push(
          <h1 key={i} className="text-2xl font-bold text-center text-zinc-900 tracking-wide mb-0.5">
            {trimmed}
          </h1>
        );
        return;
      }

      // Contact line (contains Email: or | separators)
      if (trimmed.includes("Email:") || (trimmed.includes("|") && trimmed.includes("@"))) {
        result.push(
          <p key={i} className="text-[12px] text-center text-zinc-500 mb-2">
            {trimmed}
          </p>
        );
        return;
      }

      // Section header
      if (isHeader) {
        result.push(
          <div key={i} className="mt-5 mb-1">
            <h2 className="text-[13px] font-extrabold tracking-widest text-zinc-800 uppercase border-b border-zinc-300 pb-0.5">
              {trimmed}
            </h2>
          </div>
        );
        return;
      }

      // Job/company header line (contains | separator — "Company | Role | Date")
      if (trimmed.includes("|") && !trimmed.includes("Email:") && !trimmed.includes("@")) {
        const parts = trimmed.split("|").map((p) => p.trim());
        result.push(
          <div key={i} className="flex items-baseline justify-between gap-2 mt-2">
            <span className="text-[13px] font-bold text-zinc-800">{parts[0]}</span>
            <span className="text-[12px] text-zinc-500 italic shrink-0">{parts[parts.length - 1]}</span>
          </div>
        );
        if (parts.length === 3) {
          result.push(
            <p key={`${i}-role`} className="text-[12px] text-zinc-600 font-medium -mt-0.5">
              {parts[1]}
            </p>
          );
        }
        return;
      }

      // Regular paragraph line
      result.push(
        <p key={i} className="text-[13px] leading-[1.6] text-zinc-700">
          {trimmed}
        </p>
      );
    });

    flushBullets();
    return result;
  }

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .resume-paper { box-shadow: none !important; border: none !important; margin: 0 !important; padding: 20mm !important; max-width: 100% !important; }
        }
      `}</style>

      <div className="min-h-full bg-zinc-950 p-6 md:p-10 no-print">
        <div className="max-w-4xl mx-auto">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 no-print">
            <Link
              href="/dashboard/resumes"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-zinc-900 border-white/10 hover:bg-white/5 text-white">
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Text"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-zinc-900 border-white/10 hover:bg-white/5 text-white">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button size="sm" onClick={handlePrint} className="gap-2 bg-violet-600 hover:bg-violet-500 text-white">
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </Button>
            </div>
          </div>

          {/* Guest Warning */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mb-8 no-print">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-200/80">
                <strong className="text-amber-200">Guest Mode:</strong> This resume is not saved. Download it now or{" "}
                <Link href="/sign-in" className="underline font-medium text-amber-100">Sign In</Link>{" "}
                to save all your resumes permanently.
              </p>
            </div>
          </div>

          {/* Resume Paper */}
          <div
            className="resume-paper bg-white rounded-lg shadow-2xl mx-auto"
            style={{
              width: "794px",
              minHeight: "1123px",
              padding: "48px 56px",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            {renderResume(data.content)}
          </div>
        </div>
      </div>
    </>
  );
}
