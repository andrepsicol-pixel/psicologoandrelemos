import React from 'react';
import { ViewMode } from '../types/portal';
import { categoriesData } from '../data/categoriesData';
import { articlesData } from '../data/articlesData';
import { casesData } from '../data/casesData';
import { faqsData } from '../data/faqsData';
import { BreadcrumbNav } from '../components/seo/BreadcrumbNav';
import { InternalLinker } from '../components/seo/InternalLinker';
import { SchemaOrgViewer } from '../components/seo/SchemaOrgViewer';
import { ArrowLeft, CheckCircle2, Wrench, BookOpen, FileText, HelpCircle } from 'lucide-react';

interface CategoryDetailViewProps {
  categoryId: string;
  onNavigate: (view: ViewMode, param?: string) => void;
  onOpenConsultationModal: (notes?: string) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  categoryId,
  onNavigate,
  onOpenConsultationModal
}) => {
  const category = categoriesData.find(c => c.id === categoryId || c.slug === categoryId) || categoriesData[0];
  const relatedArticles = articlesData.filter(a => a.categoryId === category.id);
  const relatedCases = casesData.filter(c => c.category.toLowerCase().includes(category.id));
  const categoryFaqs = faqsData.slice(0, 4);

  const breadcrumbs = [
    { label: 'Especialidades & SILO', view: 'home' as ViewMode },
    { label: category.name, active: true }
  ];

  const relatedLinks = [
    {
      title: 'Autoavaliação Psicológica Gratuita (GAD-7 / PHQ-9)',
      subtitle: 'Ferramentas psicométricas de rastreio clínico',
      type: 'tool' as const,
      view: 'tools' as ViewMode
    },
    {
      title: 'Consultórios em Brasília (Ceilândia & Sudoeste)',
      subtitle: 'Conheça o local de atendimento do Dr. André Lemos Vieira',
      type: 'article' as const,
      view: 'about-doctor' as ViewMode
    },
    {
      title: 'Dúvidas sobre o Processo de Psicoterapia',
      subtitle: 'Como funciona a TCC e a Gestalt-terapia',
      type: 'faq' as const,
      view: 'faqs' as ViewMode
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav items={breadcrumbs} onNavigate={onNavigate} />

      {/* Back button */}
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] rounded px-1"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao Início
      </button>

      {/* Category Hero */}
      <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 md:p-10 border border-[#A68A6B]/30 shadow-md">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#A68A6B]/20 text-[#A68A6B] border border-[#A68A6B]/40 mb-3 inline-block">
          Cluster SILO &bull; {category.siloCluster}
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
          {category.name}: Compreensão Clínica e Tratamento em Brasília e Online
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
          {category.fullDesc}
        </p>

        {/* Subcategories list */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-400 block w-full mb-1">Subtemas Abrangidos:</span>
          {category.subcategories.map((sub, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700/60 text-xs font-medium">
              {sub}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content (Left 8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Symptoms List */}
          <div className="bg-white rounded-2xl border border-[#E8E2D9] p-6 shadow-xs">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#A68A6B]" /> Sintomas Principais Mapeados na Clínica
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.symptomsList.map((symptom, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-slate-800 font-medium flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#A68A6B] shrink-0"></span>
                  {symptom}
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles in SILO */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#A68A6B]" /> Artigos Científicos no Cluster {category.name}
            </h2>

            {relatedArticles.length > 0 ? (
              relatedArticles.map((art) => (
                <article key={art.id} className="bg-white rounded-2xl border border-[#E8E2D9] p-6 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#A68A6B] block">{art.subcategory}</span>
                  <h3 className="text-base font-bold text-[#1A1A1A]">{art.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{art.summary}</p>
                  <button
                    onClick={() => onNavigate('article', art.id)}
                    className="px-4 py-2 rounded-xl bg-[#A68A6B] text-white font-bold text-xs hover:bg-[#8F7356] transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    Ler Guia Clínico Completo
                  </button>
                </article>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D9]">
                Novos artigos científicos para este cluster estão sendo elaborados com base nas diretrizes DSM-5-TR pelo Psicólogo André Lemos Vieira.
              </p>
            )}
          </div>

          {/* Related Case Studies */}
          {relatedCases.length > 0 && (
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] p-6 space-y-3">
              <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#A68A6B]" /> Estudo de Anamnese & Evolução Clínica
              </h2>
              {relatedCases.map((cs) => (
                <div key={cs.id} className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-xl border border-[#E8E2D9]">
                  <h3 className="font-bold text-sm text-[#1A1A1A]">{cs.title}</h3>
                  <p><strong>Perfil do Paciente:</strong> {cs.patientAgeGender}</p>
                  <p><strong>Queixa Principal:</strong> {cs.initialComplaint}</p>
                  <p className="text-emerald-800 font-medium"><strong>Evolução:</strong> {cs.outcome}</p>
                </div>
              ))}
            </div>
          )}

          {/* Internal Links for SEO */}
          <InternalLinker links={relatedLinks} onNavigate={onNavigate} />

          {/* FAQs Accordion */}
          <div className="bg-white rounded-2xl border border-[#E8E2D9] p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#A68A6B]" /> Perguntas Frequentes sobre {category.name}
            </h2>
            <div className="space-y-3">
              {categoryFaqs.map((faq) => (
                <div key={faq.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs">
                  <strong className="block text-[#1A1A1A] font-bold mb-1 text-sm">{faq.question}</strong>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (Right 4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recommended Tool */}
          <div className="bg-[#FAF8F5] border border-[#A68A6B]/30 rounded-2xl p-6 text-[#1A1A1A] space-y-3 shadow-xs">
            <Wrench className="w-6 h-6 text-[#A68A6B]" />
            <h3 className="font-bold text-base">Ferramenta de Autoavaliação</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mapeie seus sintomas de forma gratuita e privativa através de nossos testes validados em psicometria.
            </p>
            <button
              onClick={() => onNavigate('tools')}
              className="w-full py-3 rounded-xl bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-xs transition-colors cursor-pointer text-center block shadow-xs"
            >
              Acessar Testes Online
            </button>
          </div>

          {/* Booking Box */}
          <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 space-y-4 border border-[#A68A6B]/30 shadow-md">
            <h3 className="font-bold text-base text-white">Atendimento com Psicólogo André Lemos Vieira</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Agende sua consulta presencial nas unidades Ceilândia, Sudoeste ou Online com foco no tratamento de {category.name}.
            </p>
            <button
              onClick={() => onOpenConsultationModal(`Avaliação para ${category.name}`)}
              className="w-full py-3.5 rounded-xl bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-xs transition-colors cursor-pointer text-center block shadow-xs"
            >
              Agendar no WhatsApp
            </button>
          </div>
        </div>
      </div>

      <SchemaOrgViewer pageType="category" categoryData={category} />
    </div>
  );
};
