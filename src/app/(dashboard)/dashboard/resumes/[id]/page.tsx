import { ResumeEditorForm } from "@/components/shared/resume-editor-form";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Resume — ResumeAI",
};

export default async function EditResumePage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  
  const { id } = await params;

  const resume = await db.resume.findFirst({
    where: {
      id,
      user: {
        clerkId: userId
      }
    }
  });

  if (!resume) redirect("/dashboard/resumes");

  return <ResumeEditorForm resume={resume} />;
}
