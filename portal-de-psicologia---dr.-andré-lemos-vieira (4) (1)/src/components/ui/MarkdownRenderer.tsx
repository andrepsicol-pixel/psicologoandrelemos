import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  return (
    <div className={`markdown-content text-slate-800 ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mt-8 mb-4 tracking-tight border-b border-[#E8E2D9] pb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-8 mb-4 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mt-7 mb-3 tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-bold text-[#A68A6B] mt-6 mb-2 uppercase tracking-wide">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-slate-700 text-sm md:text-base leading-relaxed my-3 font-normal last:mb-0 first:mt-0">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-[#1A1A1A]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-800">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2 my-4 pl-1 text-slate-700 text-sm md:text-base">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 my-4 pl-6 text-slate-700 text-sm md:text-base">
              {children}
            </ol>
          ),
          li: ({ children, ...props }: any) => {
            const isOrdered = props.ordered;
            if (isOrdered) {
              return <li className="leading-relaxed text-slate-700 my-1">{children}</li>;
            }
            return (
              <li className="flex items-start gap-2.5 leading-relaxed my-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A68A6B] shrink-0 mt-2"></span>
                <div className="flex-1 text-slate-700">{children}</div>
              </li>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="my-6 p-4 md:p-5 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#A68A6B] text-slate-800 text-sm md:text-base leading-relaxed shadow-xs font-medium">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-8 border-t border-[#E8E2D9]" />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A68A6B] font-semibold underline underline-offset-4 decoration-[#A68A6B]/40 hover:decoration-[#A68A6B] transition-colors cursor-pointer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
