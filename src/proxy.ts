import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextFetchEvent, NextRequest } from "next/server";

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/protected(.*)',
]);

// Routes that authenticated users should NOT visit (redirect to dashboard)
const isAuthRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If user is signed in and tries to visit sign-in/sign-up, redirect to dashboard
  if (userId && isAuthRoute(req)) {
    const dashboardUrl = new URL('/dashboard', req.url);
    const { NextResponse } = await import('next/server');
    return NextResponse.redirect(dashboardUrl);
  }

  // Protect dashboard and API routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

// Next.js 16 requires the default export to be named `proxy`
export function proxy(req: NextRequest, event: NextFetchEvent) {
  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/__clerk/:path*',
    '/(api|trpc)(.*)',
  ],
};
