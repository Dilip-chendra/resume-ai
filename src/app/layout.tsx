import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SITE_URL } from "@/config/site";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Clarity } from "@/components/analytics/clarity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Resume AI - Free AI Resume Builder & ATS Checker",
    template: "%s | Resume AI",
  },
  description:
    "Create a world-class, ATS-optimized professional resume in minutes using AI. Free resume builder, cover letter generator, and ATS checker.",
  keywords: [
    "Resume Builder AI",
    "AI Resume Builder",
    "Free Resume Builder",
    "ATS Resume Builder",
    "Resume Generator",
    "Professional Resume Maker",
    "Resume Creator",
    "CV Builder",
    "AI CV Generator",
    "Resume AI",
  ],
  authors: [{ name: "Resume AI Team" }],
  creator: "Resume AI",
  publisher: "Resume AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "Resume AI - Free AI Resume Builder & ATS Checker",
    description:
      "Create a world-class, ATS-optimized professional resume in minutes using AI. Free resume builder, cover letter generator, and ATS checker.",
    url: SITE_URL,
    siteName: "Resume AI",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Resume AI - Free AI Resume Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume AI - Free AI Resume Builder & ATS Checker",
    description:
      "Create a world-class, ATS-optimized professional resume in minutes using AI.",
    creator: "@resumeai",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "bc-8jsf_KH3BK8Znuyakru7Py_paEI0c_1OESsQytPE",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <GoogleAnalytics />
          <Clarity />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
