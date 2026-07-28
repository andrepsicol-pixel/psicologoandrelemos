import React from 'react';
import { drAndreProfile } from '../../data/authorData';
import { ViewMode } from '../../types/portal';
import { categoriesData } from '../../data/categoriesData';
import { Brain, MapPin, Phone, ShieldCheck, HeartHandshake, ExternalLink, Calendar } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode, param?: string) => void;
  onOpenConsultationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultationModal }) => {
  return (
    <footer className="bg-[#1A1A1A] text-slate-300 border-t border-[#A68A6B]/20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Emergency Crisis Helpline Banner */}
        <div className="mb-10 p-5 rounded-3xl bg-[#2A221B] border border-[#A68A6B]/30 text-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-[#A68A6B] shrink-0" />
            <div>
              <strong className="text-base font-bold text-white block">Está passando por uma crise emocional ou ideação de suicídio?</strong>
              <p className="text-xs text-slate-300 mt-0.5">
                Ligue gratuitamente para o <strong>CVV (188)</strong> — Atendimento confidencial, humano e 24 horas por dia em todo o Brasil. Em emergências graves, contate o SAMU (192) ou o pronto-socorro mais próximo.
              </p>
            </div>
          </div>
          <a
            href="tel:188"
            className="px-5 py-2.5 rounded-full bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-xs shrink-0 shadow-xs transition-colors"
          >
            Ligar para 188
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Author & Clinic Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#A68A6B] text-white flex items-center justify-center font-bold shadow-xs">
                <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center font-serif italic text-white text-xs font-bold">
                  ψ
                </div>
              </div>
              <span className="font-extrabold text-white text-base">André Lemos Vieira</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Psicólogo Clínico ({drAndreProfile.crp}). Especialista Clínico pelo CEGEST e formado pela UNIP em 2008. Integra TCC e Gestalt-Terapia para crianças, adolescentes, adultos e idosos.
            </p>
            <div className="text-xs text-slate-300 space-y-1">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#A68A6B] shrink-0 mt-0.5" />
                <span>Ceilândia & Sudoeste (Brasília/DF) e Atendimento Online</span>
              </p>
            </div>
          </div>

          {/* Col 2: SILO Categories */}
          <div>
            <h4 className="text-xs font-bold text-[#A68A6B] uppercase tracking-widest mb-3">Categorias Clínicas</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {categoriesData.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('category', cat.id)}
                    className="hover:text-[#A68A6B] transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Clinical Tools & Services */}
          <div>
            <h4 className="text-xs font-bold text-[#A68A6B] uppercase tracking-widest mb-3">Ferramentas & Recursos</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-[#A68A6B] cursor-pointer transition-colors">
                  Central de Testes Interativos (GAD-7, PHQ-9, ASRS)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('glossary')} className="hover:text-[#A68A6B] cursor-pointer transition-colors">
                  Glossário de Psicologia (+500 termos)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cases')} className="hover:text-[#A68A6B] cursor-pointer transition-colors">
                  Biblioteca de Casos Clínicos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('science')} className="hover:text-[#A68A6B] cursor-pointer transition-colors">
                  Pesquisas Traduzidas (DSM-5-TR e CID-11)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('library')} className="hover:text-[#A68A6B] cursor-pointer transition-colors">
                  Biblioteca Digital (PDFs & Mídia)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('patient-portal')} className="hover:text-[#A68A6B] cursor-pointer font-bold text-[#A68A6B] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A68A6B]"></span>
                  Acesso do Paciente
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('newsletter')} className="hover:text-[#A68A6B] cursor-pointer transition-colors">
                  Assinar Newsletter TCC
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sitemap')} className="hover:text-[#A68A6B] cursor-pointer transition-colors font-medium flex items-center gap-1">
                  <span>Mapa do Site (Sitemap)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Consultation & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#A68A6B] uppercase tracking-widest mb-3">Atendimento Clínico</h4>
            <p className="text-xs text-slate-300">
              Agende sua sessão de psicoterapia individual ou de casal em Brasília/DF ou via videochamada.
            </p>
            <button
              onClick={onOpenConsultationModal}
              className="w-full py-2.5 rounded-full bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Solicitar Agendamento
            </button>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-300 space-y-1">
              <span className="font-semibold text-white block flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A68A6B]" /> Registro Profissional Ativo
              </span>
              <span>Conselho Regional de Psicologia do DF - CRP 01/14042</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-white/10 text-center text-slate-400 text-[11px] space-y-2">
          <p>
            &copy; {new Date().getFullYear()} Site Oficial do Psicólogo André Lemos Vieira (CRP 01/14042). Todos os direitos reservados.
          </p>
          <p className="max-w-4xl mx-auto leading-relaxed">
            As informações contidas neste portal possuem caráter estritamente educativo, informativo e psicoeducacional. Nenhuma publicação ou ferramenta de autoavaliação substitui o diagnóstico, aconselhamento ou tratamento psicológico/médico fornecido por um profissional habilitado. Este site segue integralmente o Código de Ética Profissional do Psicólogo (Resolução CFP nº 010/05).
          </p>
        </div>
      </div>
    </footer>
  );
};
