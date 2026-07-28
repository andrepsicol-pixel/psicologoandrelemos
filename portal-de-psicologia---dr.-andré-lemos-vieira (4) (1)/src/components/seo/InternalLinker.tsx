import React from 'react';
import { ViewMode } from '../../types/portal';
import { ArrowUpRight, Stethoscope, FileText, HelpCircle, BookOpen } from 'lucide-react';

interface RelatedLink {
  title: string;
  subtitle?: string;
  type: 'article' | 'tool' | 'category' | 'faq' | 'glossary';
  view: ViewMode;
  param?: string;
}

interface InternalLinkerProps {
  title?: string;
  links: RelatedLink[];
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const InternalLinker: React.FC<InternalLinkerProps> = ({
  title = "Conteúdos & Ferramentas Relacionadas",
  links,
  onNavigate
}) => {
  if (!links || links.length === 0) return null;

  const getIcon = (type: RelatedLink['type']) => {
    switch (type) {
      case 'tool': return <Stethoscope className="w-4 h-4 text-[#A68A6B]" />;
      case 'article': return <FileText className="w-4 h-4 text-[#A68A6B]" />;
      case 'faq': return <HelpCircle className="w-4 h-4 text-[#A68A6B]" />;
      default: return <BookOpen className="w-4 h-4 text-[#A68A6B]" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8E2D9] shadow-xs space-y-4 my-8">
      <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#A68A6B]"></span>
        {title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(link.view, link.param)}
            className="group flex items-start justify-between p-4 rounded-2xl bg-[#FAF8F5] hover:bg-white border border-[#E8E2D9] hover:border-[#A68A6B] transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B]"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {getIcon(link.type)}
                <span className="text-[11px] font-bold text-[#A68A6B] uppercase tracking-wider">
                  {link.type === 'tool' ? 'Ferramenta' : link.type === 'article' ? 'Guia Clínico' : link.type === 'faq' ? 'Dúvida Frequente' : 'Tópico'}
                </span>
              </div>
              <h4 className="text-xs md:text-sm font-bold text-[#1A1A1A] group-hover:text-[#A68A6B] transition-colors leading-snug">
                {link.title}
              </h4>
              {link.subtitle && (
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {link.subtitle}
                </p>
              )}
            </div>

            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#A68A6B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
};
