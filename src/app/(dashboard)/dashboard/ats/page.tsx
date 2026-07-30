import { ATSScannerForm } from "@/components/shared/ats-scanner-form";
import { ScanText, ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
  title: "ATS Scanner — ResumeAI",
  description: "Check your resume's ATS compatibility score.",
};

export default async function ATSScannerPage() {
  const { userId } = await auth();
  
  let latestResume = null;

  if (userId) {
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        resumes: { select: { id: true, title: true } },
      }
    });
    
    if (user && user.resumes.length > 0) {
      latestResume = user.resumes[0];
    }
  }

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300 mb-4">
            <ScanText className="w-3 h-3" />
            ATS Compatibility Scanner
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Scan Your Resume</h1>
          <p className="text-zinc-400">
            {latestResume ? (
              <>Paste the job description below. We'll analyze your most recent resume ("<span className="text-white font-medium">{latestResume.title}</span>") and score it based on keywords and formatting.</>
            ) : (
              <>Paste your resume and the target job description below to get an instant ATS compatibility score and keywords analysis.</>
            )}
          </p>
        </div>
        
        {/* Info Alert */}
        <div className="flex items-start gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4 mb-8">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-200">
            Scanning does not consume AI credits. You can scan as many times as you want to perfect your resume.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 md:p-8">
          <ATSScannerForm resumeId={latestResume?.id} />
        </div>
      </div>
    </div>
  );
}
