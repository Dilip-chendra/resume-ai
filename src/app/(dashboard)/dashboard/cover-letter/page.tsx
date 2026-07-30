import { CoverLetterForm } from "@/components/shared/cover-letter-form";
import { PenLine, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
  title: "AI Cover Letter — ResumeAI",
  description: "Generate personalized cover letters instantly.",
};

export default async function CoverLetterPage() {
  const { userId } = await auth();

  let user = null;
  if (userId) {
    user = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        resumes: {
          orderBy: { updatedAt: "desc" },
          select: { id: true, title: true }
        }
      }
    });
  }

  const resumes = user?.resumes ?? [];

  return (
    <div className="min-h-full bg-zinc-950 p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-semibold text-pink-300 mb-4">
            <PenLine className="w-3 h-3" />
            AI Cover Letter Generator
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Write a Cover Letter</h1>
          <p className="text-zinc-400">
            Select a resume and paste the job details. Our AI will craft a personalized cover letter that highlights your most relevant achievements.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 md:p-8">
          <CoverLetterForm resumes={resumes} />
        </div>
        
        {user && (
          <p className="text-center text-xs text-zinc-700 mt-6">
            1 AI credit will be deducted.
          </p>
        )}
      </div>
    </div>
  );
}
