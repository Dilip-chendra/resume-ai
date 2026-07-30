﻿"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { runAI, runATSAnalysis } from "@/lib/ai";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// â"€â"€â"€ Schemas â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
const CreateResumeSchema = z.object({
  title: z.string().min(1).max(100),
  jobTitle: z.string().min(1),
  experience: z.string().min(10),
  skills: z.string(), // comma-separated
  tone: z.enum(["professional", "student", "executive"]),
  jobDescription: z.string().optional(),
});

const UpdateResumeSchema = z.object({
  resumeId: z.string().cuid(),
  title: z.string().min(1).max(100).optional(),
  content: z.any().optional(),
});

const ATSAnalysisSchema = z.object({
  resumeId: z.string().cuid().optional(),
  resumeText: z.string().optional(),
  jobDescription: z.string().min(50, "Please provide at least 50 characters for accurate analysis."),
});

// â"€â"€â"€ Helper â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
async function getOptionalUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: {
      id: true,
      clerkId: true,
      credits: true,
      tier: true,
      resumeSample: true,
      coverLetterSample: true,
    },
  });
  return user;
}

// â"€â"€â"€ Actions â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

/**
 * Creates a new AI-generated resume and saves it to the database (if logged in).
 */
export async function createResumeAction(formData: FormData) {
  const user = await getOptionalUser();

  // Free forever!

  const raw = Object.fromEntries(formData.entries());
  const parsed = CreateResumeSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { title, jobTitle, experience, skills, tone, jobDescription } = parsed.data;

  try {
    // Call AI -- inject the user's formatting sample if available
    const aiResult = await runAI({
      type: "generate_resume",
      jobTitle,
      experience,
      skills: skills.split(",").map((s) => s.trim()),
      tone,
      jobDescription,
      referenceSample: user?.resumeSample ?? undefined,
    });

    // If guest, just return the content
    if (!user) {
      return { success: true, content: aiResult.data, guest: true, tone, jobTitle };
    }

    // Create resume in DB
    const resume = await db.resume.create({
      data: {
        userId: user.id,
        title,
        content: {
          raw: aiResult.data,
          sections: {},
          generatedAt: new Date().toISOString(),
          tone,
          jobTitle,
        },
      },
    });

    // Deduct credit
    // await db.user.update(...) removed for free access

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/resumes");

    return { success: true, resumeId: resume.id };
  } catch (err) {
    console.error("createResumeAction error:", err);
    return { error: "Failed to generate resume. Please try again." };
  }
}

/**
 * Updates a resume's title or content. (Authenticated only)
 */
export async function updateResumeAction(data: z.infer<typeof UpdateResumeSchema>) {
  const user = await getOptionalUser();
  if (!user) return { error: "Guests cannot save updates. Please sign in." };

  const parsed = UpdateResumeSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid input." };

  const { resumeId, title, content } = parsed.data;

  const resume = await db.resume.findFirst({
    where: { id: resumeId, userId: user.id },
  });
  if (!resume) return { error: "Resume not found." };

  await db.resume.update({
    where: { id: resumeId },
    data: {
      ...(title && { title }),
      ...(content && { content }),
    },
  });

  revalidatePath(`/dashboard/resumes/${resumeId}`);
  return { success: true };
}

/**
 * Deletes a resume permanently. (Authenticated only)
 */
export async function deleteResumeAction(resumeId: string) {
  const user = await getOptionalUser();
  if (!user) return { error: "Guests cannot delete files. Please sign in." };

  const resume = await db.resume.findFirst({
    where: { id: resumeId, userId: user.id },
  });
  if (!resume) return { error: "Resume not found." };

  await db.resume.delete({ where: { id: resumeId } });
  revalidatePath("/dashboard/resumes");
  return { success: true };
}

/**
 * Runs ATS analysis on a resume against a job description.
 */
