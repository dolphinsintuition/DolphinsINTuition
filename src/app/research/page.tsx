import Link from 'next/link';

export const metadata = {
  title: 'Researchers | Dolphins Intuition',
  description: 'Meet the scientists at the forefront of dolphin research and interspecies communication.',
};

export default function ResearchPage() {
  const researchers = [
    {
      slug: 'diana-reiss',
      name: 'Dr. Diana Reiss',
      role: 'Cognitive Biologist & Marine Mammal Researcher',
      affiliation: 'Hunter College, CUNY',
      focus: 'Dolphin cognition, communication, mirror self-recognition',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Research Leaders</h1>
          <p className="text-xl text-gray-600">
            Meet the scientists advancing our understanding of dolphin intelligence and communication.
          </p>
        </div>

        <div className="grid gap-8">
          {researchers.map((researcher) => (
            <div
              key={researcher.slug}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{researcher.name}</h2>
              <p className="text-blue-600 font-semibold mb-2">{researcher.role}</p>
              <p className="text-gray-600 mb-4">{researcher.affiliation}</p>
              <p className="text-gray-700 mb-6">
                <strong>Research Focus:</strong> {researcher.focus}
              </p>
              <Link
                href={`/research/${researcher.slug}`}
                className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
              >
                View profile →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Section</h2>
          <p className="text-gray-700 mb-4">
            Dolphins Intuition follows the work of leading researchers in cetacean cognition and
            communication. Our goal is not to oversimplify their science, but to make it accessible
            — sharing both the breakthroughs and the open questions that drive this field forward.
          </p>
          <p className="text-gray-700">
            If you are a researcher in this space and would like to be featured, we'd love to hear
            from you.
          </p>
        </div>
      </div>
    </main>
  );
}
