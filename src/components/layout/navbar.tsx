"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/templates", label: "Templates" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-white/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
            <FileText className="w-4 h-4 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500" />
            </span>
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            ResumeAI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isSignedIn ? (
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 border-0 gap-1.5"
              asChild
            >
              <Link href="/dashboard">
                Dashboard
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 border-0 gap-1.5"
                asChild
              >
                <Link href="/sign-up">
                  Get started free
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-b border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-4 flex flex-col gap-2">
                {isSignedIn ? (
                  <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0" asChild>
                    <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/sign-in" onClick={() => setOpen(false)}>Sign in</Link>
                    </Button>
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0" asChild>
                      <Link href="/sign-up" onClick={() => setOpen(false)}>Get started free</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
