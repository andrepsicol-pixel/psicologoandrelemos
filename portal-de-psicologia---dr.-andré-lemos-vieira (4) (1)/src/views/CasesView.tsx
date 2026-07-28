import React from 'react';
import { ViewMode } from '../types/portal';
import { casesData } from '../data/casesData';
import { FileText, ShieldAlert, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface CasesViewProps {
  onNavigate: (view: ViewMode, param?: string) => void;
  onOpenConsultationModal: (notes?: string) => void;
}

export const CasesView: React.FC<CasesViewProps> = ({ onNavigate, onOpenConsultationModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </button>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <FileText className="w-8 h-8 text-amber-600" /> Biblioteca de Casos Clínicos Anonimizados
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Estudos de caso ilustrativos demonstrando o raciocínio diagnóstico e as etapas de intervenção em psicoterapia.
        </p>
      </div>

      {/* Mandatory Ethical & Legal Anonymization Notice */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs md:text-sm space-y-1">
        <strong className="font-bold flex items-center gap-2 text-amber-900 text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          Aviso Obrigatório de Preservação Ética e Sigilo Profissional:
        </strong>
        <p className="leading-relaxed text-amber-900/90">
          Todas as informações identificáveis (nomes, datas, locais específicos, ocupações e detalhes pessoais) foram rigorosamente modificadas ou sintetizadas de forma fictícia para preservar integralmente a identidade e a privacidade dos pacientes, em estrito cumprimento ao Código de Ética Profissional do Psicólogo (CFP).
        </p>
      </div>

      {/* Cases List */}
      <div className="space-y-8">
        {casesData.map((cs) => (
          <div key={cs.id} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 mb-2 inline-block">
                  {cs.category}
                </span>
                <h2 className="text-xl font-bold text-slate-900">{cs.title}</h2>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                {cs.patientAgeGender}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <strong className="block font-bold text-slate-900 uppercase tracking-wider text-[11px] text-sky-800">
                  Queixa Inicial & Avaliação
                </strong>
                <p className="text-slate-700 leading-relaxed">{cs.initialComplaint}</p>
                <div className="pt-2">
                  <strong className="block font-semibold text-slate-800 mb-1">Passos de Avaliação:</strong>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                    {cs.assessmentSteps.map((st, idx) => (
                      <li key={idx}>{st}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <strong className="block font-bold text-slate-900 uppercase tracking-wider text-[11px] text-sky-800">
                  Formulação Clínica em TCC & Gestalt
                </strong>
                <p className="text-slate-700 leading-relaxed"><strong>TCC:</strong> {cs.cbtFormulation}</p>
                <p className="text-slate-700 leading-relaxed"><strong>Gestalt:</strong> {cs.gestaltIntervention}</p>
                <p className="text-slate-500 text-xs pt-1"><strong>Duração:</strong> {cs.sessionsDuration}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs md:text-sm text-emerald-950 space-y-2">
              <strong className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Evolução Clínica & Desfecho:
              </strong>
              <p className="leading-relaxed">{cs.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
