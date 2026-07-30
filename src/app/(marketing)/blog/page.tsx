import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Resume AI",
  description: "Read the latest career advice, resume tips, and interview strategies from the Resume AI team.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Career Advice & Resume Tips</h1>
            <p className="text-xl text-zinc-400">Everything you need to know to land your dream job in 2026.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col justify-between bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition-colors"
              >
                <div>
                  <div className="flex gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-white group-hover:text-violet-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-400 line-clamp-3 mb-6">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500 mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
