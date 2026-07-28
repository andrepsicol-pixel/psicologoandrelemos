import React from 'react';
import { ViewMode } from '../../types/portal';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  view?: ViewMode;
  param?: string;
  active?: boolean;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Navegação em migalhas (Breadcrumb)" className="py-2.5 px-1">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-600 font-medium">
        <li>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1 hover:text-[#1A1A1A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] rounded px-1 cursor-pointer"
            title="Página Inicial"
          >
            <Home className="w-3.5 h-3.5 text-[#A68A6B]" />
            <span className="sr-only">Início</span>
          </button>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            {item.active || !item.view ? (
              <span className="font-bold text-[#1A1A1A] truncate max-w-[200px] sm:max-w-[320px]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => item.view && onNavigate(item.view, item.param)}
                className="hover:text-[#1A1A1A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] rounded px-1 cursor-pointer truncate max-w-[150px] sm:max-w-[240px]"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
