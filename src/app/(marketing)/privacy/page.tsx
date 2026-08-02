import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | ResumeAI",
  description: "Learn how ResumeAI collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-zinc-500 mb-12">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="prose prose-invert prose-zinc max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p className="text-zinc-400 leading-relaxed">We collect information you provide directly to us, including your name, email address, and resume content when you create an account or use our services. We also collect usage data, device information, and cookies to improve your experience.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Your Information</h2>
              <p className="text-zinc-400 leading-relaxed">We use your information to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions. We use your resume content solely to generate AI-powered outputs on your behalf.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Data Storage & Security</h2>
              <p className="text-zinc-400 leading-relaxed">Your data is stored securely using industry-standard encryption. We use Clerk for authentication and Prisma with a managed PostgreSQL database for data storage. We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. AI Processing</h2>
              <p className="text-zinc-400 leading-relaxed">ResumeAI uses large language models (LLMs) to generate resume content, cover letters, and ATS scores. Your resume data is sent to our AI provider (Google Gemini) for processing. We do not use your data to train AI models without your explicit consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Cookies</h2>
              <p className="text-zinc-400 leading-relaxed">We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. See our Cookie Policy for more details.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Third-Party Services</h2>
              <p className="text-zinc-400 leading-relaxed">We may employ third-party companies and individuals to facilitate our service. These third parties include Clerk (authentication), Google Analytics (usage analytics), and Microsoft Clarity (session recording). They have access to your personal data only to perform tasks on our behalf.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Your Rights</h2>
              <p className="text-zinc-400 leading-relaxed">You have the right to access, update, or delete your personal information at any time. You can manage your account data from the dashboard settings page. To request complete data deletion, contact us at support@resumeai.app.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Contact Us</h2>
              <p className="text-zinc-400 leading-relaxed">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@resumeai.app" className="text-violet-400 hover:text-violet-300">support@resumeai.app</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
