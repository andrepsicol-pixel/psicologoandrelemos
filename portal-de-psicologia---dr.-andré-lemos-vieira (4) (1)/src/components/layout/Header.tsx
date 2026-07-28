import React, { useState, useEffect } from 'react';
import { ViewMode } from '../../types/portal';
import { drAndreProfile } from '../../data/authorData';
import { useDoctorPhoto } from '../../hooks/useDoctorPhoto';
import { categoriesData } from '../../data/categoriesData';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
import { 
  Brain, 
  MapPin, 
  Phone, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Wrench, 
  BookOpen, 
  FileText, 
  Microscope, 
  Bot, 
  Calendar,
  Compass,
  Award
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, param?: string) => void;
  onOpenConsultationModal: () => void;
  onSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenConsultationModal,
  onSearchQuery
}) => {
  const { photoUrl } = useDoctorPhoto();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [headerImgError, setHeaderImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E8E2D9] shadow-sm">
      {/* Top Credentials & Status Bar */}
      <div className="bg-[#1A1A1A] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[#A68A6B] font-medium text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A68A6B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A68A6B]"></span>
              </span>
              <span>Consultório Ativo &bull; Ceilândia, Sudoeste (Brasília) &amp; Online</span>
            </div>

            <span className="hidden md:inline text-slate-600">|</span>

            <span className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Award className="w-3.5 h-3.5 text-[#A68A6B]" />
              {drAndreProfile.name} &bull; {drAndreProfile.crp}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#A68A6B] font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#A68A6B]" />
              CVV Crise: 188 (24h)
            </span>
            <button
              onClick={() => onNavigate('about-doctor')}
              className="text-slate-300 hover:text-white underline cursor-pointer transition-colors"
            >
              Ver Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="relative shrink-0">
            {!headerImgError ? (
              <img
                src={photoUrl || '/dr-andre.jpg'}
                alt={drAndreProfile.name}
                onError={() => setHeaderImgError(true)}
                className="relative w-10 h-10 rounded-full object-cover object-top border-2 border-[#A68A6B]/50 shadow-xs group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border-2 border-[#A68A6B]/50 shadow-xs flex items-center justify-center text-[#A68A6B] font-extrabold text-xs tracking-wider group-hover:scale-105 transition-transform">
                AV
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#A68A6B] text-white rounded-full flex items-center justify-center text-[10px] font-bold border border-white shadow-xs">
              ψ
            </div>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#1A1A1A] leading-none group-hover:text-[#A68A6B] transition-colors">
              {drAndreProfile.name}
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#A68A6B] font-semibold mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A68A6B]"></span>
              {drAndreProfile.crp} &bull; Psicologia Clínica
            </p>
          </div>
        </button>

        {/* Global Search Bar (Trigger Modal) */}
        <button
          onClick={() => setSearchModalOpen(true)}
          className="hidden lg:flex items-center justify-between flex-1 max-w-xs mx-4 px-3.5 py-2 rounded-2xl border border-[#E8E2D9] bg-white text-xs text-slate-600 hover:border-[#A68A6B] transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#A68A6B]" />
            <span className="text-slate-600">Pesquisar guias, testes, FAQ...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-slate-200 text-[10px] font-mono text-slate-500">⌘K</kbd>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-[#1A1A1A]">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              currentView === 'home' 
                ? 'text-[#A68A6B] bg-[#A68A6B]/10 font-bold border border-[#A68A6B]/30 shadow-xs' 
                : 'hover:bg-slate-100 hover:text-[#A68A6B]'
            }`}
          >
            Início
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                currentView === 'category' 
                  ? 'text-[#A68A6B] bg-[#A68A6B]/10 font-bold border border-[#A68A6B]/30 shadow-xs' 
                  : 'hover:bg-slate-100 hover:text-[#A68A6B]'
              }`}
            >
              Categorias <ChevronDown className="w-3.5 h-3.5 text-[#A68A6B]" />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl border border-[#E8E2D9] shadow-xl py-3 px-1 z-50 animate-fade-in max-h-96 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#A68A6B] uppercase tracking-widest mb-1">
                  Transtornos &amp; Temas Principais
                </div>
                {categoriesData.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onNavigate('category', cat.id);
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-[#FAF8F5] hover:text-[#A68A6B] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] bg-[#A68A6B]/10 text-[#A68A6B] border border-[#A68A6B]/20 px-2 py-0.5 rounded-full font-bold">
                      {cat.articlesCount}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('tools')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
              currentView === 'tools' 
                ? 'text-[#A68A6B] bg-[#A68A6B]/10 font-bold border border-[#A68A6B]/30 shadow-xs' 
                : 'hover:bg-slate-100 hover:text-[#A68A6B]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-[#A68A6B]" /> Ferramentas
          </button>

          <button
            onClick={() => onNavigate('glossary')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
              currentView === 'glossary' 
                ? 'text-[#A68A6B] bg-[#A68A6B]/10 font-bold border border-[#A68A6B]/30 shadow-xs' 
                : 'hover:bg-slate-100 hover:text-[#A68A6B]'
            }`}
          >
            Glossário
          </button>

          <button
            onClick={() => onNavigate('cases')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
              currentView === 'cases' 
                ? 'text-[#A68A6B] bg-[#A68A6B]/10 font-bold border border-[#A68A6B]/30 shadow-xs' 
                : 'hover:bg-slate-100 hover:text-[#A68A6B]'
            }`}
          >
            Casos Clínicos
          </button>

          <button
            onClick={() => onNavigate('science')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
              currentView === 'science' 
                ? 'text-[#A68A6B] bg-[#A68A6B]/10 font-bold border border-[#A68A6B]/30 shadow-xs' 
                : 'hover:bg-slate-100 hover:text-[#A68A6B]'
            }`}
          >
            Ciência
          </button>

          <button
            onClick={() => onNavigate('library')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
              currentView === 'library' 
                ? 'text-[#A68A6B] bg-[#A68A6B]/10 font-bold border border-[#A68A6B]/30 shadow-xs' 
                : 'hover:bg-slate-100 hover:text-[#A68A6B]'
            }`}
          >
            Biblioteca
          </button>

          <button
            onClick={() => onNavigate('patient-portal')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 font-bold text-[#A68A6B] bg-[#A68A6B]/10 hover:bg-[#A68A6B]/20 border border-[#A68A6B]/40 cursor-pointer shadow-xs`}
          >
            Acesso do Paciente
          </button>
        </nav>

        {/* CTA Button & AI Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('ai-assistant')}
            className="p-2.5 rounded-2xl bg-white border border-[#E8E2D9] text-[#A68A6B] hover:border-[#A68A6B] transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Assistente Virtual de Orientação em Saúde Mental"
          >
            <Bot className="w-4 h-4 text-[#A68A6B] animate-pulse" />
            <span className="hidden sm:inline font-bold">Apoio Psicoeducativo</span>
          </button>

          <button
            onClick={onOpenConsultationModal}
            className="px-5 py-2.5 rounded-full text-xs font-black text-white bg-[#A68A6B] hover:bg-[#8F7356] shadow-md shadow-[#A68A6B]/20 transition-all cursor-pointer flex items-center gap-1.5 border border-[#A68A6B]"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Agendar Consulta</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E8E2D9] px-4 py-4 space-y-3 animate-fade-in shadow-xl">
          <button
            onClick={() => { setSearchModalOpen(true); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-2xl border border-[#E8E2D9] bg-white text-xs text-slate-600 hover:text-[#1A1A1A] shadow-xs cursor-pointer mb-3"
          >
            <Search className="w-4 h-4 text-[#A68A6B]" />
            <span>Buscar tema, artigo, teste (GAD-7)...</span>
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-white border border-[#E8E2D9] text-[#1A1A1A] hover:border-[#A68A6B] text-left cursor-pointer shadow-xs"
            >
              Início
            </button>
            <button
              onClick={() => { onNavigate('tools'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-[#A68A6B] text-white font-bold text-left cursor-pointer shadow-xs"
            >
              Ferramentas Interativas
            </button>
            <button
              onClick={() => { onNavigate('glossary'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-white border border-[#E8E2D9] text-[#1A1A1A] hover:border-[#A68A6B] text-left cursor-pointer shadow-xs"
            >
              Glossário de Psicologia
            </button>
            <button
              onClick={() => { onNavigate('cases'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-white border border-[#E8E2D9] text-[#1A1A1A] hover:border-[#A68A6B] text-left cursor-pointer shadow-xs"
            >
              Casos Clínicos
            </button>
            <button
              onClick={() => { onNavigate('science'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-white border border-[#E8E2D9] text-[#1A1A1A] hover:border-[#A68A6B] text-left cursor-pointer shadow-xs"
            >
              Pesquisas & Evidências
            </button>
            <button
              onClick={() => { onNavigate('faqs'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-white border border-[#E8E2D9] text-[#1A1A1A] hover:border-[#A68A6B] text-left cursor-pointer shadow-xs"
            >
              Perguntas Frequentes
            </button>
            <button
              onClick={() => { onNavigate('library'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-white border border-[#E8E2D9] text-[#1A1A1A] hover:border-[#A68A6B] text-left cursor-pointer shadow-xs"
            >
              Biblioteca Digital
            </button>
            <button
              onClick={() => { onNavigate('newsletter'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-white border border-[#E8E2D9] text-[#1A1A1A] hover:border-[#A68A6B] text-left cursor-pointer shadow-xs"
            >
              Newsletter TCC
            </button>
            <button
              onClick={() => { onNavigate('patient-portal'); setMobileMenuOpen(false); }}
              className="col-span-2 p-3.5 rounded-2xl bg-[#1A1A1A] text-[#A68A6B] font-bold text-left border border-[#A68A6B]/40 cursor-pointer shadow-xs"
            >
              Portal do Paciente (Acesso Seguro)
            </button>
            <button
              onClick={() => { onNavigate('about-doctor'); setMobileMenuOpen(false); }}
              className="col-span-2 p-3 rounded-2xl bg-white border border-[#E8E2D9] text-[#1A1A1A] font-bold text-left cursor-pointer shadow-xs"
            >
              Biografia Dr. André Lemos Vieira
            </button>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
};
