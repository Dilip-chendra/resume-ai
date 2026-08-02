import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { JobCard } from "@/components/shared/job-card";
import { AddJobForm } from "@/components/shared/add-job-form";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Job Tracker — ResumeAI",
};

export default async function JobsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Job Tracker</h1>
          <p className="text-zinc-400 mt-1">Track every application in one place.</p>
        </div>
        <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/30 p-12 text-center">
          <Briefcase className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-sm font-semibold text-zinc-400 mb-2">Sign in to track jobs</h3>
          <p className="text-xs text-zinc-600 mb-6 max-w-xs mx-auto">
            Guest users cannot save job applications. Sign in to get full access.
          </p>
          <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      jobs: { orderBy: { createdAt: "desc" } },
    },
  });

  const jobs = user?.jobs ?? [];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Job Tracker</h1>
          <p className="text-zinc-400 mt-1">
            {jobs.length} application{jobs.length !== 1 ? "s" : ""} tracked
          </p>
        </div>
      </div>

      {/* Add Job Form */}
      <AddJobForm />

      {/* Job List */}
      <div className="mt-8 space-y-3">
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/30 p-12 text-center">
            <Briefcase className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-zinc-400 mb-2">No jobs tracked yet</h3>
            <p className="text-xs text-zinc-600 max-w-xs mx-auto">
              Add your first job application above. Track companies, roles, and descriptions all in one place.
            </p>
          </div>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}
