import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {};
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://resume-ai.com";

  return {
    title: `${post.meta.title} | Resume AI Blog`,
    description: post.meta.description,
    authors: [{ name: post.meta.author }],
    alternates: {
      canonical: `/blog/${post.meta.slug}`,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      authors: [post.meta.author],
      tags: post.meta.tags,
      url: `${appUrl}/blog/${post.meta.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    headline: post.meta.title,
    description: post.meta.description,
    author: {
      "@type": "Person",
      name: post.meta.author,
    },
    datePublished: post.meta.date,
  };

  const breadcrumbSchema = {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `${process.env.NEXT_PUBLIC_APP_URL || "https://resume-ai.com"}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.meta.title,
        item: `${process.env.NEXT_PUBLIC_APP_URL || "https://resume-ai.com"}/blog/${post.meta.slug}`,
      },
    ],
  };

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 py-32">
        <JsonLd type="Article" data={articleSchema} />
        <JsonLd type="BreadcrumbList" data={breadcrumbSchema} />
        
        <article className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-sm text-zinc-500 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          
          <header className="mb-12">
            <div className="flex gap-2 mb-6">
              {post.meta.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              {post.meta.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white">
                  {post.meta.author.charAt(0)}
                </div>
                <span>{post.meta.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{new Date(post.meta.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.meta.readingTime}</span>
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-violet prose-lg max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
