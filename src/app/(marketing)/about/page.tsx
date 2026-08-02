import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About Us | Resume AI",
  description: "Learn about the mission, vision, and team behind Resume AI.",
};

export default function AboutPage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              About ResumeAI
            </h1>
            <p className="text-xl text-zinc-400">
              We are on a mission to democratize access to career opportunities.
            </p>
          </div>

          <div className="prose prose-invert prose-violet max-w-none space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                For too long, the recruitment process has been gated by arbitrary Applicant Tracking Systems (ATS) that reject qualified candidates over minor formatting errors. Our mission is to level the playing field by putting enterprise-grade AI directly into the hands of job seekers.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">The Technology</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                ResumeAI is built on cutting-edge LLM technology. We utilize proprietary fine-tuned models to understand job descriptions, extract key requirements, and formulate metric-driven achievements that resonate with both human recruiters and automated parsers.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">The Team</h2>
              <p className="text-zinc-400 leading-relaxed text-lg mb-8">
                We are a small, dedicated team of engineers, designers, and former recruiters who were frustrated with the state of modern hiring. We decided to build the tool we wished we had during our own job hunts.
              </p>
              
              <div className="flex flex-col gap-8 mt-8 max-w-md">
                <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-xl font-bold">DC</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg m-0 text-white">Dilip Chendra</h3>
                    <p className="text-zinc-400 m-0 text-sm">Founder & Lead Engineer</p>
                  </div>
                  <a href="https://linkedin.com/in/dilipchendra" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-violet-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
