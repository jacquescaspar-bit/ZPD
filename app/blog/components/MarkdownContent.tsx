import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-4">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-800 dark:text-gray-200">
      {children}
    </strong>
  ),
  em: ({ children }) => <em>{children}</em>,
  a: ({ href, children }) => {
    const isInternal = href?.startsWith("/");
    const className =
      "text-blue-600 dark:text-blue-400 hover:underline font-medium";
    if (isInternal && href) {
      return (
        <Link className={className} href={href}>
          {children}
        </Link>
      );
    }
    return (
      <a
        className={className}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm text-left border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-gray-200 dark:border-gray-700">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="py-2 pr-4 font-medium text-gray-900 dark:text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
      {children}
    </td>
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-700" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-300 dark:border-blue-700 pl-4 my-6 text-gray-700 dark:text-gray-300 italic">
      {children}
    </blockquote>
  ),
};

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent = ({ content }: MarkdownContentProps) => (
  <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
    {content}
  </ReactMarkdown>
);

export default MarkdownContent;
