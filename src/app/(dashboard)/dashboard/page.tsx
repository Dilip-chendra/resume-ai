import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { FileText, ScanText, PenLine, TrendingUp, Plus, ArrowRight, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getDashboardData(clerkId: string, email: string) {
  // Upsert user in database on first visit
  const user = await db.user.upsert({
    where: { clerkId },
    update: {
      email,
    },
    create: {
      clerkId,
      email,
      credits: 3,
    },
    include: {
      resumes: {
        orderBy: { updatedAt: "desc" },
        take: 5,
      },
    },
  });

  return user;
}

const quickActions = [
  {
    icon: Plus,
    label: "New Resume",
    description: "Start from scratch with AI",
    href: "/dashboard/resumes/new",
    gradient: "from-violet-500 to-indigo-500",
    shadow: "shadow-violet-500/20",
  },
  {
    icon: ScanText,
    label: "ATS Scanner",
    description: "Check your resume score",
    href: "/dashboard/ats",
    gradient: "from-indigo-500 to-blue-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    icon: PenLine,
    label: "Cover Letter",
    description: "Generate in seconds",
    href: "/dashboard/cover-letter",
    gradient: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/20",
  },
];

export default async function DashboardPage() {
  const { userId } = await auth();

  let user = null;
  let clerkUser = null;
  if (userId) {
    clerkUser = await currentUser();
    const email = clerkUser?.primaryEmailAddress?.emailAddress || `${userId}@placeholder.com`;
    user = await getDashboardData(userId, email);
  }

  const firstName = clerkUser?.firstName || (userId ? "there" : "Guest");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {greeting}, {firstName} ðŸ‘‹
        </h1>
        <p className="text-zinc-400 mt-1">
          {user ? (
            <>You have <span className="text-violet-400 font-semibold">{user.credits} AI credits</span> remaining.</>
          ) : (
            <>You are using ResumeAI in Guest Mode. <Link href="/sign-in" className="text-violet-400 hover:underline">Sign in</Link> to save your progress.</>
          )}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Resumes Created", value: user ? user.resumes.length : 0, icon: FileText, color: "text-violet-400" },
          { label: "AI Credits Left", value: user ? user.credits : "âˆž", icon: Sparkles, color: "text-indigo-400" },
          { label: "ATS Reports", value: 0, icon: ScanText, color: "text-pink-400" },
          { label: "Avg. ATS Score", value: "â€”", icon: TrendingUp, color: "text-emerald-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur-sm"
          >
            <Icon className={`w-5 h-5 ${color} mb-3`} />
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-zinc-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map(({ icon: Icon, label, description, href, gradient, shadow }) => (
            <Link
              key={label}
              href={href}
              className={`group relative rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5`}
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} shadow-lg ${shadow} mb-4`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-white text-sm">{label}</p>
              <p className="text-xs text-zinc-500 mt-1">{description}</p>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-1 absolute right-5 top-1/2 -translate-y-1/2 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Resumes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Recent Resumes</h2>
          <Button variant="ghost" size="sm" className="text-xs text-zinc-500 hover:text-white gap-1" asChild>
            <Link href="/dashboard/resumes">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>

        {!user || user.resumes.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/30 p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-800 mb-4">
              <FileText className="w-6 h-6 text-zinc-600" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-400 mb-2">{!user ? "Guest Mode" : "No resumes yet"}</h3>
            <p className="text-xs text-zinc-600 mb-6 max-w-xs mx-auto">
              {!user 
                ? "You're browsing as a guest. Generated resumes won't be saved here." 
                : "Create your first AI-powered resume in minutes. Our AI will help you craft the perfect content."}
            </p>
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 gap-1.5"
              asChild
            >
              <Link href="/dashboard/resumes/new">
                <Plus className="w-3.5 h-3.5" />
                {user ? "Create my first resume" : "Create a Resume"}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {user.resumes.map((resume: { id: string; title: string; updatedAt: Date }) => (
              <Link
                key={resume.id}
                href={`/dashboard/resumes/${resume.id}`}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-zinc-900/50 p-4 hover:border-white/20 hover:bg-zinc-900/80 transition-all group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20">
                  <FileText className="w-5 h-5 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{resume.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-zinc-600" />
                    <p className="text-xs text-zinc-500">
                      {new Date(resume.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

