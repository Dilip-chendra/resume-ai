import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { FileText, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeCard } from "@/components/shared/resume-card";

export const metadata = {
  title: "My Resumes — ResumeAI",
  description: "Manage and edit your AI-generated resumes.",
};

export default async function ResumesPage() {
  const { userId } = await auth();

  let user = null;
  let totalCount = 0;
  if (userId) {
    user = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        resumes: {
          orderBy: { updatedAt: "desc" },
        },
        _count: {
          select: { resumes: true },
        },
      },
    });
    totalCount = user?._count?.resumes ?? 0;
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">My Resumes</h1>
          <p className="text-zinc-400 text-sm">
            {user ? `${totalCount} resume${totalCount !== 1 ? "s" : ""} — manage and edit your AI-generated resumes.` : "Manage and edit your AI-generated resumes."}
          </p>
        </div>
        <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0" asChild>
          <Link href="/dashboard/resumes/new">
            <Plus className="w-4 h-4 mr-2" />
            New Resume
          </Link>
        </Button>
      </div>

      {!user ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/30 p-12 text-center mt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800 mb-6">
            <FileText className="w-8 h-8 text-zinc-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Guest Mode</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            You are currently using ResumeAI as a guest. You can generate a resume, but it won&apos;t be saved to the cloud. Sign in to unlock cloud saving and more features.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200" asChild>
              <Link href="/dashboard/resumes/new">Create a Resume</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      ) : user.resumes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/30 p-12 text-center mt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 mb-6">
            <Sparkles className="w-8 h-8 text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No resumes yet</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            You haven&apos;t created any resumes. Start by generating an AI-powered, ATS-optimized resume tailored to your target job.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 gap-2" asChild>
            <Link href="/dashboard/resumes/new">
              <Plus className="w-4 h-4" />
              Build my first resume
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
}
