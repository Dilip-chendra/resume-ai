import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Cookie Policy | ResumeAI",
  description: "Learn how ResumeAI uses cookies and similar tracking technologies.",
};

export default function CookiesPage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Cookie Policy</h1>
          <p className="text-zinc-500 mb-12">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="prose prose-invert prose-zinc max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What Are Cookies</h2>
              <p className="text-zinc-400 leading-relaxed">Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your browser and allows the service or a third-party to recognize you and make your next visit easier and the service more useful to you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">How We Use Cookies</h2>
              <p className="text-zinc-400 leading-relaxed">We use cookies for the following purposes:</p>
              <ul className="text-zinc-400 space-y-2 mt-4 list-disc pl-6">
                <li><strong className="text-white">Authentication:</strong> We use Clerk session cookies to keep you logged in across page visits.</li>
                <li><strong className="text-white">Analytics:</strong> We use Google Analytics cookies to understand how visitors interact with our website.</li>
                <li><strong className="text-white">Session Recording:</strong> Microsoft Clarity uses cookies to help us improve our product by recording anonymized user sessions.</li>
                <li><strong className="text-white">Preferences:</strong> We may use cookies to remember your preferences and settings.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div className="bg-zinc-900 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-1">Essential Cookies</h3>
                  <p className="text-zinc-400 text-sm">Required for the website to function. Cannot be disabled. Includes authentication session cookies.</p>
                </div>
                <div className="bg-zinc-900 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-1">Analytics Cookies</h3>
                  <p className="text-zinc-400 text-sm">Help us understand how visitors use our site. Set by Google Analytics and Microsoft Clarity.</p>
                </div>
                <div className="bg-zinc-900 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-1">Functional Cookies</h3>
                  <p className="text-zinc-400 text-sm">Remember your preferences to improve your experience on return visits.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Managing Cookies</h2>
              <p className="text-zinc-400 leading-relaxed">You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Contact</h2>
              <p className="text-zinc-400 leading-relaxed">If you have questions about our cookie policy, contact us at <a href="mailto:support@resumeai.app" className="text-violet-400 hover:text-violet-300">support@resumeai.app</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
