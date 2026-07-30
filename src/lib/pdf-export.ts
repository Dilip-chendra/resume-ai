"use client";

/**
 * Generates a real PDF from the resume paper element using html2pdf.js.
 * Falls back to window.print() if anything fails.
 */
export async function exportResumePdf(
  elementId: string,
  filename: string
): Promise<void> {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  const safeName = filename
    .replace(/[^a-zA-Z0-9_\-\s]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 80);

  try {
    // Dynamic import — keeps initial bundle small
    const html2pdfModule = await import("html2pdf.js");
    const html2pdf = html2pdfModule.default;

    // Use any to bypass strict type checking on the options object
    // html2pdf.js types are incomplete/mismatched
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const worker = (html2pdf as any)();

    await worker
      .set({
        margin: [10, 10, 10, 10],
        filename: `${safeName}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .from(element)
      .save();
  } catch (err) {
    console.error("[exportResumePdf] Failed, falling back to print:", err);
    window.print();
  }
}
