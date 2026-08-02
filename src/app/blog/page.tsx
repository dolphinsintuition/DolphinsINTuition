import { getAllBlogPosts } from '@/lib/blog';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Dolphins Intuition',
  description: 'Research insights and stories from the dolphin communication frontier.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Research & Insights</h1>
          <p className="text-xl text-gray-600">
            Stories and findings from the frontier of dolphin cognition and interspecies communication.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <time className="text-sm text-gray-500">
                    {new Date(post.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.metadata.researcher && (
                    <span className="ml-4 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      Research
                    </span>
                  )}
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600">
                    {post.metadata.title}
                  </h2>
                </Link>

                <p className="text-gray-700 mb-4">{post.metadata.excerpt}</p>

                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
