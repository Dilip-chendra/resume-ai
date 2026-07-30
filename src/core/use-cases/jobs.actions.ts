"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addJobAction(data: FormData) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be logged in to track jobs." };
  }

  const title = data.get("title") as string;
  const company = data.get("company") as string;
  const description = (data.get("description") as string) || "";
  const url = (data.get("url") as string) || "";

  if (!title || !company) {
    return { error: "Title and Company are required." };
  }

  try {
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found");

    await db.job.create({
      data: {
        userId: user.id,
        title,
        company,
        description,
        url,
      },
    });

    revalidatePath("/dashboard/jobs");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteJobAction(jobId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found");

    await db.job.delete({
      where: {
        id: jobId,
        userId: user.id, // ensure user owns the job
      },
    });

    revalidatePath("/dashboard/jobs");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
