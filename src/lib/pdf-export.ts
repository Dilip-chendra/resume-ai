"use client";

/**
 * To achieve 100% ATS compatibility with SELECTABLE TEXT,
 * we must use the browser's native print engine.
 * Client-side libraries like html2pdf.js use html2canvas which
 * converts the resume into an un-parseable JPEG image.
 */
export async function exportResumePdf(
  elementId: string,
  filename: string
): Promise<void> {
  if (typeof window === "undefined") return;

  // Set document title temporarily to influence the default save filename
  const originalTitle = document.title;
  document.title = filename || "Resume";

  // Natively trigger the print dialog. 
  // The CSS @media print rules perfectly format the A4 pages.
  window.print();

  // Restore title
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}
