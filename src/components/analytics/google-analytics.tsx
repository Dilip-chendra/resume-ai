"use client";

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Only load GA in production and if ID is present
  if (process.env.NODE_ENV !== 'production' || !gaId) {
    return null;
  }

  return <NextGoogleAnalytics gaId={gaId} />;
}
