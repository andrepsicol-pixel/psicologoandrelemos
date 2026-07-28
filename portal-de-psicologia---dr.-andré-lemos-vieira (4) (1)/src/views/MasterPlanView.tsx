import React, { useState } from 'react';
import { ViewMode } from '../types/portal';
import { masterPlanSections } from '../data/masterPlanData';
import { Compass, ArrowLeft, CheckCircle2, Layers, ShieldCheck, Code, Globe, FileText, Cpu, LineChart } from 'lucide-react';

interface MasterPlanViewProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const MasterPlanView: React.FC<MasterPlanViewProps> = ({ onNavigate }) => {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  const activeSection = masterPlanSections[activeSectionIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </button>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
            Documento de Estratégia Master (10 Entregáveis)
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <Compass className="w-8 h-8 text-emerald-700" /> Plano Diretor do Portal de Psicologia
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Planejamento completo de Arquitetura, SEO Semântico SILO, EEAT, Conteúdo de 5 Anos e Tecnologias para o maior portal de saúde mental do Brasil.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {masterPlanSections.map((sec, idx) => {
          const isActive = activeSectionIdx === idx;
          return (
            <button
              key={sec.number}
              onClick={() => setActiveSectionIdx(idx)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center font-bold">
                #{sec.number}
              </span>
              <span>{sec.title}</span>
            </button>
          );
        })}
      </div>

      {/* Section Content Display */}
      {activeSection && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Item #{activeSection.number} do Plano Diretor
            </span>
            <h2 className="text-2xl font-bold text-slate-900">{activeSection.title}</h2>
            <p className="text-slate-600 text-sm mt-1 leading-relaxed">{activeSection.summary}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detalhamento dos Requisitos:</h3>
            <div className="space-y-2">
              {activeSection.details.map((dt, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{dt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estratégias Chave de Execução:</h3>
            <div className="grid grid-cols-1 gap-4">
              {activeSection.keyStrategies.map((strat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-1">
                  <h4 className="font-bold text-sm text-emerald-900">{strat.subtitle}</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">{strat.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
