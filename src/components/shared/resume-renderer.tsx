"use client";

import React from "react";

/** Strip or replace problematic unicode characters that appear as boxes/symbols */
function sanitizeText(text: string): string {
  return text
    // Replace common corrupted emoji sequences with text equivalents
    .replace(/[\u{1F4C4}]/gu, "")
    .replace(/[\u{1F4BB}]/gu, "")
    .replace(/[\u{1F393}]/gu, "")
    .replace(/[\u{1F3C6}]/gu, "")
    .replace(/[\u{2728}]/gu, "")
    .replace(/[\u{1F4C8}]/gu, "")
    .replace(/[\u{2705}]/gu, "")
    .replace(/[\u{1F680}]/gu, "")
    .replace(/[\u{1F4AA}]/gu, "")
    .replace(/[\u{1F4A1}]/gu, "")
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
  variant?: "resume" | "cover-letter";
}

export function ResumeRenderer({ text, variant = "resume" }: ResumeRendererProps) {
  const clean = sanitizeText(text);
  const lines = clean.split("\n");
  const result: React.ReactNode[] = [];
  let bulletItems: React.ReactNode[] = [];
  let nameSet = false;

  const flushBullets = (key: string | number) => {
    if (bulletItems.length > 0) {
      result.push(
        <ul key={`ul-${key}`} className="mt-1 mb-[10px] list-none pl-1">
          {bulletItems.map((item, i) => (
            <li key={i} className="text-[12pt] leading-[1.35] text-black flex items-start gap-[6px] mb-[3px]">
              <span className="shrink-0 mt-[1px] text-[10pt]">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      bulletItems = [];
    }
  };

  // Helper to extract date from string
  const extractDate = (str: string) => {
    // Looks for patterns like "Nov 2025 - Jan 2026", "2023 - 2027", "Mar 2024 - Present"
    const dateRegex = /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d{2})\s*(?:-|–|to)\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d{2}|Present|Current))/i;
    const match = str.match(dateRegex);
    if (match) {
      return {
        textWithoutDate: str.replace(match[0], "").trim().replace(/(^-\s*|\s*-$)/g, "").replace(/(^\|\s*|\s*\|$)/g, "").trim(),
        date: match[0],
      };
    }
    return null;
  };

  // Helper to parse bold markdown inline
  const renderInlineMarkdown = (content: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    while ((match = boldRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(<strong key={lastIndex} className="font-bold">{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }
    return parts.length > 0 ? <>{parts}</> : content;
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushBullets(`blank-${i}`);
      result.push(<div key={`sp-${i}`} className="h-1" />);
      return;
    }

    // Section divider - ignore because we auto-add border under section headers
    if (/^[-─=]{3,}$/.test(trimmed)) {
      flushBullets(`hr-${i}`);
      return; 
    }

    // Bullet point (•, -, *, or ►)
    if (/^[•\-\*►]/.test(trimmed)) {
      let content = trimmed.replace(/^[•\-\*►]\s*/, "").trim();
      bulletItems.push(renderInlineMarkdown(content));
      return;
    }

    flushBullets(i);

    // Name — first non-empty line (Only for Resumes)
    if (variant === "resume" && !nameSet) {
      nameSet = true;
      result.push(
        <h1 key={`name-${i}`} className="text-[26pt] font-bold text-center text-black tracking-tight mb-[4px] font-serif">
          {trimmed.replace(/\*\*/g, "")}
        </h1>
      );
      return;
    }

    // Contact line (email, phone, LinkedIn, GitHub) - Only for Resumes
    if (
      variant === "resume" && (
        trimmed.includes("@") ||
        trimmed.includes("linkedin.com") ||
        trimmed.includes("github.com") ||
        (trimmed.includes("|") && trimmed.length < 200 && !trimmed.includes("•") && !trimmed.match(/20\d{2}/)) // Exclude experience lines
      )
    ) {
      // Clean up "Email: ", "Phone: " to save space and look cleaner
      let contactLine = trimmed
        .replace(/Email:\s*/gi, "")
        .replace(/Phone:\s*/gi, "")
        .replace(/LinkedIn:\s*/gi, "")
        .replace(/GitHub:\s*/gi, "");
      
      result.push(
        <p key={`contact-${i}`} className="text-[10pt] text-center text-black mb-[8px] leading-relaxed">
          {contactLine}
        </p>
      );
      return;
    }

    // Section header — ALL CAPS, short (or Title Case if followed by line divider) - Only for Resumes
    const isAllCaps = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
    const isHeader =
      variant === "resume" &&
      (isAllCaps || trimmed === "Professional Summary" || trimmed === "Technical Skills" || trimmed === "Internship Experience" || trimmed === "Experience" || trimmed === "Projects" || trimmed === "Education" || trimmed === "Certifications" || trimmed === "Leadership Activities") &&
      trimmed.length > 2 &&
      trimmed.length < 60;

    if (isHeader) {
      result.push(
        <div key={`sec-${i}`} className="mt-[16px] mb-[6px]">
          <h2 className="text-[13pt] font-bold text-black uppercase border-b-[1.5px] border-black pb-[2px] tracking-[0.05em] font-serif">
            {trimmed.replace(/\*\*/g, "")}
          </h2>
        </div>
      );
      return;
    }

    // Job/education entry header: Usually contains a '|' or a Date - Only for Resumes
    const dateInfo = extractDate(trimmed);
    if (variant === "resume" && (trimmed.includes("|") || dateInfo) && trimmed.length < 150) {
      let leftContent = "";
      let rightContent = "";
      let bottomContent = "";
      let bottomItalic = false;

      if (trimmed.includes("|")) {
        const parts = trimmed.split("|").map((p) => p.trim().replace(/\*\*/g, ""));
        
        if (parts.length === 2) {
          leftContent = parts[0];
          const rightDateInfo = extractDate(parts[1]);
          if (rightDateInfo) {
            bottomContent = rightDateInfo.textWithoutDate;
            rightContent = rightDateInfo.date;
            bottomItalic = true; 
          } else {
            rightContent = parts[1];
          }
        } else if (parts.length >= 3) {
          leftContent = parts[1];
          bottomContent = parts[0];
          rightContent = parts[parts.length - 1];
          bottomItalic = true;
        }
      } else if (dateInfo) {
        if (dateInfo.textWithoutDate.includes(",")) {
          const parts = dateInfo.textWithoutDate.split(",");
          leftContent = parts[0].trim();
          bottomContent = parts.slice(1).join(",").trim();
          bottomItalic = true;
        } else {
          leftContent = dateInfo.textWithoutDate;
        }
        rightContent = dateInfo.date;
      }

      result.push(
        <div key={`job-${i}`} className="mt-[12px] mb-[4px]">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[12pt] font-bold text-black">{leftContent}</span>
            {rightContent && <span className="text-[11pt] text-black shrink-0 font-medium">{rightContent}</span>}
          </div>
          {bottomContent && (
            <div className={`text-[12pt] text-black ${bottomItalic ? "italic" : ""} mt-[2px]`}>
              {bottomContent}
            </div>
          )}
        </div>
      );
      return;
    }

    // Skills line: "Category: Skill1, Skill2..." - Only for Resumes
    if (variant === "resume" && trimmed.includes(":") && trimmed.split(":")[0].length < 35 && !trimmed.startsWith("http")) {
      const parts = trimmed.split(":");
      const category = parts[0].replace(/\*\*/g, "").trim();
      const skills = parts.slice(1).join(":").trim();
      result.push(
        <p key={`p-${i}`} className="text-[11.5pt] leading-[1.4] text-black mb-[6px]">
          <strong className="font-bold text-[12pt]">{category}:</strong> {renderInlineMarkdown(skills)}
        </p>
      );
      return;
    }

    // Regular paragraph
    // If it's a cover letter, add more spacing between paragraphs
    const isCoverLetter = variant === "cover-letter";
    const mb = isCoverLetter ? "mb-[14px]" : "mb-[6px]";
    
    let content = renderInlineMarkdown(trimmed);
    
    // Auto-bold specific cover letter phrases or the very last line (Name)
    if (isCoverLetter) {
      const isSalutation = /^(Dear |To |Dear Hiring Manager|Sincerely|Best regards|Best,|Regards,)/i.test(trimmed);
      const isLastLine = i === lines.length - 1 || (lines.slice(i + 1).filter(l => l.trim().length > 0).length === 0);
      
      if (isSalutation || (isLastLine && trimmed.length < 40)) {
        content = <strong className="font-bold">{content}</strong>;
      }
    }

    result.push(
      <p key={`p-${i}`} className={`text-[11.5pt] leading-[1.6] text-black ${mb} ${isCoverLetter ? "" : "text-justify"}`}>
        {content}
      </p>
    );
  });

  flushBullets("end");
  
  return (
    <div className="text-black font-serif leading-tight">
      {result}
    </div>
  );
}
