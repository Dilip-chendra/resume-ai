/**
 * AI Provider Types — central contract for all AI interactions.
 * Every provider must conform to these interfaces.
 */

export type AIProvider = "gemini" | "groq" | "nvidia" | "openrouter";

export type ToneOption = "professional" | "student" | "executive";

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIRequestBase {
  provider?: AIProvider;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerateResumeRequest extends AIRequestBase {
  type: "generate_resume";
  jobTitle: string;
  experience: string;
  skills: string[];
  tone: ToneOption;
  jobDescription?: string;
  referenceSample?: string;
}

export interface RewriteSectionRequest extends AIRequestBase {
  type: "rewrite_section";
  section: string;
  content: string;
  tone: ToneOption;
  instruction?: string;
}

export interface ATSAnalysisRequest extends AIRequestBase {
  type: "ats_analysis";
  resumeText: string;
  jobDescription: string;
}

export interface CoverLetterRequest extends AIRequestBase {
  type: "cover_letter";
  resumeText: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  tone: ToneOption;
  referenceSample?: string;
}

export interface InterviewQuestionsRequest extends AIRequestBase {
  type: "interview_questions";
  jobTitle: string;
  company: string;
  jobDescription?: string;
  questionType: "behavioral" | "technical" | "company";
}

export type AIRequest =
  | GenerateResumeRequest
  | RewriteSectionRequest
  | ATSAnalysisRequest
  | CoverLetterRequest
  | InterviewQuestionsRequest;

export interface ATSAnalysisResult {
  score: number;
  missingKeywords: string[];
  presentKeywords: string[];
  suggestions: string[];
  summary: string;
}

export interface AIResponse<T = string> {
  data: T;
  provider: AIProvider;
  tokensUsed?: number;
}
