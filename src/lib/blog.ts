import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  readingTime: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return `${readTime} min read`;
}

export function getPostSlugs() {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  return fs.readdirSync(blogDirectory).filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      meta: {
        slug: realSlug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        tags: data.tags || [],
        image: data.image,
        readingTime: calculateReadingTime(content),
      },
      content,
    };
  } catch (e) {
    return null;
  }
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug)?.meta)
    .filter((meta): meta is BlogPostMeta => meta !== undefined)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
