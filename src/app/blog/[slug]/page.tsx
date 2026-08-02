import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import BlogPostRenderer from '@/components/BlogPostRenderer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Dolphins Intuition',
    };
  }

  return {
    title: `${post.metadata.title} | Dolphins Intuition`,
    description: post.metadata.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Back to all posts
        </Link>

        {/* Header */}
        <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="mb-6">
            <time className="text-sm text-gray-500">
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.metadata.author && (
              <p className="text-sm text-gray-600 mt-2">By {post.metadata.author}</p>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.metadata.title}</h1>

          <p className="text-lg text-gray-600 mb-8 italic">{post.metadata.excerpt}</p>

          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
              {post.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <BlogPostRenderer source={post.content} />
        </article>

        {/* Researcher link */}
        {post.metadata.researcher && (
          <div className="mt-12 bg-blue-50 rounded-lg p-8">
            <p className="text-sm text-gray-600 mb-2">Featured Researcher</p>
            <Link
              href={`/research/${post.metadata.researcher}`}
              className="text-xl font-semibold text-blue-600 hover:text-blue-800"
            >
              View researcher profile →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
