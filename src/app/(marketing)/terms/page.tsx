import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service | ResumeAI",
  description: "Read the terms and conditions for using ResumeAI's services.",
};

export default function TermsPage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-zinc-500 mb-12">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="prose prose-invert prose-zinc max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="text-zinc-400 leading-relaxed">By accessing and using ResumeAI, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Use of Service</h2>
              <p className="text-zinc-400 leading-relaxed">ResumeAI provides AI-powered tools for creating resumes, cover letters, and ATS analysis. You agree to use the service only for lawful purposes. You must not use the service to create content that is false, misleading, or infringes on the rights of others.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. User Accounts</h2>
              <p className="text-zinc-400 leading-relaxed">When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your account.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Intellectual Property</h2>
              <p className="text-zinc-400 leading-relaxed">The service and its original content, features, and functionality are and will remain the exclusive property of ResumeAI. Content you generate using the service is owned by you. You grant us a limited license to store and process your content to provide the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. AI-Generated Content</h2>
              <p className="text-zinc-400 leading-relaxed">You understand that our AI generates content based on information you provide. You are responsible for reviewing and verifying all AI-generated content before using it. We make no guarantees regarding the accuracy or completeness of AI-generated content.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Limitation of Liability</h2>
              <p className="text-zinc-400 leading-relaxed">ResumeAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service, even if we have been advised of the possibility of such damages.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Termination</h2>
              <p className="text-zinc-400 leading-relaxed">We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach these terms. Upon termination, your right to use the service will cease immediately.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Changes to Terms</h2>
              <p className="text-zinc-400 leading-relaxed">We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of this page. Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Contact</h2>
              <p className="text-zinc-400 leading-relaxed">If you have any questions about these Terms, please contact us at <a href="mailto:support@resumeai.app" className="text-violet-400 hover:text-violet-300">support@resumeai.app</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
