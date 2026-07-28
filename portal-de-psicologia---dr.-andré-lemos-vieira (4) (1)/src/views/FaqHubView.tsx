import React, { useState } from 'react';
import { ViewMode } from '../types/portal';
import { faqsData } from '../data/faqsData';
import { BreadcrumbNav } from '../components/seo/BreadcrumbNav';
import { InternalLinker } from '../components/seo/InternalLinker';
import { SchemaOrgViewer } from '../components/seo/SchemaOrgViewer';
import { HelpCircle, ArrowLeft, Search, Sparkles } from 'lucide-react';

interface FaqHubViewProps {
  onNavigate: (view: ViewMode, param?: string) => void;
  onOpenConsultationModal: () => void;
}

export const FaqHubView: React.FC<FaqHubViewProps> = ({ onNavigate, onOpenConsultationModal }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const breadcrumbs = [
    { label: 'Central de Perguntas Frequentes (FAQs)', active: true }
  ];

  const filteredFaqs = faqsData.filter((f) =>
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const relatedLinks = [
    {
      title: 'Artigos Clínicos & Evidências Científicas',
      subtitle: 'Leia os guias completos elaborados pelo Dr. André Lemos Vieira',
      type: 'article' as const,
      view: 'home' as ViewMode
    },
    {
      title: 'Testes de Rastreamento Psicológico Online',
      subtitle: 'Escalas validadas GAD-7, PHQ-9 e ASRS v1.1',
      type: 'tool' as const,
      view: 'tools' as ViewMode
    },
    {
      title: 'Perfil e Formação do Psicólogo André Lemos Vieira',
      subtitle: 'Especialista em TCC e Gestalt-terapia (CRP 01/14042)',
      type: 'article' as const,
      view: 'about-doctor' as ViewMode
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav items={breadcrumbs} onNavigate={onNavigate} />

      <div>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] rounded px-1"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </button>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] flex items-center gap-3 tracking-tight">
          <HelpCircle className="w-7 h-7 text-[#A68A6B]" /> Central de Perguntas Frequentes & Dúvidas Clínicas
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Respostas claras e embasadas para as dúvidas mais comuns sobre Terapia Cognitivo-Comportamental, Gestalt-terapia, Reembolso de Plano de Saúde e Atendimento em Brasília e Online.
        </p>
      </div>

      <div className="relative">
        <label htmlFor="faq-search-input" className="sr-only">Pesquisar por dúvida</label>
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
        <input
          id="faq-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar por dúvida (ex: consulta online, TDAH, ansiedade, reembolso)..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#E8E2D9] bg-white text-sm focus:ring-2 focus:ring-[#A68A6B] focus:outline-hidden"
        />
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <article key={faq.id} className="bg-white rounded-2xl border border-[#E8E2D9] p-6 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F5] text-[#A68A6B] text-[10px] font-bold border border-[#E8E2D9]">
                {faq.category}
              </span>
              {faq.featuredSnippetTarget && (
                <span className="text-[10px] font-semibold text-[#A68A6B] bg-[#FAF8F5] px-2 py-0.5 rounded-md flex items-center gap-1 border border-[#A68A6B]/20">
                  <Sparkles className="w-3 h-3 text-[#A68A6B]" /> Featured Snippet Ready
                </span>
              )}
            </div>

            <h2 className="text-base md:text-lg font-bold text-[#1A1A1A]">{faq.question}</h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed pt-1">{faq.answer}</p>
          </article>
        ))}
      </div>

      <InternalLinker links={relatedLinks} onNavigate={onNavigate} />

      <div className="p-6 md:p-8 rounded-3xl bg-[#1A1A1A] text-white text-center space-y-3 border border-[#A68A6B]/30 shadow-md">
        <h2 className="text-lg font-bold text-white">Não encontrou a resposta para a sua dúvida?</h2>
        <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
          Entre em contato diretamente com o Psicólogo André Lemos Vieira para esclarecer detalhes sobre o atendimento em Brasília ou Online.
        </p>
        <button
          onClick={onOpenConsultationModal}
          className="px-6 py-3 rounded-xl bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-xs cursor-pointer transition-all shadow-xs"
        >
          Enviar Pergunta / Agendar Atendimento no WhatsApp
        </button>
      </div>

      <SchemaOrgViewer pageType="faq" />
    </div>
  );
};
