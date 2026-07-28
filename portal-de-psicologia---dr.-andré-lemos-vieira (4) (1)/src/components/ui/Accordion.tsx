import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  title: string;
  content: React.ReactNode;
  categoryBadge?: string;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else {
      setOpenIds(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-emerald-300 shadow-xs'
                : 'bg-white/70 border-white/80 hover:bg-white hover:border-slate-300'
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                {item.categoryBadge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 shrink-0">
                    {item.categoryBadge}
                  </span>
                )}
                <span className="text-xs md:text-sm font-bold text-slate-800 leading-snug">
                  {item.title}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-emerald-700' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 animate-fadeIn">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