export async function runATSAnalysisAction(formData: FormData) {
  const user = await getOptionalUser();

  const raw = Object.fromEntries(formData.entries());
  const parsed = ATSAnalysisSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { resumeId, jobDescription, resumeText: rawResumeText } = parsed.data;
  let resumeText = rawResumeText;

  // If a resumeId is provided, fetch it from DB (requires auth)
  if (resumeId) {
    if (!user) return { error: "Cannot access saved resume as a guest." };
    const resume = await db.resume.findFirst({
      where: { id: resumeId, userId: user.id },
    });
    if (!resume) return { error: "Resume not found." };
    const content = resume.content as { raw?: string };
    resumeText = content?.raw ?? JSON.stringify(resume.content);
  }

  if (!resumeText) {
    return { error: "Please provide resume content or select a saved resume." };
  }

  try {
    const analysis = await runATSAnalysis(resumeText, jobDescription);

    // If guest, return without saving
    if (!user || !resumeId) {
      return { success: true, analysis, guest: true };
    }

    // Save report
    const report = await db.atsReport.create({
      data: {
        userId: user.id,
        resumeId,
        score: analysis.score,
        missingKeys: analysis.missingKeywords,
        suggestions: analysis.suggestions,
      },
    });

    revalidatePath("/dashboard/ats");
    return { success: true, analysis, reportId: report.id };
  } catch (err) {
    console.error("runATSAnalysisAction error:", err);
    return { error: "ATS analysis failed. Please try again." };
  }
}

/**
 * Generates a cover letter using AI.
 */
export async function generateCoverLetterAction(formData: FormData) {
  const user = await getOptionalUser();

  // Free forever!

  const resumeId = formData.get("resumeId") as string;
  const rawResumeText = formData.get("resumeText") as string;
  const jobTitle = formData.get("jobTitle") as string;
  const company = formData.get("company") as string;
  const jobDescription = formData.get("jobDescription") as string;
  const tone = (formData.get("tone") as "professional" | "student" | "executive") ?? "professional";

  if (!jobTitle || !company || !jobDescription) {
    return { error: "Please fill in all required fields." };
  }

  let resumeText = rawResumeText;

  if (resumeId) {
    if (!user) return { error: "Cannot access saved resume as a guest." };
    const resume = await db.resume.findFirst({ where: { id: resumeId, userId: user.id } });
    if (resume) {
      resumeText = (resume.content as { raw?: string })?.raw ?? "";
    }
  }

  if (!resumeText) {
    return { error: "Please provide resume content." };
  }

  try {
    const result = await runAI({
      type: "cover_letter",
      resumeText,
      jobTitle,
      company,
      jobDescription,
      tone,
      referenceSample: user?.coverLetterSample ?? undefined,
    });

    if (!user) {
      return { success: true, content: result.data, guest: true };
    }

    await db.coverLetter.create({
      data: {
        userId: user.id,
        content: result.data,
        targetJob: `${jobTitle} at ${company}`,
      },
    });

    // await db.user.update(...) removed for free access

    revalidatePath("/dashboard/cover-letter");
    return { success: true, content: result.data };
  } catch (err) {
    console.error("generateCoverLetterAction error:", err);
    return { error: "Failed to generate cover letter. Please try again." };
  }
}

/**
 * Rewrites a section of a resume using AI.
 */
export async function rewriteSectionAction(formData: FormData) {
  const user = await getOptionalUser();

  // Free forever!

  const section = formData.get("section") as string;
  const content = formData.get("content") as string;
  const tone = (formData.get("tone") as "professional" | "student" | "executive") ?? "professional";

  if (!section || !content) {
    return { error: "Please provide section name and content." };
  }

  try {
    const result = await runAI({
      type: "rewrite_section",
      section,
      content,
      tone,
    });

    if (user) {
      // await db.user.update(...) removed for free access
    }

    return { success: true, content: result.data, guest: !user };
  } catch (err) {
    console.error("rewriteSectionAction error:", err);
    return { error: "Rewrite failed. Please try again." };
  }
}

/**
 * Creates a resume from fully structured wizard data for world-class output.
 */
