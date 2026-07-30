import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const ResumeBuilderWizard = dynamic(
  () => import("@/components/shared/resume-builder-wizard").then(mod => mod.ResumeBuilderWizard),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    ),
  }
);

export const metadata = {
  title: "Create New Resume — ResumeAI",
  description: "Generate a world-class, ATS-optimized resume using AI in minutes.",
};

export default function NewResumePage() {
  return (
    <div className="min-h-full bg-zinc-950">
      <ResumeBuilderWizard />
    </div>
  );
}
