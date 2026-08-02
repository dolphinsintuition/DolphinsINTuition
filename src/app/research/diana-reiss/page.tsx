import { getPostsByResearcher } from '@/lib/blog';
import Link from 'next/link';

export const metadata = {
  title: 'Diana Reiss | Dolphins Intuition',
  description: 'Research profile: Dr. Diana Reiss, cognitive biologist and marine mammal researcher.',
};

export default function DianaReissPage() {
  const posts = getPostsByResearcher('diana-reiss');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link href="/research" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Back to researchers
        </Link>

        {/* Profile */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dr. Diana Reiss</h1>
          <p className="text-lg text-gray-600 mb-6">
            Cognitive Biologist & Marine Mammal Researcher, Hunter College
          </p>

          <div className="prose prose-lg max-w-none mb-8">
            <p>
              Diana Reiss is a cognitive biologist and marine mammal researcher at Hunter College,
              City University of New York. She has studied wild dolphins for over forty years, with
              a particular focus on cognition, communication, and the ethical implications of
              human-dolphin interaction.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Key Contributions</h2>
            <ul>
              <li>
                <strong>Mirror Self-Recognition in Dolphins:</strong> Provided foundational evidence
                that dolphins recognize themselves in mirrors, a marker of self-awareness and
                consciousness shared with very few species.
              </li>
              <li>
                <strong>Referential Gestures:</strong> Documented dolphins using pointing and
                gaze-following to communicate with humans and each other.
              </li>
              <li>
                <strong>CHAT System Development:</strong> Co-developed the Cetacean Hearing and
                Telemetry (CHAT) device, the first wearable computer deployed for real-time
                two-way interaction with wild dolphins.
              </li>
              <li>
                <strong>Ethical Framework:</strong> Pioneered the ethical study of wild dolphins,
                advocating for their rights and well-being in research settings.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Current Work</h2>
            <p>
              Reiss continues to lead the Wild Dolphin Project, documenting dolphin behavior and
              communication patterns in their natural habitat. Her recent work focuses on how dolphins
              use signature whistles as names, the role of social learning in dolphin communities,
              and the implications of human-dolphin interaction for conservation and interspecies
              communication research.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why She Matters to Dolphins Intuition</h2>
            <p>
              Diana Reiss represents the gold standard of rigorous, ethical dolphin research.
              Her work bridges hard science and genuine curiosity about what dolphins are thinking.
              She asks not just "Can we study dolphins?" but "How do we respect their autonomy
              while learning from them?"
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Learn More</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.hunter.cuny.edu/"
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hunter College →
                </a>
              </li>
              <li>
                <a
                  href="https://www.wilddolphinproject.org/"
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wild Dolphin Project →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Related posts */}
        {posts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Posts</h2>
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600">
                      {post.metadata.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mt-2">{post.metadata.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
