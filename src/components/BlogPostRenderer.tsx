import { MDXRemote } from 'next-mdx-remote/rsc';
import { ReactNode } from 'react';
import Link from 'next/link';

interface BlogPostRendererProps {
  source: string;
  components?: Record<string, ReactNode>;
}

const defaultComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold my-6 text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold my-5 text-gray-800 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold my-4 text-gray-700 mt-6" {...props} />,
  p: (props: any) => <p className="text-lg leading-8 my-4 text-gray-700" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside my-4 space-y-2 text-gray-700" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700" {...props} />,
  li: (props: any) => <li className="text-lg" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 italic my-4 text-gray-600" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-200 px-2 py-1 rounded font-mono text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded my-4 overflow-auto" {...props} />
  ),
  a: (props: any) => (
    <Link href={props.href} className="text-blue-600 hover:underline">
      {props.children}
    </Link>
  ),
  img: (props: any) => (
    <img {...props} className="max-w-full h-auto my-4 rounded" alt={props.alt || ''} />
  ),
};

export default async function BlogPostRenderer({
  source,
  components = {},
}: BlogPostRendererProps) {
  const mergedComponents = { ...defaultComponents, ...components };

  return (
    <div className="prose prose-lg max-w-4xl">
      <MDXRemote source={source} components={mergedComponents} />
    </div>
  );
}
