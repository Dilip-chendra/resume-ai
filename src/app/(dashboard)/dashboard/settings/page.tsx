import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { SettingsForm } from "@/components/shared/settings-form";

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-8 text-center">
          <p className="text-zinc-400">
            You are browsing in Guest Mode. Please sign in to save your settings and AI preferences.
          </p>
        </div>
      </div>
    );
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: {
      tier: true,
      credits: true,
      resumeSample: true,
      coverLetterSample: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your account and AI formatting preferences.</p>
      </div>

      <div className="grid gap-8">
        {/* Account Info */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Account Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-black/20 p-4 border border-white/5">
              <p className="text-sm text-zinc-500 mb-1">Current Plan</p>
              <p className="font-semibold text-violet-400">{user.tier}</p>
            </div>
            <div className="rounded-xl bg-black/20 p-4 border border-white/5">
              <p className="text-sm text-zinc-500 mb-1">AI Credits Remaining</p>
              <p className="font-semibold text-indigo-400">{user.credits}</p>
            </div>
          </div>
        </div>

        {/* AI Formatting Instructions */}
        <SettingsForm 
          initialResumeSample={user.resumeSample || ""} 
          initialCoverLetterSample={user.coverLetterSample || ""} 
        />
      </div>
    </div>
  );
}
