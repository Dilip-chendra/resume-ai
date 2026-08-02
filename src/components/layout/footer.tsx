import Link from "next/link";
import { FileText } from "lucide-react";
import { socialConfig } from "@/config/social";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Templates", href: "/templates" },
    { label: "ATS Scanner", href: "/dashboard/ats" },
    { label: "Cover Letter", href: "/dashboard/cover-letter" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Help Center", href: "/help" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-zinc-950 pt-20 pb-10 overflow-hidden">
      {/* Background Gradients for Glassmorphism feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-gradient-to-b from-violet-600/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8 mb-16">
          {/* Brand & Mission */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 pr-8">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-violet-300 transition-colors duration-300">
                ResumeAI
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-sm">
              The world&apos;s most advanced AI resume builder. Craft an ATS-optimized, professional resume in seconds and land your dream job faster.
            </p>
            <div className="flex items-center gap-4">
              {Object.values(socialConfig).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="col-span-1">
              <h3 className="text-sm font-semibold mb-6 text-white tracking-wide">{group}</h3>
              <ul className="space-y-4">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-400 hover:text-violet-400 transition-colors duration-200 block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-zinc-500">
            © {new Date().getFullYear()} ResumeAI. Built for professionals.
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Cookies</Link>
            <Link href="/help" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
