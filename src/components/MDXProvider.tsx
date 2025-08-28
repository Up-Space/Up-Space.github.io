
import { MDXProvider } from '@mdx-js/react';
import { ReactNode } from 'react';

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mb-4 text-gray-800" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-medium mb-3 text-gray-700" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-medium mb-2 text-gray-700" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-600 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-gray-600" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  hr: (props: any) => <hr className="my-8 border-gray-300" {...props} />,
  img: (props: any) => (
    <img className="w-full h-auto rounded-lg mb-4" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-gray-300" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),
};

interface MDXContentProviderProps {
  children: ReactNode;
}

export default function MDXContentProvider({ children }: MDXContentProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
