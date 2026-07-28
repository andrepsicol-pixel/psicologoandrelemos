import React, { useState } from 'react';
import { ViewMode } from '../types/portal';
import { drAndreProfile } from '../data/authorData';
import { useDoctorPhoto } from '../hooks/useDoctorPhoto';
import { BreadcrumbNav } from '../components/seo/BreadcrumbNav';
import { InternalLinker } from '../components/seo/InternalLinker';
import { SchemaOrgViewer } from '../components/seo/SchemaOrgViewer';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { 
  ArrowLeft, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Users, 
  FileText, 
  ExternalLink,
  Compass,
  Sparkles,
  GraduationCap,
  Brain,
  Activity
} from 'lucide-react';

interface AboutDoctorViewProps {
  onNavigate: (view: ViewMode, param?: string) => void;
  onOpenConsultationModal: (notes?: string) => void;
}

export const AboutDoctorView: React.FC<AboutDoctorViewProps> = ({
  onNavigate,
  onOpenConsultationModal
}) => {
  const { photoUrl } = useDoctorPhoto();
  const [activeLocationId, setActiveLocationId] = useState<'ceilandia' | 'sudoeste'>('ceilandia');

  const selectedLocation = drAndreProfile.locations.find(l => l.id === activeLocationId) || drAndreProfile.locations[0];

  const breadcrumbs = [
    { label: 'Dr. André Lemos Vieira', active: true }
  ];

  const relatedLinks = [
    {
      title: 'Artigos Científicos e Revisões Clínicas',
      subtitle: 'TDAH em adultos, ansiedade, depressão e estresse',
      type: 'article' as const,
      view: 'home' as ViewMode
    },
    {
      title: 'Testes Psicológicos Gratuitos de Autorrastreamento',
      subtitle: 'Escalas GAD-7, PHQ-9 e ASRS v1.1',
      type: 'tool' as const,
      view: 'tools' as ViewMode
    },
    {
      title: 'Perguntas Frequentes sobre Reembolso e Atendimento',
      subtitle: 'Saiba como utilizar seu plano de saúde para psicoterapia',
      type: 'faq' as const,
      view: 'faqs' as ViewMode
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav items={breadcrumbs} onNavigate={onNavigate} />

      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] rounded px-1"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao Início
      </button>

      {/* Hero Header */}
      <div className="relative bg-[#1A1A1A] text-white rounded-3xl p-6 md:p-10 shadow-md border border-[#A68A6B]/30 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative shrink-0">
            <img
              src={photoUrl || '/dr-andre.jpg'}
              alt={`Foto de ${drAndreProfile.name}`}
              width="192"
              height="192"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={(e) => {
                if (!e.currentTarget.src.endsWith('/dr-andre.jpg')) {
                  e.currentTarget.src = '/dr-andre.jpg';
                }
              }}
              className="relative w-36 h-36 md:w-48 md:h-48 rounded-2xl object-cover object-top border-2 border-[#A68A6B] shadow-sm"
            />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#A68A6B]/20 text-[#A68A6B] border border-[#A68A6B]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A68A6B]" />
                {drAndreProfile.crp}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                Formado em 2008 (18+ anos de prática clínica)
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {drAndreProfile.name}
            </h1>
            
            <p className="text-[#A68A6B] font-bold text-base md:text-lg">
              {drAndreProfile.title}
            </p>

            <div className="space-y-1.5 text-slate-300 text-xs md:text-sm pt-1">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <GraduationCap className="w-4 h-4 text-[#A68A6B] shrink-0" />
                <span>{drAndreProfile.university}</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Award className="w-4 h-4 text-[#A68A6B] shrink-0" />
                <span>{drAndreProfile.specializationInstitution}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Como Trabalho Section */}
      <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#FAF8F5] text-[#A68A6B] border border-[#E8E2D9]">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#A68A6B] uppercase tracking-widest block">Metodologia Clínica</span>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">Como Trabalho</h2>
          </div>
        </div>

        <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E2D9]">
          <MarkdownRenderer content={drAndreProfile.howIWorkText} />
        </div>

        {/* Abordagens Integradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
            <div className="flex items-center gap-2 text-[#1A1A1A] font-bold text-sm">
              <Brain className="w-4 h-4 text-[#A68A6B]" />
              <span>Terapia Cognitivo-Comportamental (TCC)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Foco na identificação e reestruturação de padrões de pensamento, crenças disfuncionais e estratégias comportamentais práticas voltadas à redução de sintomas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
            <div className="flex items-center gap-2 text-[#1A1A1A] font-bold text-sm">
              <Sparkles className="w-4 h-4 text-[#A68A6B]" />
              <span>Gestalt-Terapia</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ênfase na tomada de consciência (awareness), na experiência do aqui-e-agora, no contato autêntico e na integração da responsabilidade pessoal com acolhimento.
            </p>
          </div>
        </div>
      </div>

      {/* Áreas de Atuação */}
      <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#FAF8F5] text-[#A68A6B] border border-[#E8E2D9]">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#A68A6B] uppercase tracking-widest block">Especialidades</span>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">Áreas de Atuação Clínica</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {drAndreProfile.specialties.map((spec, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs md:text-sm text-slate-800 font-medium flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#A68A6B] shrink-0" />
              <span>{spec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Público Atendido & Documentos Psicológicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Público Atendido */}
        <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] text-[#A68A6B] border border-[#E8E2D9]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#A68A6B] uppercase tracking-widest block">Faixas Etárias</span>
              <h3 className="text-lg font-bold text-[#1A1A1A]">Público Atendido</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {drAndreProfile.targetAudience.map((audience, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-center font-bold text-xs text-[#1A1A1A]">
                {audience}
              </div>
            ))}
          </div>
        </div>

        {/* Documentos Psicológicos (Normas do CFP) */}
        <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] text-[#A68A6B] border border-[#E8E2D9]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#A68A6B] uppercase tracking-widest block">Regulamentação CFP</span>
              <h3 className="text-lg font-bold text-[#1A1A1A]">Documentos Psicológicos</h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Elaboração técnica em estrita conformidade com as Resoluções do Conselho Federal de Psicologia:
          </p>

          <div className="space-y-2 pt-1">
            {drAndreProfile.documentsProvided.map((doc, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs font-medium text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A68A6B] shrink-0"></span>
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modalidades de Atendimento & Google Maps Integration */}
      <div className="bg-[#1A1A1A] text-white rounded-3xl border border-[#A68A6B]/30 p-6 md:p-8 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A68A6B] bg-[#A68A6B]/20 border border-[#A68A6B]/30 px-3 py-1 rounded-full uppercase tracking-widest mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#A68A6B]" />
              Localização & Mapa Interativo
            </span>
            <h2 className="text-2xl font-bold text-white">Modalidades & Consultórios em Brasília</h2>
            <p className="text-xs text-slate-300 mt-1">
              Atendimento presencial nas unidades Sudoeste e Ceilândia, além de consulta online via videochamada.
            </p>
          </div>

          {/* Location Toggle Tabs */}
          <div className="flex items-center p-1 bg-slate-900 rounded-2xl border border-slate-800 shrink-0">
            {drAndreProfile.locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveLocationId(loc.id as 'ceilandia' | 'sudoeste')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B] ${
                  activeLocationId === loc.id
                    ? 'bg-[#A68A6B] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Location Details & Google Maps Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Address Info & Features */}
          <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#A68A6B]/20 text-[#A68A6B] border border-[#A68A6B]/30">
                {selectedLocation.neighborhood} – {selectedLocation.city}
              </div>
              
              <h3 className="text-xl font-bold text-white">{selectedLocation.name}</h3>
              
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedLocation.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Endereço de Atendimento</span>
                <span className="text-slate-200 font-medium block">{selectedLocation.fullAddress}</span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <a
                href={selectedLocation.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-[#A68A6B] font-bold text-xs border border-[#A68A6B]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A6B]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir rota no Google Maps</span>
              </a>

              <button
                onClick={() => onOpenConsultationModal(`Agendamento presencial para ${selectedLocation.name}`)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#A68A6B] hover:bg-[#8F7356] text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar para {selectedLocation.neighborhood}</span>
              </button>
            </div>
          </div>

          {/* Right: Live Interactive Google Maps IFrame */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-[#A68A6B]/20 overflow-hidden relative min-h-[280px]">
            <iframe
              title={`Mapa do Google Maps - ${selectedLocation.name}`}
              src={selectedLocation.googleMapsEmbedUrl}
              className="w-full h-full min-h-[280px] border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute top-3 left-3 bg-[#1A1A1A]/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl border border-[#A68A6B]/40 shadow-md flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#A68A6B]" />
              <span>Google Maps &bull; {selectedLocation.name}</span>
            </div>
          </div>
        </div>

        {/* Online Modality Banner */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-[#A68A6B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block text-sm">Modalidade Online para Todo o Brasil</span>
              <span className="text-slate-300">Sessões por videochamada com sigilo profissional e autorização pelo e-PSI / CFP.</span>
            </div>
          </div>
          <button
            onClick={() => onOpenConsultationModal('Agendamento de Consulta Online')}
            className="px-4 py-2.5 rounded-xl bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold shrink-0 cursor-pointer transition-colors"
          >
            Agendar Consulta Online
          </button>
        </div>
      </div>

      <InternalLinker links={relatedLinks} onNavigate={onNavigate} />

      <SchemaOrgViewer pageType="doctor" />
    </div>
  );
};

