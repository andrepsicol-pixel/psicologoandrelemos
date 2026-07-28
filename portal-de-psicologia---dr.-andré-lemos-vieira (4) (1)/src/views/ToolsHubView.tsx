import React, { useState } from 'react';
import { ViewMode } from '../types/portal';
import { Gad7Tool } from '../components/tools/Gad7Tool';
import { Phq9Tool } from '../components/tools/Phq9Tool';
import { AsrsTool } from '../components/tools/AsrsTool';
import { RaadsTool } from '../components/tools/RaadsTool';
import { RosenbergTool } from '../components/tools/RosenbergTool';
import { BurnoutTool } from '../components/tools/BurnoutTool';
import { ThoughtRecordTool } from '../components/tools/ThoughtRecordTool';
import { MoodTrackerTool } from '../components/tools/MoodTrackerTool';
import { SleepCalculatorTool } from '../components/tools/SleepCalculatorTool';
import { ExposurePlanTool } from '../components/tools/ExposurePlanTool';
import { BreadcrumbNav } from '../components/seo/BreadcrumbNav';
import { InternalLinker } from '../components/seo/InternalLinker';
import { SchemaOrgViewer } from '../components/seo/SchemaOrgViewer';
import { Wrench, Activity, CloudRain, Zap, BrainCircuit, Sparkles, Flame, BookOpen, Calendar, Moon, Layers, ArrowLeft } from 'lucide-react';

interface ToolsHubViewProps {
  initialToolId?: string;
  onNavigate: (view: ViewMode, param?: string) => void;
  onOpenConsultationModal: (notes?: string) => void;
}

export const ToolsHubView: React.FC<ToolsHubViewProps> = ({
  initialToolId = 'gad7',
  onNavigate,
  onOpenConsultationModal
}) => {
  const [activeTool, setActiveTool] = useState(initialToolId);

  const breadcrumbs = [
    { label: 'Central de Ferramentas & Testes Clínicos', active: true }
  ];

  const toolsList = [
    { id: 'gad7', name: 'GAD-7 Ansiedade', icon: Activity, badge: 'Escala Ansiedade' },
    { id: 'phq9', name: 'PHQ-9 Depressão', icon: CloudRain, badge: 'Escala Depressão' },
    { id: 'asrs', name: 'ASRS v1.1 TDAH', icon: Zap, badge: 'TDAH Adulto' },
    { id: 'raads', name: 'AQ-10 / RAADS Autismo', icon: BrainCircuit, badge: 'Espectro Autista' },
    { id: 'rosenberg', name: 'Rosenberg Autoestima', icon: Sparkles, badge: 'Autoestima' },
    { id: 'burnout', name: 'Burnout MBI', icon: Flame, badge: 'Esgotamento' },
    { id: 'rpa', name: 'Diário de Pensamentos TCC', icon: BookOpen, badge: 'RPA TCC' },
    { id: 'mood', name: 'Diário do Humor', icon: Calendar, badge: 'Monitor Emocional' },
    { id: 'sleep', name: 'Qualidade do Sono', icon: Moon, badge: 'Calculadora PSQI' },
    { id: 'exposure', name: 'Plano de Exposição', icon: Layers, badge: 'Hierarquia Medos' },
  ];

  const relatedLinks = [
    {
      title: 'Artigos Científicos sobre Ansiedade e TCC',
      subtitle: 'Compreenda a Reestruturação Cognitiva',
      type: 'article' as const,
      view: 'article' as ViewMode,
      param: 'tag-sintomas-tratamento-tcc'
    },
    {
      title: 'Perguntas Frequentes sobre Reembolso de Plano de Saúde',
      subtitle: 'Como utilizar seu plano para realizar psicoterapia',
      type: 'faq' as const,
      view: 'faqs' as ViewMode
    },
    {
      title: 'Consultórios no Sudoeste e Ceilândia (Brasília)',
      subtitle: 'Conheça o Psicólogo André Lemos Vieira (CRP 01/14042)',
      type: 'article' as const,
      view: 'about-doctor' as ViewMode
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumbs */}
      <BreadcrumbNav items={breadcrumbs} onNavigate={onNavigate} />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] rounded px-1"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] flex items-center gap-3 tracking-tight">
            <Wrench className="w-7 h-7 text-[#A68A6B]" /> Central de Ferramentas & Testes Clínicos Gratuitos
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Ferramentas interativas de autorrastreamento (GAD-7, PHQ-9, ASRS) e exercícios práticos de TCC para psicoeducação e saúde mental.
          </p>
        </div>
      </div>

      {/* Tools Selector Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E8E2D9]">
        {toolsList.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`px-4 py-3 rounded-2xl border text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] ${
                isActive
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-slate-700 border-[#E8E2D9] hover:bg-[#FAF8F5]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#A68A6B]' : 'text-slate-500'}`} />
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tool Renderer */}
      <div className="max-w-4xl mx-auto">
        {activeTool === 'gad7' && <Gad7Tool onOpenConsultationModal={onOpenConsultationModal} />}
        {activeTool === 'phq9' && <Phq9Tool onOpenConsultationModal={onOpenConsultationModal} />}
        {activeTool === 'asrs' && <AsrsTool onOpenConsultationModal={onOpenConsultationModal} />}
        {activeTool === 'raads' && <RaadsTool onOpenConsultationModal={onOpenConsultationModal} />}
        {activeTool === 'rosenberg' && <RosenbergTool onOpenConsultationModal={onOpenConsultationModal} />}
        {activeTool === 'burnout' && <BurnoutTool onOpenConsultationModal={onOpenConsultationModal} />}
        {activeTool === 'rpa' && <ThoughtRecordTool />}
        {activeTool === 'mood' && <MoodTrackerTool />}
        {activeTool === 'sleep' && <SleepCalculatorTool />}
        {activeTool === 'exposure' && <ExposurePlanTool />}
      </div>

      {/* Internal Linker */}
      <InternalLinker links={relatedLinks} onNavigate={onNavigate} />

      <SchemaOrgViewer pageType="tools" />
    </div>
  );
};
