"use client";

import React from "react";

/** Strip or replace problematic unicode characters that appear as boxes/symbols */
function sanitizeText(text: string): string {
  return text
    // Replace common corrupted emoji sequences with text equivalents
    .replace(/[\u{1F4C4}]/gu, "")   // page/document emojis
    .replace(/[\u{1F4BB}]/gu, "")   // laptop
    .replace(/[\u{1F393}]/gu, "")   // graduation cap
    .replace(/[\u{1F3C6}]/gu, "")   // trophy
    .replace(/[\u{2728}]/gu, "")    // sparkles
    .replace(/[\u{1F4C8}]/gu, "")   // chart
    .replace(/[\u{2705}]/gu, "")    // check mark
    .replace(/[\u{1F680}]/gu, "")   // rocket
    .replace(/[\u{1F4AA}]/gu, "")   // muscle
    .replace(/[\u{1F4A1}]/gu, "")   // bulb
    // Remove any remaining emoji/pictograph ranges
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, "")
    .replace(/[\u{2600}-\u{27BF}]/gu, "")
    // Remove zero-width chars
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    // Replace bullet chars that may render as boxes
    .replace(/[â€¢]/g, "•")
    .replace(/[Ã¢â‚¬Â¢]/g, "•")
    // Fix common Windows-1252 corruption patterns
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/â€"/g, "—")
    .replace(/â€"/g, "–")
    .trim();
}

interface ResumeRendererProps {
  text: string;
}

export function ResumeRenderer({ text }: ResumeRendererProps) {
  const clean = sanitizeText(text);
  const lines = clean.split("\n");
  const result: React.ReactNode[] = [];
  let bulletItems: string[] = [];
  let nameSet = false;

  const flushBullets = (key: string | number) => {
    if (bulletItems.length > 0) {
      result.push(
        <ul key={`ul-${key}`} className="mt-1 mb-2 space-y-[3px] pl-0 list-none">
          {bulletItems.map((item, i) => (
            <li key={i} className="text-[12.5px] leading-[1.55] text-zinc-700 flex gap-2">
              <span className="shrink-0 text-zinc-500 mt-[1px]">•</span>
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
      flushBullets(`blank-${i}`);
      result.push(<div key={`sp-${i}`} className="h-1.5" />);
      return;
    }

    // Section divider
    if (/^[-─=]{3,}$/.test(trimmed)) {
      flushBullets(`hr-${i}`);
      result.push(<hr key={`hr-${i}`} className="border-zinc-300 my-2" />);
      return;
    }

    // Bullet point (•, -, *, or ►)
    if (/^[•\-\*►]/.test(trimmed)) {
      const content = trimmed.replace(/^[•\-\*►]\s*/, "").trim();
      bulletItems.push(content);
      return;
    }

    flushBullets(i);

    // Name — first non-empty line
    if (!nameSet) {
      nameSet = true;
      result.push(
        <h1 key={`name-${i}`} className="text-[22px] font-bold text-center text-zinc-900 tracking-wide mb-1 font-sans">
          {trimmed}
        </h1>
      );
      return;
    }

    // Contact line (email, phone, LinkedIn, pipes)
    if (
      trimmed.includes("@") ||
      trimmed.includes("linkedin.com") ||
      trimmed.includes("github.com") ||
      (trimmed.includes("|") && trimmed.length < 200 && !trimmed.includes("•"))
    ) {
      result.push(
        <p key={`contact-${i}`} className="text-[11.5px] text-center text-zinc-500 mb-2 leading-relaxed">
          {trimmed}
        </p>
      );
      return;
    }

    // Section header — ALL CAPS, short
    const isHeader =
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 2 &&
      trimmed.length < 60 &&
      /^[A-Z\s\/&\-]+$/.test(trimmed);

    if (isHeader) {
      result.push(
        <div key={`sec-${i}`} className="mt-5 mb-1">
          <h2 className="text-[11px] font-extrabold tracking-[0.15em] text-zinc-800 uppercase border-b-2 border-zinc-800 pb-0.5">
            {trimmed}
          </h2>
        </div>
      );
      return;
    }

    // Job/education entry header: "Company | Role | Date"
    if (trimmed.includes("|") && !trimmed.includes("@")) {
      const parts = trimmed.split("|").map((p) => p.trim());
      result.push(
        <div key={`job-${i}`} className="flex items-baseline justify-between gap-2 mt-3">
          <span className="text-[13px] font-bold text-zinc-800">{parts[0]}</span>
          <span className="text-[11.5px] text-zinc-500 italic shrink-0">{parts[parts.length - 1]}</span>
        </div>
      );
      if (parts.length === 3) {
        result.push(
          <p key={`role-${i}`} className="text-[12px] text-zinc-600 font-medium mt-0">
            {parts[1]}
          </p>
        );
      }
      return;
    }

    // Regular paragraph
    result.push(
      <p key={`p-${i}`} className="text-[12.5px] leading-[1.6] text-zinc-700">
        {trimmed}
      </p>
    );
  });

  flushBullets("end");
  return <>{result}</>;
}
