
'use client';

import { MDXProvider } from '@mdx-js/react';
import { ReactNode } from 'react';

interface MDXContentProviderProps {
  children: ReactNode;
}

const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-4 text-gray-900 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-semibold mb-2 text-gray-900 mt-4" {...props} />,
  h5: (props: any) => <h5 className="text-lg font-semibold mb-2 text-gray-900 mt-4" {...props} />,
  h6: (props: any) => <h6 className="text-base font-semibold mb-2 text-gray-900 mt-4" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
  a: (props: any) => (
    <a 
      className="text-blue-600 hover:text-blue-800 underline transition-colors" 
      target="_blank" 
      rel="noopener noreferrer"
      {...props} 
    />
  ),
  ul: (props: any) => <ul className="mb-4 pl-6 space-y-2 list-disc text-gray-700" {...props} />,
  ol: (props: any) => <ol className="mb-4 pl-6 space-y-2 list-decimal text-gray-700" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-600 bg-blue-50" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6" {...props} />
  ),
  img: (props: any) => (
    <img className="max-w-full h-auto rounded-lg shadow-md my-6" {...props} />
  ),
  hr: (props: any) => <hr className="my-8 border-gray-300" {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...props} />
  ),
};

export default function MDXContentProvider({ children }: MDXContentProviderProps) {
  return (
    <MDXProvider components={mdxComponents}>
      {children}
    </MDXProvider>
  );
}
