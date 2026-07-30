"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is an ATS and why does it matter?",
    a: "An Applicant Tracking System (ATS) is software companies use to filter resumes before a human ever reads them. Studies show that over 75% of resumes are rejected by ATS before reaching a recruiter. ResumeAI ensures your resume is perfectly formatted, keyword-optimized, and structured to pass every major ATS system.",
  },
  {
    q: "How does the AI generate my resume content?",
    a: "Our AI (powered by Google Gemini and NVIDIA NIM) analyzes your experience, skills, and target role, then generates professional, achievement-focused content tailored specifically to you. You can choose from professional, student, or executive tones. Everything is fully editable — the AI gives you a head start, you make it perfect.",
  },
  {
    q: "Is my data secure and private?",
    a: "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never sell your data or share it with third parties. Your resume data is yours — you can export or delete it at any time. We are GDPR compliant.",
  },
  {
    q: "Can I use ResumeAI if I'm a fresh graduate with no experience?",
    a: "Yes! ResumeAI is designed for all career stages. For fresh graduates, the Student tone option focuses on education, projects, internships, and transferable skills. The AI helps you present your background in the most compelling way possible, even without extensive work experience.",
  },
  {
    q: "How many resume templates are available?",
    a: "Free users get access to our standard templates. Pro and Enterprise users get access to our full library of 20+ premium, professionally designed templates — including modern, classic, creative, and minimalist styles — all fully ATS-compatible.",
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Yes, absolutely. You can cancel anytime from your account settings with zero friction. Your Pro features will remain active until the end of your billing cycle, after which you'll be downgraded to the Free plan. No questions asked.",
  },
  {
    q: "Do you support languages other than English?",
    a: "English is fully supported with excellent results. Our AI can generate content in other major languages (Spanish, French, German, Portuguese, etc.), though quality may vary. Full multilingual support is on our roadmap.",
  },
  {
    q: "What AI providers do you use? Can I use my own API key?",
    a: "We use Google Gemini as our primary provider, with NVIDIA NIM and Groq as fallbacks for speed and reliability. Enterprise users can bring their own API keys for full control. Our modular AI architecture makes it easy to swap providers.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-zinc-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10">
            FAQs
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5">
            Questions? We got you.
          </h2>
          <p className="text-zinc-400 text-lg">
            Can't find what you're looking for? Reach out to our support team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm px-6 overflow-hidden hover:border-white/20 transition-colors"
              >
                <AccordionTrigger className="text-sm font-semibold text-white hover:no-underline py-5 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-400 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
