import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FileText, LayoutDashboard, ScanText, PenLine, Briefcase, Settings, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/resumes", icon: FileText, label: "My Resumes" },
  { href: "/dashboard/ats", icon: ScanText, label: "ATS Scanner" },
  { href: "/dashboard/cover-letter", icon: PenLine, label: "Cover Letter" },
  { href: "/dashboard/jobs", icon: Briefcase, label: "Job Tracker" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-zinc-900/50 backdrop-blur-sm shrink-0 no-print">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/10">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            ResumeAI
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
            </Link>
          ))}
        </nav>

        {/* Unlocked Badge */}
        <div className="p-4 border-t border-white/10">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)] relative overflow-hidden group cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover:animate-pulse" />
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300 tracking-wide uppercase">Pro Unlocked</span>
            </div>
            <p className="text-xs text-emerald-100/70 leading-relaxed font-medium">
              You're an early adopter! All premium AI features are unlocked for free forever.
            </p>
          </div>

          {/* User */}
          <div className="flex items-center gap-3 px-1">
            <UserButton />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-300 truncate">My Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}


