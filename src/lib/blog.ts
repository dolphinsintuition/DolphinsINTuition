import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPostMetadata {
  title: string;
  author?: string;
  date: string;
  excerpt: string;
  researcher?: string;
  tags?: string[];
  draft?: boolean;
}

export interface BlogPost {
  slug: string;
  metadata: BlogPostMetadata;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), 'src/blog/posts');

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.mdx'));

  return files
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        slug,
        metadata: data as BlogPostMetadata,
        content,
      };
    })
    .filter((post) => !post.metadata.draft)
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    metadata: data as BlogPostMetadata,
    content,
  };
}

export function getPostsByResearcher(researcherSlug: string): BlogPost[] {
  return getAllBlogPosts().filter(
    (post) => post.metadata.researcher === researcherSlug
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) =>
    post.metadata.tags?.includes(tag)
  );
}
