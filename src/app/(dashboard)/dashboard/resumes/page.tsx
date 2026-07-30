import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { FileText, Plus, Clock, MoreVertical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Resumes — ResumeAI",
};

export default async function ResumesPage() {
  const { userId } = await auth();

  let user = null;
  if (userId) {
    user = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        resumes: {
          orderBy: { updatedAt: "desc" },
        },
      },
    });
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">My Resumes</h1>
          <p className="text-zinc-400 text-sm">Manage and edit your AI-generated resumes.</p>
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
            You are currently using ResumeAI as a guest. You can generate a resume, but it won't be saved to the cloud. Sign in to unlock cloud saving and more features.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200" asChild>
              <Link href="/dashboard/resumes/new">
                Create a Resume
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10" asChild>
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      ) : user.resumes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/30 p-12 text-center mt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800 mb-6">
            <FileText className="w-8 h-8 text-zinc-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No resumes yet</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            You haven't created any resumes. Start by generating an AI-powered, ATS-optimized resume tailored to your target job.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-zinc-200" asChild>
            <Link href="/dashboard/resumes/new">
              Create your first resume
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.resumes.map((resume) => (
            <div key={resume.id} className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all hover:border-white/20 flex flex-col h-[280px]">
              {/* Document Preview (Fake) */}
              <div className="h-40 bg-zinc-950/50 border-b border-white/5 rounded-t-2xl p-4 overflow-hidden relative">
                <div className="w-full h-full bg-white text-black p-3 rounded-sm shadow-sm text-[8px] opacity-20 blur-[1px]">
                  <div className="font-bold text-[12px] mb-1">{resume.title}</div>
                  <div className="w-1/3 h-1 bg-zinc-300 mb-4" />
                  <div className="space-y-1.5">
                    <div className="w-full h-1 bg-zinc-200" />
                    <div className="w-5/6 h-1 bg-zinc-200" />
                    <div className="w-full h-1 bg-zinc-200" />
                    <div className="w-4/6 h-1 bg-zinc-200" />
                  </div>
                </div>
                
                {/* Overlay CTA */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" className="bg-white text-black hover:bg-zinc-200" asChild>
                    <Link href={`/dashboard/resumes/${resume.id}`}>
                      Edit Resume <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Meta */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-auto">
                  <div>
                    <h3 className="font-semibold text-white truncate max-w-[200px]">{resume.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white -mr-2 -mt-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
