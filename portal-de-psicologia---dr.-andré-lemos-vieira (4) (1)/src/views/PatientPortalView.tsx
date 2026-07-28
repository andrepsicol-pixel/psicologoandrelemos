import React from 'react';
import {
  ShieldCheck,
  Video,
  MessageSquare,
  Lock,
  CheckCircle2,
  Calendar,
  FileText,
  UserCheck
} from 'lucide-react';

export interface PatientPortalViewProps {
  onNavigate: (view: any, param?: string) => void;
}

export const PatientPortalView: React.FC<PatientPortalViewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FAF8F5] min-h-[80vh] py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn">
        {/* Header Badge & Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A68A6B]/10 border border-[#A68A6B]/30 text-[#A68A6B] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#A68A6B]" />
            <span>Ambiente Clínico Criptografado &amp; Sigiloso</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight leading-tight">
            Acesso do Paciente
          </h1>

          <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
            O acompanhamento psicológico e o acesso às sessões de teleconsulta são realizados em ambiente digital totalmente seguro, com criptografia de ponta a ponta e em conformidade rigorosa com o Código de Ética Profissional, o e-PSI e a Lei Geral de Proteção de Dados (LGPD).
          </p>
        </div>

        {/* Informative Pillars / Security Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A68A6B]/10 border border-[#A68A6B]/20 text-[#A68A6B] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1A1A1A]">Sigilo Absoluto</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Proteção de dados sigilosos e relatórios sob estrita confidencialidade profissional do CRP 01/14042.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A68A6B]/10 border border-[#A68A6B]/20 text-[#A68A6B] flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1A1A1A]">Sala Homologada</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Sessões online transmitidas por canal direto de vídeo em alta definição com encriptação dedicada.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A68A6B]/10 border border-[#A68A6B]/20 text-[#A68A6B] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1A1A1A]">Acolhimento Direto</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Comunicação direta para agendamentos, confirmações de horário, recibos e orientações clínicas.
            </p>
          </div>
        </div>

        {/* Primary Action Buttons Container */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#E0E0E0] shadow-sm text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
              Opções de Atendimento e Suporte
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              Escolha uma das opções abaixo para conectar-se ao seu atendimento ou tirar dúvidas de agendamento:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Button 1: Teleconsulta */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('A sala virtual de teleconsulta é disponibilizada no horário agendado de sua sessão.');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-[#A68A6B] hover:bg-[#8F7356] shadow-md shadow-[#A68A6B]/20 transition-all duration-200 flex items-center justify-center gap-3 text-sm md:text-base border border-[#A68A6B] cursor-pointer"
            >
              <Video className="w-5 h-5 text-white shrink-0" />
              <span>Acessar Sala de Teleconsulta</span>
            </a>

            {/* Button 2: WhatsApp */}
            <a
              href="https://wa.me/5561992558044"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-2xl font-bold text-sm md:text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 text-[#1A1A1A] shrink-0" />
              <span>Suporte e Agendamento via WhatsApp</span>
            </a>
          </div>

          <div className="pt-4 border-t border-[#E8E2D9] flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#A68A6B]" />
              André Lemos Vieira — CRP 01/14042
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#A68A6B]" />
              Atendimento em Ceilândia, Sudoeste e Online
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#A68A6B]" />
              Emissão de Recibo para Reembolso
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
