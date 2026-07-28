import React, { useState } from 'react';
import { ViewMode } from '../types/portal';
import { glossaryData } from '../data/glossaryData';
import { BreadcrumbNav } from '../components/seo/BreadcrumbNav';
import { InternalLinker } from '../components/seo/InternalLinker';
import { SchemaOrgViewer } from '../components/seo/SchemaOrgViewer';
import { BookOpen, Search, ArrowLeft } from 'lucide-react';

interface GlossaryViewProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'Glossário de Psicologia & Termos Clínicos', active: true }
  ];

  const filteredTerms = glossaryData.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLetter = selectedLetter
      ? item.term.toUpperCase().startsWith(selectedLetter)
      : true;

    return matchesSearch && matchesLetter;
  });

  const relatedLinks = [
    {
      title: 'Artigos Científicos e Revisões Baseadas em Evidências',
      subtitle: 'Entenda os conceitos clínicos aplicados à prática psicoterapêutica',
      type: 'article' as const,
      view: 'home' as ViewMode
    },
    {
      title: 'Ferramentas de Rastreamento Psicológico Gratuito',
      subtitle: 'Testes validados GAD-7, PHQ-9 e ASRS v1.1',
      type: 'tool' as const,
      view: 'tools' as ViewMode
    },
    {
      title: 'Perguntas Frequentes (FAQs)',
      subtitle: 'Respostas claras para dúvidas sobre saúde mental',
      type: 'faq' as const,
      view: 'faqs' as ViewMode
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumbs */}
      <BreadcrumbNav items={breadcrumbs} onNavigate={onNavigate} />

      {/* Header */}
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] rounded px-1"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </button>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] flex items-center gap-3 tracking-tight">
          <BookOpen className="w-7 h-7 text-[#A68A6B]" /> Glossário de Psicologia & Termos Clínicos
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Dicionário técnico com conceitos de psicopatologia, neuropsicologia, Terapia Cognitivo-Comportamental (TCC) e Gestalt-terapia.
        </p>
      </div>

      {/* Search & Alphabet Filter */}
      <div className="space-y-4 bg-[#FAF8F5] p-6 rounded-3xl border border-[#E8E2D9]">
        <div className="relative">
          <label htmlFor="glossary-search" className="sr-only">Buscar termo psicológico</label>
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
          <input
            id="glossary-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por termo psicológico (ex: Anedonia, Catastrofização, Masking)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#E8E2D9] bg-white text-sm focus:ring-2 focus:ring-[#A68A6B] focus:outline-hidden"
          />
        </div>

        {/* A-Z Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <button
            onClick={() => setSelectedLetter(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] ${
              selectedLetter === null ? 'bg-[#A68A6B] text-white' : 'bg-white border border-[#E8E2D9] text-slate-700 hover:bg-[#FAF8F5]'
            }`}
          >
            Todos
          </button>
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 rounded-lg text-xs font-bold cursor-pointer flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] ${
                selectedLetter === letter ? 'bg-[#A68A6B] text-white' : 'bg-white border border-[#E8E2D9] text-slate-700 hover:bg-[#FAF8F5]'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <article key={term.id} className="bg-white rounded-2xl border border-[#E8E2D9] p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1A1A1A]">{term.term}</h2>
                <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] text-[#A68A6B] text-[11px] font-bold border border-[#E8E2D9]">
                  {term.category}
                </span>
              </div>

              <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-medium">
                {term.definition}
              </p>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-slate-600">
                <strong>Contexto Clínico:</strong> {term.clinicalContext}
              </div>

              {term.relatedTerms.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Relacionados:</span>
                  {term.relatedTerms.map((rt, idx) => (
                    <span key={idx} className="text-[10px] bg-[#FAF8F5] text-slate-600 px-2 py-0.5 rounded-md border border-[#E8E2D9]">
                      {rt}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] text-slate-500 text-sm">
            Nenhum termo encontrado com o filtro aplicado.
          </div>
        )}
      </div>

      <InternalLinker links={relatedLinks} onNavigate={onNavigate} />

      <SchemaOrgViewer pageType="glossary" />
    </div>
  );
};
