import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { FileText, ScanText, PenLine, TrendingUp, Plus, ArrowRight, Sparkles, Clock, Zap, Shield, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getDashboardData(clerkId: string, email: string) {
  const user = await db.user.upsert({
    where: { clerkId },
    update: { email },
    create: { clerkId, email, credits: 999 },
    include: {
      resumes: { orderBy: { updatedAt: "desc" }, take: 5 },
      atsReports: { orderBy: { createdAt: "desc" }, take: 5 },
      coverLetters: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: {
        select: { resumes: true, atsReports: true, coverLetters: true }
      }
    },
  });

  // Calculate true average score
  const avgScoreAgg = await db.atsReport.aggregate({
    _avg: { score: true },
    where: { userId: user.id }
  });

  return { ...user, avgScore: avgScoreAgg._avg.score ? Math.round(avgScoreAgg._avg.score) : null };
}

const quickActions = [
  {
    icon: Plus,
    label: "New Resume",
    description: "AI builds it in seconds",
    href: "/dashboard/resumes/new",
    gradient: "from-violet-500 to-indigo-500",
    shadow: "shadow-violet-500/20",
    badge: "Most Popular",
  },
  {
    icon: ScanText,
    label: "ATS Scanner",
    description: "Score your resume instantly",
    href: "/dashboard/ats",
    gradient: "from-indigo-500 to-blue-500",
    shadow: "shadow-indigo-500/20",
    badge: null,
  },
  {
    icon: PenLine,
    label: "Cover Letter",
    description: "Tailored to any job in 1-click",
    href: "/dashboard/cover-letter",
    gradient: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/20",
    badge: null,
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
  const isPro = user?.tier === "PRO" || user?.credits === 999;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome back, {firstName} 👋
          </h1>
          {/* Pro Unlocked Badge */}
          {isPro && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <Zap className="w-3 h-3" />
              PRO UNLOCKED
            </span>
          )}
        </div>
        <p className="text-zinc-400 mt-1">
          {user ? (
            <>
              All AI features are{" "}
              <span className="text-emerald-400 font-semibold">unlocked for free</span>
              {" "}-- build unlimited resumes, score your ATS, generate cover letters.
            </>
          ) : (
            <>You are using ResumeAI in Guest Mode. <Link href="/sign-in" className="text-violet-400 hover:underline">Sign in</Link> to save your progress.</>
          )}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Resumes Created",
            value: user ? user._count.resumes : 0,
            icon: FileText,
            color: "text-violet-400",
            bg: "bg-violet-500/10",
          },
          {
            label: "ATS Reports Run",
            value: user ? user._count.atsReports : 0,
            icon: ScanText,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
          },
          {
            label: "Avg. ATS Score",
            value: user?.avgScore ? `${user.avgScore}/100` : "--",
            icon: TrendingUp,
            color: "text-pink-400",
            bg: "bg-pink-500/10",
          },
          {
            label: "Cover Letters",
            value: user ? user._count.coverLetters : 0,
            icon: PenLine,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur-sm hover:border-white/20 transition-all"
          >
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${bg} mb-3`}>
              <Icon className={`w-4.5 h-4.5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-zinc-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Free Pro Banner */}
      {isPro && (
        <div className="mb-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-violet-500/10 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/30 shrink-0">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">You are an Early Adopter -- All Pro Features Unlocked!</p>
            <p className="text-xs text-zinc-400 mt-0.5">Unlimited AI resumes, ATS scans, cover letters and more -- completely free, forever.</p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Free Forever</span>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map(({ icon: Icon, label, description, href, gradient, shadow, badge }) => (
            <Link
              key={label}
              href={href}
              className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {badge && (
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {badge}
                </span>
              )}
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
          <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/30 p-12 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 mb-4">
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">
              {!user ? "Guest Mode" : "Create your first resume"}
            </h3>
            <p className="text-xs text-zinc-600 mb-6 max-w-xs mx-auto">
              {!user
                ? "Sign in to save and manage your AI-generated resumes."
                : "Our AI crafts a professional, ATS-optimized resume tailored to any job -- in under 60 seconds."}
            </p>
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 gap-1.5 shadow-lg shadow-violet-500/25"
              asChild
            >
              <Link href="/dashboard/resumes/new">
                <Plus className="w-3.5 h-3.5" />
                {user ? "Build my first resume" : "Get started free"}
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
