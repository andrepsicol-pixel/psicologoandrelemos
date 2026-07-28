import React from 'react';
import { ViewMode } from '../types/portal';
import { drAndreProfile } from '../data/authorData';
import { useDoctorPhoto } from '../hooks/useDoctorPhoto';
import { categoriesData } from '../data/categoriesData';
import { articlesData } from '../data/articlesData';
import { SchemaOrgViewer } from '../components/seo/SchemaOrgViewer';
import { 
  Brain, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Wrench, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  Activity,
  Zap,
  Flame,
  CloudRain,
  HeartHandshake,
  Bot,
  Clock
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewMode, param?: string) => void;
  onOpenConsultationModal: (notes?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenConsultationModal }) => {
  const { photoUrl } = useDoctorPhoto();

  return (
    <div className="space-y-12 pb-16 pt-6 text-[#1E293B]">
      {/* Hero Section - Quiet Luxury Clinical Atmosphere */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative bg-white border border-[#E8E2D9] rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Ambient Warm Halos */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#BD5338]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Col: Headings & Conversion Message */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A68A6B]/10 border border-[#A68A6B]/30 text-[#A68A6B] text-xs font-bold tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A68A6B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A68A6B]"></span>
                </span>
                <ShieldCheck className="w-4 h-4 text-[#A68A6B]" />
                <span>Atendimento Presencial em Brasília (Ceilândia &amp; Sudoeste) e Online</span>
              </div>

              {/* H1 Refactored Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.15]">
                  Cuidado Psicológico Especializado para Promover Saúde Mental, Equilíbrio Emocional e Qualidade de Vida
                </h1>
              </div>

              {/* Refactored Subtitle */}
              <p className="text-slate-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                Com André Lemos Vieira – Psicólogo Clínico (CRP 01/14042). Atendimento psicológico fundamentado na Terapia Cognitivo-Comportamental (TCC) e Gestalt para crianças, adolescentes, adultos e idosos. Consultas presenciais em Brasília (Ceilândia e Sudoeste) e atendimento online para todo o Brasil.
              </p>

              <div className="p-4.5 rounded-2xl bg-[#FAF8F5] border border-[#E0E0E0] text-slate-700 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal space-y-1">
                <span className="text-[#A68A6B] font-bold block text-xs uppercase tracking-wider">Acolhimento Clínico &amp; Ciência</span>
                <p>
                  Acesse ferramentas de autoavaliação validadas, guias práticos e conteúdos fundamentados para a sua jornada de saúde emocional.
                </p>
              </div>

              {/* Action Buttons - Bronze Gold Primary & Charcoal Ghost Secondary CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 justify-center lg:justify-start w-full">
                <button
                  onClick={() => onOpenConsultationModal()}
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-2xl text-base font-bold text-white bg-[#A68A6B] hover:bg-[#8F7356] shadow-md shadow-[#A68A6B]/20 transition-all cursor-pointer flex items-center justify-center gap-2.5 border border-[#A68A6B] active:scale-[0.98]"
                >
                  <Calendar className="w-5 h-5 text-white shrink-0" /> 
                  <span className="whitespace-nowrap">Agendar Consulta</span>
                </button>

                <button
                  onClick={() => onNavigate('science')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-transparent hover:bg-[#1A1A1A]/5 text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <BookOpen className="w-5 h-5 text-[#1A1A1A] shrink-0" /> 
                  <span className="whitespace-nowrap">Explorar Guias</span>
                </button>
              </div>
            </div>

            {/* Right Col: Doctor Portrait Minimalist Presentation */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-md space-y-4 text-left">
                {/* Doctor Portrait Image with clean, ultra-soft shadow and subtle border on Sand background */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] md:aspect-[4/3] border border-[#E8E2D9] shadow-xs group bg-[#FAF8F5]">
                  <img
                    src={photoUrl || '/dr-andre.jpg'}
                    alt={drAndreProfile.name}
                    fetchPriority="high"
                    loading="eager"
                    onError={(e) => {
                      if (!e.currentTarget.src.endsWith('/dr-andre.jpg')) {
                        e.currentTarget.src = '/dr-andre.jpg';
                      } else if (!e.currentTarget.src.endsWith('/dr-andre.png')) {
                        e.currentTarget.src = '/dr-andre.png';
                      }
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  />
                </div>

                {/* Unboxed Name, CRP and 5.0 Rating directly on page background */}
                <div className="flex items-center justify-between pt-1 px-1">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">
                      {drAndreProfile.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold mt-0.5">
                      {drAndreProfile.crp} &bull; Psicólogo Clínico
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#A68A6B] bg-[#A68A6B]/10 border border-[#A68A6B]/20 px-2.5 py-1 rounded-full">
                    <span>5.0</span>
                    <span className="text-[#A68A6B]">★★★★★</span>
                  </div>
                </div>

                {/* Highlights list with clean Bronze-Gold icons */}
                <div className="space-y-2.5 text-xs text-slate-700 pt-1 font-medium px-1">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A68A6B] shrink-0" />
                    <span>Especialista em TCC e Gestalt-terapia</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#A68A6B] shrink-0" />
                    <span>Ceilândia &amp; Sudoeste (Brasília) + Online</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#A68A6B] shrink-0" />
                    <span>Credenciado e-PSI &amp; Sigilo Profissional</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => onNavigate('about-doctor')}
                    className="w-full py-3 rounded-2xl bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] font-bold text-xs transition-all cursor-pointer text-center flex items-center justify-center gap-2 border border-[#E0E0E0] shadow-xs hover:border-[#A68A6B]"
                  >
                    <span>Conhecer Trajetória &amp; Metodologia</span>
                    <ArrowRight className="w-4 h-4 text-[#A68A6B]" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Clinical Tools Banner Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#A68A6B] bg-[#A68A6B]/10 px-3.5 py-1 rounded-full border border-[#A68A6B]/20 mb-2">
                <Wrench className="w-3.5 h-3.5 text-[#A68A6B]" />
                Autoavaliação Clínica &amp; Triagem
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Ferramentas Interativas de Rastreio</h2>
              <p className="text-slate-600 text-xs md:text-sm mt-1">
                Instrumentos psicométricos validados para compreensão inicial dos sintomas.
              </p>
            </div>
            <button
              onClick={() => onNavigate('tools')}
              className="text-xs font-bold text-[#A68A6B] hover:text-[#8F7356] inline-flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors bg-[#FAF8F5] hover:bg-[#F5F2EC] px-4 py-2.5 rounded-xl border border-[#E8E2D9]"
            >
              <span>Ver todas as ferramentas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tool 1: GAD-7 */}
            <div 
              onClick={() => onNavigate('tools', 'gad7')}
              className="bg-[#FAF8F5] hover:bg-white border border-[#E8E2D9] hover:border-[#A68A6B] rounded-2xl p-5 cursor-pointer transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-[#A68A6B]/10 text-[#A68A6B] border border-[#A68A6B]/20 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#A68A6B] bg-[#A68A6B]/10 border border-[#A68A6B]/20 px-2 py-0.5 rounded-full">
                    GAD-7
                  </span>
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-base mb-1 group-hover:text-[#A68A6B] transition-colors">
                  Teste de Ansiedade
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avalie o nível de ansiedade e tensão física com base na escala GAD-7.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-bold text-[#A68A6B]">
                <span>Realizar teste</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 2: ASRS-11 */}
            <div 
              onClick={() => onNavigate('tools', 'asrs')}
              className="bg-[#FAF8F5] hover:bg-white border border-[#E8E2D9] hover:border-[#A68A6B] rounded-2xl p-5 cursor-pointer transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-[#A68A6B]/10 text-[#A68A6B] border border-[#A68A6B]/20 group-hover:scale-110 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#A68A6B] bg-[#A68A6B]/10 border border-[#A68A6B]/20 px-2 py-0.5 rounded-full">
                    ASRS-v1.1
                  </span>
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-base mb-1 group-hover:text-[#A68A6B] transition-colors">
                  Rastreio TDAH Adulto
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identifique sinais de desatenção, hiperatividade e impulso.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-bold text-[#A68A6B]">
                <span>Realizar teste</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 3: Burnout */}
            <div 
              onClick={() => onNavigate('tools', 'burnout')}
              className="bg-[#FAF8F5] hover:bg-white border border-[#E8E2D9] hover:border-[#A68A6B] rounded-2xl p-5 cursor-pointer transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-[#A68A6B]/10 text-[#A68A6B] border border-[#A68A6B]/20 group-hover:scale-110 transition-transform">
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#A68A6B] bg-[#A68A6B]/10 border border-[#A68A6B]/20 px-2 py-0.5 rounded-full">
                    Maslach MBI
                  </span>
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-base mb-1 group-hover:text-[#A68A6B] transition-colors">
                  Escala de Burnout
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mapeie o esgotamento profissional e exaustão emocional.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-bold text-[#A68A6B]">
                <span>Realizar teste</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 4: Gottman Casal */}
            <div 
              onClick={() => onNavigate('tools', 'gottman')}
              className="bg-[#FAF8F5] hover:bg-white border border-[#E8E2D9] hover:border-[#A68A6B] rounded-2xl p-5 cursor-pointer transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-[#A68A6B]/10 text-[#A68A6B] border border-[#A68A6B]/20 group-hover:scale-110 transition-transform">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#A68A6B] bg-[#A68A6B]/10 border border-[#A68A6B]/20 px-2 py-0.5 rounded-full">
                    Gottman TCC
                  </span>
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-base mb-1 group-hover:text-[#A68A6B] transition-colors">
                  Saúde do Relacionamento
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Análise da comunicação e pontos de afinidade a dois.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-bold text-[#A68A6B]">
                <span>Realizar teste</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A68A6B] bg-[#A68A6B]/10 px-3.5 py-1 rounded-full border border-[#A68A6B]/20 inline-block">
            Áreas de Atuação &amp; Conhecimento
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A]">Explore por Categoria</h2>
          <p className="text-xs md:text-sm text-slate-600">
            Navegue por tópicos estruturados em linguagem clara e embasamento técnico.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('category', cat.id)}
              className="bg-white hover:bg-[#FAF8F5] border border-[#E8E2D9] hover:border-[#A68A6B]/50 rounded-3xl p-6 cursor-pointer transition-all duration-300 group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#A68A6B]/10 text-[#A68A6B] border border-[#A68A6B]/20 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    {cat.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[11px] font-bold text-[#A68A6B] bg-[#A68A6B]/10 border border-[#A68A6B]/20 px-3 py-1 rounded-full">
                    {cat.articlesCount} guias
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#A68A6B] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-bold text-[#A68A6B]">
                <span>Ver conteúdos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A68A6B] bg-[#A68A6B]/10 px-3 py-1 rounded-full border border-[#A68A6B]/20 mb-2 inline-block">
              Leitura Acolhedora &amp; Informação Segura
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Guias Baseados em Evidências</h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
              Conteúdo prático e humanizado para ajudar você e sua família a compreender a saúde mental com clareza.
            </p>
          </div>
          <button
            onClick={() => onNavigate('science')}
            className="text-xs font-bold text-[#A68A6B] hover:text-[#8F7356] inline-flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors bg-white hover:bg-[#FAF8F5] px-4 py-2.5 rounded-xl border border-[#E8E2D9]"
          >
            <span>Explorar todos os guias</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesData.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-[#E8E2D9] hover:border-[#A68A6B]/50 rounded-3xl p-5 md:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Featured Image */}
                {art.imageUrl && (
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-5 border border-[#E8E2D9] bg-[#FAF8F5]">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 text-[#A68A6B] text-[10px] font-bold px-3 py-1 rounded-full border border-[#E8E2D9] shadow-xs">
                      {art.subcategory || art.categoryId}
                    </div>
                  </div>
                )}

                {/* Meta info header */}
                <div className="flex items-center justify-between mb-3 text-xs font-medium">
                  {!art.imageUrl && (
                    <span className="inline-flex items-center gap-1.5 text-[#A68A6B] font-semibold bg-[#A68A6B]/10 border border-[#A68A6B]/20 px-2.5 py-0.5 rounded-full text-[11px]">
                      {art.subcategory}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-slate-500 text-[11px] ml-auto">
                    <Clock className="w-3.5 h-3.5 text-[#A68A6B]" />
                    {art.readingTimeMinutes} min de leitura
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 leading-snug group-hover:text-[#A68A6B] transition-colors">
                  {art.title}
                </h3>

                {/* Summary */}
                <p className="text-slate-600 text-xs leading-relaxed mb-5">
                  {art.summary}
                </p>
              </div>

              {/* Reviewer & CTA Footer */}
              <div className="pt-4 border-t border-[#E8E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[11px] text-slate-600 leading-tight">
                  <span className="font-semibold text-slate-800 block">Conteúdo revisado por {art.author}</span>
                  <span className="text-[#A68A6B] text-[10px]">Psicólogo Clínico &bull; {art.crp}</span>
                </div>

                <button
                  onClick={() => onNavigate('article', art.id)}
                  className="px-4 py-2.5 rounded-full bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <span>Ler guia</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Social Proof & Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#A68A6B] bg-[#A68A6B]/10 px-3.5 py-1 rounded-full border border-[#A68A6B]/30">
              <span className="text-[#A68A6B]">5.0 ★★★★★</span> • Avaliações Verificadas
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
              Acolhimento, Sigilo e Evolução Terapêutica
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              Relatos anônimos de pacientes atendidos em Brasília (Ceilândia e Sudoeste) e na modalidade Online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#A68A6B] text-xs">
                  ★★★★★
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed italic">
                  &ldquo;O acolhimento do Dr. André desde a primeira sessão me passou total segurança. A abordagem por TCC me deu ferramentas práticas e comprovadas para lidar com crises de ansiedade no dia a dia.&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-800">Paciente Anônimo</span>
                <span className="text-[#A68A6B] font-medium">Sudoeste, DF</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#A68A6B] text-xs">
                  ★★★★★
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed italic">
                  &ldquo;Ambiente extremamente sigiloso, acolhedor e profissional. O processo de investigação de TDAH em adultos me trouxe respostas claras e organizou minha rotina de trabalho.&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-800">Paciente Anônimo</span>
                <span className="text-[#A68A6B] font-medium">Ceilândia, DF</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#A68A6B] text-xs">
                  ★★★★★
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed italic">
                  &ldquo;A psicoterapia online superou todas as minhas expectativas. Escuta empática, técnicas objetivas e excelente acompanhamento contínuo. Recomendo fortemente.&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-800">Paciente Anônimo</span>
                <span className="text-[#A68A6B] font-medium">Atendimento Online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured SEO Schema Org View */}
      <SchemaOrgViewer pageType="home" />
    </div>
  );
};
