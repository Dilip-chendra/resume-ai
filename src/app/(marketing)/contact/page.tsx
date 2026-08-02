"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Mail, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate form submission — wire to a real API endpoint or email service
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Get in touch
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hi? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message sent!</h3>
                  <p className="text-zinc-400">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <Button variant="outline" className="mt-4 border-white/10 text-white hover:bg-white/5" onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); }}>
                    Send another
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-lg transition-colors gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* Direct Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email Support</h3>
                  <p className="text-zinc-400 mb-2">For general inquiries and technical support.</p>
                  <a href="mailto:support@resumeai.app" className="text-violet-400 hover:text-violet-300 font-medium">
                    support@resumeai.app
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Help Center</h3>
                  <p className="text-zinc-400 mb-2">Browse our detailed guides and FAQ.</p>
                  <Link href="/help" className="text-violet-400 hover:text-violet-300 font-medium">
                    Visit Help Center →
                  </Link>
                </div>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mt-4">
                <h3 className="font-bold text-white mb-2">Response Time</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">We typically respond within 24 hours on business days. For urgent issues, mention &ldquo;URGENT&rdquo; in your subject line.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
