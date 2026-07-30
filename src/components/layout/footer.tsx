import Link from "next/link";
import { FileText, Bird, GitFork, Globe, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Templates", href: "/templates" },
    { label: "ATS Scanner", href: "/ats" },
    { label: "AI Writer", href: "/ai-writer" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Resume Tips", href: "/blog/tips" },
    { label: "Career Advice", href: "/blog/career" },
    { label: "Interview Prep", href: "/interview" },
    { label: "Help Center", href: "/help" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: Bird, href: "https://twitter.com", label: "Twitter" },
  { icon: GitFork, href: "https://github.com", label: "GitHub" },
  { icon: Globe, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@resumeai.app", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Build world-class, ATS-optimized resumes in minutes using the power of AI. Land more interviews, faster.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold mb-4 text-foreground">{group}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ to help you land your dream job.
          </p>
        </div>
      </div>
    </footer>
  );
}
