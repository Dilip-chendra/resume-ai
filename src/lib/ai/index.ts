import type {
  AIRequest,
  AIResponse,
  AIProvider,
  GenerateResumeRequest,
  RewriteSectionRequest,
  ATSAnalysisRequest,
  CoverLetterRequest,
  InterviewQuestionsRequest,
  ATSAnalysisResult,
} from "./types";

/** ─────────────────────────────────────────────
 *  GEMINI PROVIDER
 * ───────────────────────────────────────────── */
async function callGemini(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

/** ─────────────────────────────────────────────
 *  GROQ PROVIDER
 * ───────────────────────────────────────────── */
async function callGroq(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not configured.");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

/** ─────────────────────────────────────────────
 *  OPENROUTER PROVIDER (fallback)
 * ───────────────────────────────────────────── */
async function callOpenRouter(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured.");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "https://resume-ai-brown-two.vercel.app",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

/** ─────────────────────────────────────────────
 *  NVIDIA PROVIDER
 * ───────────────────────────────────────────── */
async function callNvidia(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA_API_KEY is not configured.");

  const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "meta/llama-3.1-70b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`NVIDIA API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

/** ─────────────────────────────────────────────
 *  SYSTEM PROMPTS
 * ───────────────────────────────────────────── */
const SYSTEM_RESUME_EXPERT = `You are an elite professional resume writer with 20+ years of experience. Your resumes consistently land interviews at top companies. 

CRITICAL FORMATTING RULES — YOU MUST FOLLOW THESE EXACTLY:
1. Output clean, plain text only. NO markdown, NO asterisks, NO hashes, NO bullet dashes except the dash character (•) for bullet points.
2. Use ALL CAPS for section headers (PROFESSIONAL SUMMARY, TECHNICAL SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CERTIFICATIONS).
3. Name goes at the very top, centered, in the format: FULL NAME
4. Contact line below name: Email: x | Phone: x | GitHub: x | LinkedIn: x
5. A horizontal rule (---) separates the header from sections.
6. Each job in Experience: Company Name | Role | Date Range on one line, then bullet points below with •
7. Quantify achievements wherever possible (%, numbers, impact).
8. Never use first-person pronouns (I, my, me).
9. Keep total length to 1-2 pages worth of text.
10. Skills section should be categorized: Programming: ..., Frameworks: ..., Tools: ..., etc.
11. Education: Degree | Institution | Year | GPA (if good)
12. Do NOT use markdown headers (##), bold (**), or italic (*) — those are strictly forbidden.`;

const SYSTEM_COVER_LETTER = `You are an expert cover letter writer. Your letters are compelling, personalized, and land interviews.

CRITICAL FORMATTING RULES:
1. Output clean, plain text only. NO markdown whatsoever.
2. Start with: Dear Hiring Manager,
3. Write 3-4 well-structured paragraphs:
   - Para 1: Strong hook — who you are, role you're applying to, why you're excited
   - Para 2: 2-3 specific achievements tied to the role
   - Para 3: Cultural fit, company-specific connection, what you bring
   - Para 4: Confident close with call to action
4. End with: Sincerely, [Full Name]
5. Keep it under 400 words. No clichés like "I am writing to apply".
6. Do NOT use markdown, bullet points, or special formatting.`;

/** ─────────────────────────────────────────────
 *  PROMPT BUILDERS
 * ───────────────────────────────────────────── */
function buildResumePrompt(req: GenerateResumeRequest): string {
  const sampleSection = req.referenceSample
    ? `\n\nREFERENCE FORMAT SAMPLE — YOU MUST FOLLOW THIS EXACT STRUCTURE AND STYLE:\n---\n${req.referenceSample}\n---\nMatch the above sample's section order, formatting style, depth, and presentation EXACTLY. Replace all content with the new person's actual information.\n`
    : "";

  return `Create a complete, professional resume for the following person.

Target Job Title: ${req.jobTitle}
Tone: ${req.tone}
Experience & Background:
${req.experience}

Skills (incorporate these naturally): ${req.skills.join(", ")}
${req.jobDescription ? `\nTarget Job Description (optimize for this):\n${req.jobDescription}` : ""}
${sampleSection}
REQUIREMENTS:
- Follow the formatting rules in your system prompt EXACTLY
- ATS-optimized with strong keywords from the job description
- Achievement-focused bullet points with quantified results  
- Use ONLY • for bullet points, never - or *
- Output ONLY the resume text, nothing else, no explanations`;
}

function buildRewritePrompt(req: RewriteSectionRequest): string {
  return `Rewrite the following resume section to be more impactful, ATS-optimized, and professional.

Section: ${req.section}
Tone: ${req.tone}
${req.instruction ? `Special instruction: ${req.instruction}` : ""}

Original content:
${req.content}

REQUIREMENTS:
- Keep the same facts but improve the language dramatically
- Add quantified achievements where possible (use percentages, numbers)
- Use strong action verbs
- Match the ${req.tone} tone
- Use • for bullet points ONLY, no markdown
- Return only the improved section content, no explanations`;
}

function buildATSPrompt(req: ATSAnalysisRequest): string {
  return `Analyze the following resume against the job description for ATS compatibility.

RESUME:
${req.resumeText}

JOB DESCRIPTION:
${req.jobDescription}

Provide a JSON response with this exact structure:
{
  "score": <number 0-100>,
  "missingKeywords": [<list of important keywords missing from resume>],
  "presentKeywords": [<list of important keywords present in resume>],
  "suggestions": [<list of specific, actionable improvement suggestions>],
  "summary": "<2-3 sentence overall assessment>"
}

Respond ONLY with the JSON. No markdown code blocks, no explanations.`;
}

function buildCoverLetterPrompt(req: CoverLetterRequest): string {
  const sampleSection = req.referenceSample
    ? `\n\nREFERENCE COVER LETTER FORMAT — FOLLOW THIS EXACT STYLE:\n---\n${req.referenceSample}\n---\nMatch the tone, paragraph structure, opening line style, and closing format EXACTLY.\n`
    : "";

  return `Write a compelling, personalized cover letter for this job application.

Applicant Background (from resume):
${req.resumeText}

Job Title: ${req.jobTitle}
Company: ${req.company}
Tone: ${req.tone}
Job Description:
${req.jobDescription}
${sampleSection}
REQUIREMENTS:
- Follow all formatting rules in your system prompt
- 3-4 paragraphs, under 400 words
- Opening hook — do NOT start with "I am writing to apply"
- Specific connection to the company and role
- 2-3 key achievements from the resume
- Strong closing with call to action
- Output ONLY the cover letter text, nothing else`;
}

function buildInterviewPrompt(req: InterviewQuestionsRequest): string {
  return `Generate 10 realistic ${req.questionType} interview questions for this role.

Job Title: ${req.jobTitle}
Company: ${req.company}
${req.jobDescription ? `Job Description: ${req.jobDescription}` : ""}

Format each question as:
Q: <question>
Tip: <brief tip on how to answer well>

Focus on ${req.questionType === "behavioral" ? "STAR-method behavioral scenarios" : req.questionType === "technical" ? "practical technical skills and problem-solving" : "company culture, values, and role-specific scenarios"}.`;
}

/** ─────────────────────────────────────────────
 *  MAIN AI SERVICE
 * ───────────────────────────────────────────── */
export async function runAI(request: AIRequest): Promise<AIResponse> {
  const provider: AIProvider = request.provider ?? (process.env.GROQ_API_KEY ? "groq" : "gemini");

  let prompt = "";
  let systemPrompt = SYSTEM_RESUME_EXPERT;

  switch (request.type) {
    case "generate_resume":
      prompt = buildResumePrompt(request as GenerateResumeRequest);
      break;
    case "rewrite_section":
      prompt = buildRewritePrompt(request as RewriteSectionRequest);
      break;
    case "ats_analysis":
      prompt = buildATSPrompt(request as ATSAnalysisRequest);
      systemPrompt = "You are an ATS (Applicant Tracking System) expert. Always respond with valid JSON only.";
      break;
    case "cover_letter":
      prompt = buildCoverLetterPrompt(request as CoverLetterRequest);
      systemPrompt = SYSTEM_COVER_LETTER;
      break;
    case "interview_questions":
      prompt = buildInterviewPrompt(request as InterviewQuestionsRequest);
      systemPrompt = "You are a senior recruiter and career coach at a top firm.";
      break;
    default:
      throw new Error(`Unknown AI request type`);
  }

  let text = "";

  try {
    if (provider === "nvidia") {
      text = await callNvidia(prompt, systemPrompt);
    } else if (provider === "gemini") {
      text = await callGemini(prompt, systemPrompt);
    } else if (provider === "groq") {
      text = await callGroq(prompt, systemPrompt);
    } else {
      text = await callOpenRouter(prompt, systemPrompt);
    }
  } catch (primaryError) {
    console.warn(`Primary provider ${provider} failed, falling back...`, primaryError);
    try {
      text = await callGroq(prompt, systemPrompt);
    } catch {
      try {
        text = await callNvidia(prompt, systemPrompt);
      } catch (finalError) {
        console.warn("All providers failed:", finalError);
        text = await callOpenRouter(prompt, systemPrompt);
      }
    }
  }

  return { data: text, provider };
}

/**
 * Specialized helper: run ATS analysis and parse the JSON result.
 */
export async function runATSAnalysis(
  resumeText: string,
  jobDescription: string,
  provider?: AIProvider
): Promise<ATSAnalysisResult> {
  const result = await runAI({
    type: "ats_analysis",
    resumeText,
    jobDescription,
    provider,
  });

  try {
    return JSON.parse(result.data) as ATSAnalysisResult;
  } catch {
    const jsonMatch = result.data.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]) as ATSAnalysisResult;
    throw new Error("Failed to parse ATS analysis response from AI.");
  }
}
