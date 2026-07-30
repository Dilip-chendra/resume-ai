"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateAISettingsAction(data: FormData) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const resumeSample = (data.get("resumeSample") as string) || null;
  const coverLetterSample = (data.get("coverLetterSample") as string) || null;

  try {
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found");

    await db.user.update({
      where: { clerkId: userId },
      data: {
        resumeSample,
        coverLetterSample,
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
