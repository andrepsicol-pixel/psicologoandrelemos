import React, { useState } from 'react';
import { ViewMode } from '../types/portal';
import { scienceData } from '../data/scienceData';
import { Microscope, ArrowLeft, ShieldCheck, BookOpen, CheckCircle2 } from 'lucide-react';

interface ScienceDigestViewProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const ScienceDigestView: React.FC<ScienceDigestViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = [
    'Todos',
    ...Array.from(new Set(scienceData.map((s) => s.category)))
  ];

  const filteredStudies = selectedCategory === 'Todos'
    ? scienceData
    : scienceData.filter((s) => s.category === selectedCategory);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 md:py-14 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#A68A6B]" />
            <span>Voltar ao Início</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A68A6B]/10 border border-[#A68A6B]/30 text-[#A68A6B] text-xs font-bold uppercase tracking-wider">
                <Microscope className="w-4 h-4 text-[#A68A6B]" />
                <span>Prática Baseada em Evidências</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight leading-tight">
                Repositório de Pesquisas &amp; Consensos Científicos
              </h1>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                Tradução clara e rigorosa de metanálises, ensaios clínicos e diretrizes internacionais de padrão-ouro (DSM-5-TR, CID-11, NICE, Cochrane, APA, OMS) para orientar a psicoterapia de excelência.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs text-xs text-slate-700 space-y-1 shrink-0">
              <span className="font-bold text-[#1A1A1A] block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#A68A6B]" />
                Curadoria Técnica Especializada
              </span>
              <p className="text-slate-600">
                André Lemos Vieira — Psicólogo Clínico (CRP 01/14042)
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-slate-700 border-[#E8E2D9] hover:border-[#A68A6B] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clinical Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-3xl border border-[#E8E2D9] p-6 md:p-8 shadow-xs flex flex-col justify-between space-y-6 hover:border-[#A68A6B]/50 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Header Badge & Year */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0EBE1] pb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A68A6B]/10 text-[#A68A6B] border border-[#A68A6B]/30">
                    {study.source} ({study.year})
                  </span>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {study.category}
                  </span>
                </div>

                {/* Study Title */}
                <h2 className="text-lg md:text-xl font-extrabold text-[#1A1A1A] leading-snug tracking-tight">
                  {study.title}
                </h2>

                {/* Accessible Summary Box */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E0E0E0] space-y-1.5">
                  <strong className="block font-bold text-[#A68A6B] uppercase tracking-wider text-[11px]">
                    Resumo em Linguagem Acessível
                  </strong>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
                    {study.simplifiedSummary}
                  </p>
                </div>

                {/* Impact & Evidence Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D9] space-y-1">
                    <strong className="block text-[#1A1A1A] font-bold">
                      Impacto na Prática Clínica:
                    </strong>
                    <p className="text-slate-600 leading-relaxed">
                      {study.clinicalImpact}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D9] space-y-1">
                    <strong className="block text-[#1A1A1A] font-bold">
                      Nível de Evidência:
                    </strong>
                    <p className="text-[#A68A6B] font-semibold leading-relaxed">
                      {study.evidenceLevel}
                    </p>
                  </div>
                </div>

                {/* Citation */}
                <div className="pt-2 text-[11px] text-slate-500 font-mono leading-relaxed border-t border-[#F0EBE1]">
                  <strong className="text-slate-700">Citação Original:</strong> {study.originalCitation}
                </div>
              </div>

              {/* Card Footer: Curation Note */}
              <div className="pt-4 border-t border-[#E8E2D9] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#A68A6B] shrink-0" />
                  Curadoria por André Lemos Vieira – CRP 01/14042
                </span>
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center gap-1 text-[#A68A6B] font-bold hover:underline cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ver na Clínica</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] text-center space-y-4 max-w-3xl mx-auto shadow-xs">
          <h3 className="text-xl font-bold text-[#1A1A1A]">
            Atendimento Psicológico Pautado no Rigor Científico
          </h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            As evidências científicas orientam a escolha de intervenções terapêuticas eficientes, éticas e focadas na redução do sofrimento emocional. Para um acompanhamento individualizado com André Lemos Vieira em Brasília ou Online, entre em contato.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/5561992558044?text=Ol%C3%A1%2C%20Andr%C3%A9!%20Li%20as%20pesquisas%20no%20site%20e%20gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-xs md:text-sm transition-all shadow-md shadow-[#A68A6B]/20"
            >
              <span>Agendar Consulta Fundamentada em Evidências</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
