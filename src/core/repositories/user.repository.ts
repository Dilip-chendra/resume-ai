import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import type { User } from "@db/client";

/**
 * Gets or creates the current user in the database from Clerk auth.
 * This is the central function used by all server actions and API routes.
 */
export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  return user;
}

/**
 * Gets the current user or throws if not authenticated.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please sign in to continue.");
  }
  return user;
}
