"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

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

type Block = {
  id: string;
  jsx: React.ReactNode;
};

// 297mm height at 96dpi = 1122.5px. Margins 25.4mm = 96px top/bottom.
const PRINTABLE_HEIGHT = 1122 - 96 * 2 - 2; 

export function ResumeRenderer({ text, variant = "resume" }: ResumeRendererProps) {
  const [pages, setPages] = useState<Block[][] | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Helper to extract date from string
  const extractDate = (str: string) => {
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

  const renderInlineMarkdown = (content: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    while ((match = boldRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(<strong key={lastIndex} className="font-bold text-black">{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }
    return parts.length > 0 ? <>{parts}</> : content;
  };

  // Parse text into logical blocks
  const parseBlocks = (): Block[] => {
    const clean = sanitizeText(text);
    const lines = clean.split("\n");
    const blocks: Block[] = [];
    let bulletItems: React.ReactNode[] = [];
    let nameSet = false;

    const flushBullets = (index: number | string) => {
      if (bulletItems.length > 0) {
        blocks.push({
          id: `ul-${index}`,
          jsx: (
            <ul className="mt-[4px] mb-[12px] list-none pl-1">
              {bulletItems.map((item, i) => (
                <li key={i} className="text-[11pt] leading-[1.5] text-black flex items-start gap-[8px] mb-[4px]">
                  <span className="shrink-0 mt-[4px] text-[8pt]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ),
        });
        bulletItems = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushBullets(`blank-${i}`);
        blocks.push({ id: `sp-${i}`, jsx: <div className="h-2" /> });
        return;
      }

      if (/^[-─=]{3,}$/.test(trimmed)) {
        flushBullets(`hr-${i}`);
        return;
      }

      if (/^[•\-\*►]/.test(trimmed)) {
        let content = trimmed.replace(/^[•\-\*►]\s*/, "").trim();
        bulletItems.push(renderInlineMarkdown(content));
        return;
      }

      flushBullets(i);

      if (variant === "resume" && !nameSet) {
        nameSet = true;
        blocks.push({
          id: `name-${i}`,
          jsx: (
            <h1 className="text-[24pt] font-bold text-center text-black tracking-tight mb-[4px]">
              {trimmed.replace(/\*\*/g, "")}
            </h1>
          ),
        });
        return;
      }

      if (
        variant === "resume" && (
          trimmed.includes("@") ||
          trimmed.includes("linkedin.com") ||
          trimmed.includes("github.com") ||
          (trimmed.includes("|") && trimmed.length < 200 && !trimmed.includes("•") && !trimmed.match(/20\d{2}/))
        )
      ) {
        let contactLine = trimmed
          .replace(/Email:\s*/gi, "")
          .replace(/Phone:\s*/gi, "")
          .replace(/LinkedIn:\s*/gi, "")
          .replace(/GitHub:\s*/gi, "");
        
        blocks.push({
          id: `contact-${i}`,
          jsx: <p className="text-[10.5pt] text-center text-black mb-[12px] leading-relaxed">{contactLine}</p>,
        });
        return;
      }

      const isAllCaps = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
      const isHeader =
        variant === "resume" &&
        (isAllCaps || trimmed === "Professional Summary" || trimmed === "Technical Skills" || trimmed === "Internship Experience" || trimmed === "Experience" || trimmed === "Projects" || trimmed === "Education" || trimmed === "Certifications" || trimmed === "Leadership Activities") &&
        trimmed.length > 2 &&
        trimmed.length < 60;

      if (isHeader) {
        blocks.push({
          id: `sec-${i}`,
          jsx: (
            <div className="mt-[16px] mb-[6px]">
              <h2 className="text-[12pt] font-bold text-black uppercase border-b-[1px] border-zinc-400 pb-[2px] tracking-[0.08em]">
                {trimmed.replace(/\*\*/g, "")}
              </h2>
            </div>
          ),
        });
        return;
      }

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
            leftContent = parts[0]; 
            bottomContent = parts[1];
            bottomItalic = true;
            
            const dateMatch = extractDate(parts.slice(2).join(" | "));
            if (dateMatch) {
                rightContent = dateMatch.date;
                if (dateMatch.textWithoutDate) {
                   bottomContent += ", " + dateMatch.textWithoutDate;
                }
            } else {
                rightContent = parts.slice(2).join(" | ");
            }
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

        blocks.push({
          id: `job-${i}`,
          jsx: (
            <div className="mt-[14px] mb-[6px]">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[12pt] font-semibold tracking-tight text-black">{leftContent}</span>
                {rightContent && <span className="text-[10pt] text-zinc-800 shrink-0 font-medium">{rightContent}</span>}
              </div>
              {bottomContent && (
                <div className={`text-[10.5pt] text-zinc-900 font-medium ${bottomItalic ? "italic" : ""} mt-[1px]`}>
                  {bottomContent}
                </div>
              )}
            </div>
          ),
        });
        return;
      }

      if (variant === "resume" && trimmed.includes(":") && trimmed.split(":")[0].length < 35 && !trimmed.startsWith("http")) {
        const parts = trimmed.split(":");
        const category = parts[0].replace(/\*\*/g, "").trim();
        const skills = parts.slice(1).join(":").trim();
        blocks.push({
          id: `p-${i}`,
          jsx: (
            <p className="text-[11pt] leading-[1.5] text-black mb-[6px]">
              <strong className="font-bold">{category}:</strong> {renderInlineMarkdown(skills)}
            </p>
          ),
        });
        return;
      }

      const isCoverLetter = variant === "cover-letter";
      const mb = isCoverLetter ? "mb-[16px]" : "mb-[8px]";
      
      let content = renderInlineMarkdown(trimmed);
      
      if (isCoverLetter) {
        const isSalutation = /^(Dear |To |Dear Hiring Manager|Sincerely|Best regards|Best,|Regards,)/i.test(trimmed);
        const isLastLine = i === lines.length - 1 || (lines.slice(i + 1).filter(l => l.trim().length > 0).length === 0);
        
        if (isSalutation || (isLastLine && trimmed.length < 40)) {
          content = <strong className="font-bold text-black">{content}</strong>;
        }
      }

      blocks.push({
        id: `p-${i}`,
        jsx: (
          <p className={`text-[11pt] leading-[1.6] text-black ${mb} ${isCoverLetter ? "" : "text-justify"}`}>
            {content}
          </p>
        ),
      });
    });

    flushBullets("end");
    return blocks;
  };

  const blocks = parseBlocks();

  // Re-measure whenever text changes
  useEffect(() => {
    setPages(null);
  }, [text, variant]);

  useLayoutEffect(() => {
    if (pages !== null) return; // already paginated

    const newPages: Block[][] = [[]];
    let currentHeight = 0;
    let currentPageIndex = 0;
    
    // We want to avoid pushing a header if there's no content after it on the same page
    let pendingHeader: Block | null = null;
    let pendingHeaderHeight = 0;

    blocks.forEach((block, i) => {
      const el = blockRefs.current[i];
      const rect = el?.getBoundingClientRect();
      const blockHeight = rect ? rect.height : 0;
      
      const isHeader = block.id.startsWith("sec-");

      if (isHeader) {
        // Hold the header temporarily to see if the next content fits
        pendingHeader = block;
        pendingHeaderHeight = blockHeight;
        return;
      }

      // If we have a pending header, we evaluate it along with the current block
      const effectiveHeight = currentHeight + (pendingHeader ? pendingHeaderHeight : 0) + blockHeight;

      if (effectiveHeight > PRINTABLE_HEIGHT && newPages[currentPageIndex].length > 0) {
        // Doesn't fit, jump to new page
        currentPageIndex++;
        newPages.push([]);
        currentHeight = 0;
        
        if (pendingHeader) {
          newPages[currentPageIndex].push(pendingHeader);
          currentHeight += pendingHeaderHeight;
          pendingHeader = null;
        }
        
        newPages[currentPageIndex].push(block);
        currentHeight += blockHeight;
      } else {
        // Fits on current page
        if (pendingHeader) {
          newPages[currentPageIndex].push(pendingHeader);
          currentHeight += pendingHeaderHeight;
          pendingHeader = null;
        }
        newPages[currentPageIndex].push(block);
        currentHeight += blockHeight;
      }
    });
    
    // Flush any trailing header
    if (pendingHeader) {
      if (currentHeight + pendingHeaderHeight > PRINTABLE_HEIGHT && newPages[currentPageIndex].length > 0) {
        newPages.push([pendingHeader]);
      } else {
        newPages[currentPageIndex].push(pendingHeader);
      }
    }

    setPages(newPages);
  }, [blocks, pages]);

  // Pass 1: Render invisibly to measure
  if (pages === null) {
    return (
      <div 
        className="bg-white shadow-2xl relative opacity-0 pointer-events-none -z-10"
        style={{ width: "210mm", padding: "25.4mm" }}
      >
        <div className="font-sans text-black" style={{ fontFamily: "'Inter', 'Calibri', 'Source Sans Pro', sans-serif" }}>
          {blocks.map((b, i) => (
            <div key={b.id} ref={(el) => { blockRefs.current[i] = el; }}>
              {b.jsx}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Pass 2: Render separated physical pages
  return (
    <div className="flex flex-col items-center gap-8 font-sans" id="pdf-export-container">
      {pages.map((pageBlocks, pageIndex) => (
        <div
          key={`page-${pageIndex}`}
          className="a4-page bg-white shadow-xl relative"
          style={{
            width: "210mm",
            minHeight: "297mm", // 1122px
            padding: "25.4mm", // 96px
            boxSizing: "border-box",
            fontFamily: "'Inter', 'Calibri', 'Source Sans Pro', sans-serif"
          }}
        >
          <div className="h-full flex flex-col">
            {pageBlocks.map((b) => (
              <React.Fragment key={b.id}>{b.jsx}</React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
