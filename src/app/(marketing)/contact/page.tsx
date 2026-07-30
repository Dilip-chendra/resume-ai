import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Mail, MessageSquare } from "lucide-react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | Resume AI",
  description: "Get in touch with the Resume AI team. We're here to help you land your dream job.",
};

export default function ContactPage() {
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
            {/* Contact Form Placeholder (can be wired to an API later) */}
            <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                  <input type="text" className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                  <input type="email" className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                  <textarea rows={4} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500" placeholder="How can we help?"></textarea>
                </div>
                <button type="button" className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-lg transition-colors">
                  Send Message
                </button>
              </form>
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
                  <a href="mailto:soultech351@gmail.com" className="text-violet-400 hover:text-violet-300 font-medium">soultech351@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Help Center</h3>
                  <p className="text-zinc-400 mb-2">Browse our detailed guides and FAQ.</p>
                  <Link href="/help" className="text-violet-400 hover:text-violet-300 font-medium">Visit Help Center →</Link>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h3 className="font-bold mb-4">Connect with us</h3>
                <div className="flex gap-4">
                  <a href="https://twitter.com/resumeai" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500 transition-colors">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com/company/resumeai" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500 transition-colors">
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
