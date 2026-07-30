import { sendGAEvent } from "@next/third-parties/google";

export const trackResumeCreated = (method: "scratch" | "linkedin" = "scratch") => {
  sendGAEvent("event", "resume_created", { method });
};

export const trackResumeDownloaded = (format: "pdf" | "txt" = "pdf") => {
  sendGAEvent("event", "resume_downloaded", { format });
};

export const trackLogin = (method: string = "email") => {
  sendGAEvent("event", "login", { method });
};

export const trackSignup = (method: string = "email") => {
  sendGAEvent("event", "sign_up", { method });
};

export const trackUpgrade = (plan: "pro" | "enterprise") => {
  sendGAEvent("event", "upgrade_plan", { plan });
};

export const trackATSScan = (score: number) => {
  sendGAEvent("event", "ats_scan_completed", { score });
};

export const trackTemplateSelected = (templateId: string) => {
  sendGAEvent("event", "template_selected", { template_id: templateId });
};

export const trackAIRewrite = (type: "bullet" | "summary") => {
  sendGAEvent("event", "ai_rewrite_used", { type });
};
