"use client";

import { useState, useTransition } from "react";
import { updateResumeAction } from "@/core/use-cases/resume.actions";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Save, CheckCircle2, Download, Printer } from "lucide-react";
import Link from "next/link";

// Render a plain-text resume into a styled print-quality document
function ResumeRenderer({ text }: { text: string }) {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];
  let bulletItems: string[] = [];
  let isFirst = true;

  const flushBullets = (key: string) => {
    if (bulletItems.length > 0) {
      result.push(
        <ul key={key} className="mt-1 mb-1.5 list-none pl-4 space-y-0.5">
          {bulletItems.map((item, i) => (
            <li key={i} className="text-[12.5px] leading-[1.55] text-zinc-700 flex gap-2">
              <span className="shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      bulletItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushBullets(`ul-${i}`);
      result.push(<div key={i} className="h-1.5" />);
      return;
    }

    if (trimmed === "---") {
      flushBullets(`ul-${i}`);
      result.push(<hr key={i} className="border-zinc-300 my-2" />);
      return;
    }

    if (trimmed.startsWith("•")) {
      bulletItems.push(trimmed.slice(1).trim());
      return;
    }

    flushBullets(`ul-${i}`);

    if (isFirst) {
      isFirst = false;
      result.push(
        <h1 key={i} className="text-[22px] font-bold text-center text-zinc-900 tracking-wide mb-0.5">
          {trimmed}
        </h1>
      );
      return;
    }

    if (trimmed.includes("Email:") || (trimmed.includes("|") && trimmed.includes("@"))) {
      result.push(
        <p key={i} className="text-[11.5px] text-center text-zinc-500 mb-1.5">
          {trimmed}
        </p>
      );
      return;
    }

    const isHeader = /^[A-Z][A-Z\s\/&]{2,}$/.test(trimmed) && trimmed.length < 60;
    if (isHeader) {
      result.push(
        <div key={i} className="mt-4 mb-1">
          <h2 className="text-[12px] font-extrabold tracking-widest text-zinc-800 uppercase border-b border-zinc-400 pb-0.5">
            {trimmed}
          </h2>
        </div>
      );
      return;
    }

    if (trimmed.includes("|") && !trimmed.includes("Email:") && !trimmed.includes("@")) {
      const parts = trimmed.split("|").map((p) => p.trim());
      result.push(
        <div key={i} className="flex items-baseline justify-between gap-2 mt-2 mb-0">
          <span className="text-[12.5px] font-bold text-zinc-800">{parts[0]}</span>
          <span className="text-[11.5px] text-zinc-500 italic shrink-0">{parts[parts.length - 1]}</span>
        </div>
      );
      if (parts.length === 3) {
        result.push(
          <p key={`${i}-r`} className="text-[11.5px] text-zinc-600 italic -mt-0.5 mb-0.5">{parts[1]}</p>
        );
      }
      return;
    }

    result.push(
      <p key={i} className="text-[12.5px] leading-[1.6] text-zinc-700">{trimmed}</p>
    );
  });

  flushBullets("final");
  return <>{result}</>;
}

export function ResumeEditorForm({ resume }: { resume: any }) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(resume.title);
  const [content, setContent] = useState(
    typeof resume.content.raw === "string"
      ? resume.content.raw
      : JSON.stringify(resume.content, null, 2)
  );
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      const res = await updateResumeAction({ resumeId: resume.id, title, content: { ...resume.content, raw: content } });
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  }

  function handleDownload() {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/50 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/resumes" className="text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent border-0 text-lg font-bold text-white focus:ring-0 focus:outline-none min-w-[250px]"
            placeholder="Resume Title..."
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-zinc-900 border-white/10 text-white">
            <Download className="w-4 h-4" /> Download
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2 bg-zinc-900 border-white/10 text-white">
            <Printer className="w-4 h-4" /> Print / PDF
          </Button>
          <Button onClick={handleSave} disabled={isPending} size="sm" className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Body — Split Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Text Editor */}
        <div className="w-1/2 border-r border-white/10 flex flex-col bg-zinc-950">
          <p className="text-xs text-zinc-600 px-4 pt-3 pb-1 font-medium uppercase tracking-widest">Edit Content</p>
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
            className="bg-white shadow-2xl rounded-sm w-full max-w-[720px] min-h-[960px]"
            style={{ padding: "44px 52px", fontFamily: "Times New Roman, Times, serif" }}
          >
            <ResumeRenderer text={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
