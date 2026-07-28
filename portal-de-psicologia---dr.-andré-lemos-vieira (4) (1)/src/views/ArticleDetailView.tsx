import React from 'react';
import { ViewMode } from '../types/portal';
import { articlesData } from '../data/articlesData';
import { drAndreProfile } from '../data/authorData';
import { useDoctorPhoto } from '../hooks/useDoctorPhoto';
import { SchemaOrgViewer } from '../components/seo/SchemaOrgViewer';
import { BreadcrumbNav } from '../components/seo/BreadcrumbNav';
import { InternalLinker } from '../components/seo/InternalLinker';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';

interface ArticleDetailViewProps {
  articleId: string;
  onNavigate: (view: ViewMode, param?: string) => void;
  onOpenConsultationModal: (notes?: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  articleId,
  onNavigate,
  onOpenConsultationModal
}) => {
  const { photoUrl } = useDoctorPhoto();
  const article = articlesData.find(a => a.id === articleId || a.slug === articleId) || articlesData[0];

  const breadcrumbs = [
    { label: 'Artigos Clínicos', view: 'home' as ViewMode },
    { label: article.subcategory || 'Artigo', active: true }
  ];

  const relatedLinks = [
    {
      title: 'Teste de Ansiedade GAD-7',
      subtitle: 'Mapeie a severidade dos sintomas de ansiedade',
      type: 'tool' as const,
      view: 'tools' as ViewMode,
      param: 'gad7'
    },
    {
      title: 'Diário de Pensamentos Automáticos (TCC)',
      subtitle: 'Identifique distorções cognitivas no cotidiano',
      type: 'tool' as const,
      view: 'tools' as ViewMode,
      param: 'thought-record'
    },
    {
      title: 'Como funciona o Reembolso de Plano de Saúde?',
      subtitle: 'Entenda como solicitar reembolso de sessões de psicologia',
      type: 'faq' as const,
      view: 'faqs' as ViewMode
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav items={breadcrumbs} onNavigate={onNavigate} />

      {/* Back button */}
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] rounded px-1"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao Portal
      </button>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1 rounded-full bg-[#A68A6B]/10 text-[#A68A6B] border border-[#A68A6B]/20">
            {article.subcategory || 'Artigo Clínico'}
          </span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#A68A6B]" /> {article.readingTimeMinutes} min de leitura
          </span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-slate-500">Revisado em {article.reviewDate}</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
          {article.summary}
        </p>

        {/* Diagnostic Codes Box */}
        {(article.dsmCode || article.icdCode) && (
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-slate-700 flex flex-wrap items-center gap-4 font-mono">
            {article.dsmCode && <span><strong>DSM-5-TR:</strong> {article.dsmCode}</span>}
            {article.icdCode && <span><strong>CID-11:</strong> {article.icdCode}</span>}
          </div>
        )}

        {/* Author EEAT Box */}
        <div className="p-4 rounded-2xl bg-[#1A1A1A] text-white flex items-center gap-4 border border-[#A68A6B]/30 shadow-xs">
          <img
            src={photoUrl || '/dr-andre.jpg'}
            alt={`Foto do ${drAndreProfile.name}`}
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              if (!e.currentTarget.src.endsWith('/dr-andre.jpg')) {
                e.currentTarget.src = '/dr-andre.jpg';
              }
            }}
            className="w-12 h-12 rounded-xl object-cover border-2 border-[#A68A6B]"
          />
          <div className="text-xs">
            <span className="font-bold text-white text-sm block">{drAndreProfile.name}</span>
            <span className="text-[#A68A6B] font-semibold">{drAndreProfile.crp} &bull; Psicólogo Clínico</span>
            <span className="text-slate-300 block mt-0.5">Especialista em TCC e Gestalt-terapia (Brasília: Ceilândia e Sudoeste & Online)</span>
          </div>
        </div>
      </header>

      {/* Article Featured Cover Image */}
      {article.imageUrl && (
        <div className="rounded-3xl overflow-hidden border border-[#E8E2D9] shadow-xs aspect-[16/9] bg-[#FAF8F5]">
          <img
            src={article.imageUrl}
            alt={article.title}
            width="800"
            height="450"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Key Takeaways Box (Google AI Overview Optimized) */}
      {article.keyTakeaways.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#A68A6B]/30 space-y-3">
          <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#A68A6B]" /> Resumo Executivo & Pontos Chave (AI Overview)
          </h2>
          <ul className="space-y-2 text-xs md:text-sm text-slate-700">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A68A6B] shrink-0 mt-2"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Body Content */}
      <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 md:p-10 shadow-2xs">
        <MarkdownRenderer content={article.content} />
      </div>

      {/* Evidence Sources */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-slate-600 space-y-1">
        <strong className="block text-slate-800 font-bold mb-1">Fontes Científicas e Referências Clínicas:</strong>
        {article.evidenceBase.map((src, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{src}</span>
          </div>
        ))}
      </div>

      {/* Internal Links for SEO Semantic Authority */}
      <InternalLinker links={relatedLinks} onNavigate={onNavigate} />

      {/* Article FAQs (Featured Snippets Optimization) */}
      {article.faqs && article.faqs.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border border-[#E8E2D9] space-y-4">
          <h2 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#A68A6B]" /> Dúvidas Frequentes sobre {article.subcategory || 'o Tema'}
          </h2>
          <div className="space-y-3">
            {article.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] text-xs space-y-1 border border-[#E8E2D9]">
                <strong className="block font-bold text-[#1A1A1A] text-sm">{faq.question}</strong>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appointment CTA */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#1A1A1A] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#A68A6B]/30 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-white">Precisa de atendimento psicológico especializado em Brasília ou Online?</h3>
          <p className="text-xs text-slate-300 mt-1">
            Agende sua avaliação clínica com o Psicólogo André Lemos Vieira (CRP 01/14042) nas unidades Ceilândia, Sudoeste ou via Videochamada.
          </p>
        </div>
        <button
          onClick={() => onOpenConsultationModal(`Leitura do artigo: ${article.title}`)}
          className="px-6 py-3.5 rounded-2xl bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-xs shrink-0 cursor-pointer shadow-md transition-all active:scale-[0.98]"
        >
          Agendar Consulta no WhatsApp
        </button>
      </div>

      {/* Schema.org Component */}
      <SchemaOrgViewer pageType="article" articleData={article} />
    </div>
  );
};