export async function createStructuredResumeAction(payload: {
  resumeTitle: string;
  targetRole: string;
  tone: string;
  jobDescription: string;
  personal: { fullName: string; email: string; phone: string; linkedin: string; github: string; location: string };
  experiences: Array<{ company: string; role: string; startDate: string; endDate: string; current: boolean; location: string; description: string }>;
  education: Array<{ degree: string; institution: string; startYear: string; endYear: string; gpa: string; location: string }>;
  projects: Array<{ name: string; technologies: string; description: string }>;
  skills: { programming: string; frameworks: string; generativeAI: string; tools: string; technologies: string };
  certs: Array<{ name: string; issuer: string; year: string }>;
  leadership: string;
}) {
  const user = await getOptionalUser();
  // Free forever - no credit limits!
  if (!payload.resumeTitle?.trim()) return { error: "Resume title is required." };
  if (!payload.targetRole?.trim()) return { error: "Target job title is required." };
  if (!payload.personal?.fullName?.trim()) return { error: "Full name is required." };

  const { personal, experiences, education, projects, skills, certs, leadership } = payload;

  const expSection = experiences.length > 0
    ? experiences.map((exp, i) =>
        `${i + 1}. Company: ${exp.company}\n   Role: ${exp.role}\n   Period: ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}${exp.location ? "\n   Location: " + exp.location : ""}\n   Achievements:\n${exp.description || "   N/A"}`
      ).join("\n\n")
    : "No experience provided.";

  const eduSection = education.length > 0
    ? education.map(e => `- ${e.degree} | ${e.institution}${e.location ? ", " + e.location : ""} | ${e.startYear}${e.endYear ? " - " + e.endYear : ""}${e.gpa ? " | GPA: " + e.gpa : ""}`).join("\n")
    : "No education provided.";

  const projSection = projects.length > 0
    ? projects.map((p, i) =>
        `${i + 1}. Project: ${p.name}\n   Technologies: ${p.technologies || "N/A"}\n   Description:\n${p.description || "   N/A"}`
      ).join("\n\n")
    : "No projects provided.";

  const skillsLines = [
    skills.programming ? `Programming: ${skills.programming}` : "",
    skills.frameworks ? `Frameworks: ${skills.frameworks}` : "",
    skills.generativeAI ? `AI / Generative AI: ${skills.generativeAI}` : "",
    skills.tools ? `Tools: ${skills.tools}` : "",
    skills.technologies ? `Technologies: ${skills.technologies}` : "",
  ].filter(Boolean).join("\n");

  const certLines = certs.length > 0
    ? certs.map(c => `- ${c.name}${c.issuer ? " - " + c.issuer : ""}${c.year ? " (" + c.year + ")" : ""}`).join("\n")
    : "";

  const structuredPrompt = `Create a complete, professional resume for the following person. Use ALL information provided.

===== PERSONAL INFORMATION =====
Full Name: ${personal.fullName}
Email: ${personal.email}
Phone: ${personal.phone}
LinkedIn: ${personal.linkedin}
GitHub: ${personal.github}
Location: ${personal.location}

===== TARGET ROLE & TONE =====
Target Job Title: ${payload.targetRole}
Writing Tone: ${payload.tone}
${payload.jobDescription ? `\nTarget Job Description:\n${payload.jobDescription}` : ""}

===== WORK EXPERIENCE =====
${expSection}

===== EDUCATION =====
${eduSection}

===== PROJECTS =====
${projSection}

===== TECHNICAL SKILLS =====
${skillsLines || "No skills provided."}

${certLines ? `===== CERTIFICATIONS =====\n${certLines}` : ""}
${leadership ? `\n===== LEADERSHIP & ACTIVITIES =====\n${leadership}` : ""}
${user?.resumeSample ? `\n===== REFERENCE FORMAT (follow this structure exactly) =====\n${user.resumeSample}` : ""}

Output the complete resume as clean plain text only. No markdown.`;

  try {
    const aiResult = await runAI({
      type: "generate_resume",
      jobTitle: payload.targetRole,
      experience: structuredPrompt,
      skills: [],
      tone: payload.tone as "professional" | "student" | "executive",
      jobDescription: payload.jobDescription || undefined,
      referenceSample: user?.resumeSample ?? undefined,
    });

    if (!user) {
      return { success: true, content: aiResult.data, guest: true };
    }

    const resume = await db.resume.create({
      data: {
        userId: user.id,
        title: payload.resumeTitle,
        content: {
          raw: aiResult.data,
          structured: payload,
          generatedAt: new Date().toISOString(),
          tone: payload.tone,
          jobTitle: payload.targetRole,
        },
      },
    });

    // // await db.user.update(...) removed for free access
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/resumes");
    return { success: true, resumeId: resume.id };
  } catch (err) {
    console.error("createStructuredResumeAction error:", err);
    return { error: "Failed to generate resume. Please try again." };
  }
}



