import { Sparkles } from "lucide-react";
import { ResumeBuilderWizard } from "@/components/shared/resume-builder-wizard";

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
