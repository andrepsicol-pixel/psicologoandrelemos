import React, { useState } from 'react';
import { drAndreProfile } from '../../data/authorData';
import { useDoctorPhoto } from '../../hooks/useDoctorPhoto';
import { X, Calendar, MapPin, Video, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefilledNotes = ''
}) => {
  const { photoUrl } = useDoctorPhoto();
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [modality, setModality] = useState<'online' | 'ceilandia' | 'sudoeste'>('online');
  const [period, setPeriod] = useState('Manhã');
  const [complaint, setComplaint] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let modalityText = 'Online (Videochamada para todo o Brasil)';
    if (modality === 'ceilandia') modalityText = 'Presencial em Ceilândia (Brasília/DF)';
    if (modality === 'sudoeste') modalityText = 'Presencial no Sudoeste (Brasília/DF)';

    const formattedMessage = `Olá, André Lemos Vieira! Gostaria de agendar uma consulta psicológica.

*Dados do Solicitante:*
- *Nome:* ${patientName || 'Não informado'}
- *Telefone:* ${patientPhone || 'Não informado'}
- *Modalidade / Local:* ${modalityText}
- *Período Preferencial:* ${period}
- *Principais Queixas / Objetivos:* ${complaint || 'Não especificado'}
${prefilledNotes ? `\n*Resultados de Teste/Rastreio:* ${prefilledNotes}` : ''}`;

    const whatsappUrl = `https://wa.me/${drAndreProfile.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E8E2D9] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1A1A1A] text-white p-6 relative shrink-0 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <img
              src={photoUrl}
              alt={drAndreProfile.name}
              onError={(e) => {
                if (!e.currentTarget.src.endsWith('/dr-andre.png')) {
                  e.currentTarget.src = '/dr-andre.png';
                }
              }}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#A68A6B] shadow-md shrink-0"
            />
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#A68A6B]/20 text-[#A68A6B] border border-[#A68A6B]/30 mb-1">
                Agendamento de Consulta Psicológica
              </span>
              <h3 className="text-lg font-extrabold text-white leading-tight">Atendimento com Dr. André Lemos Vieira</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {drAndreProfile.crp} &bull; TCC e Gestalt-terapia &bull; Brasília e Online
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto bg-[#FAF8F5]">
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">
              Seu Nome Completo
            </label>
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full p-3 rounded-2xl bg-white border border-[#E8E2D9] text-sm focus:ring-2 focus:ring-[#A68A6B] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">
              Telefone / WhatsApp para Contato
            </label>
            <input
              type="tel"
              required
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              placeholder="(61) 99255-8044"
              className="w-full p-3 rounded-2xl bg-white border border-[#E8E2D9] text-sm focus:ring-2 focus:ring-[#A68A6B] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-2">
              Modalidade de Atendimento Desejada
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setModality('online')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                  modality === 'online'
                    ? 'bg-[#A68A6B]/15 border-[#A68A6B] text-[#1A1A1A] font-bold'
                    : 'bg-white border-[#E8E2D9] text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Video className="w-4 h-4 text-[#A68A6B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs block">Online</span>
                  <span className="text-[10px] text-slate-500 font-normal">Todo o Brasil</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModality('ceilandia')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                  modality === 'ceilandia'
                    ? 'bg-[#A68A6B]/15 border-[#A68A6B] text-[#1A1A1A] font-bold'
                    : 'bg-white border-[#E8E2D9] text-slate-700 hover:bg-slate-50'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#A68A6B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs block">Ceilândia</span>
                  <span className="text-[10px] text-slate-500 font-normal">Brasília/DF</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModality('sudoeste')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                  modality === 'sudoeste'
                    ? 'bg-[#A68A6B]/15 border-[#A68A6B] text-[#1A1A1A] font-bold'
                    : 'bg-white border-[#E8E2D9] text-slate-700 hover:bg-slate-50'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#A68A6B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs block">Sudoeste</span>
                  <span className="text-[10px] text-slate-500 font-normal">Brasília/DF</span>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">
              Período Preferencial
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full p-3 rounded-2xl border border-[#E8E2D9] text-sm bg-white"
            >
              <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
              <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
              <option value="Noite (18h às 21h)">Noite (18h às 21h)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">
              Principais Sintomas ou Motivo da Busca (Opcional)
            </label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Ex: Ansiedade no trabalho, insônia, questões de relacionamento..."
              className="w-full p-3 rounded-2xl border border-[#E8E2D9] text-sm min-h-[70px] bg-white focus:ring-2 focus:ring-[#A68A6B] focus:outline-hidden"
            />
          </div>

          {prefilledNotes && (
            <div className="p-3.5 rounded-2xl bg-[#A68A6B]/10 border border-[#A68A6B]/30 text-xs text-[#1A1A1A]">
              <strong>Resultado de Teste Anexado:</strong> {prefilledNotes}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <MessageSquare className="w-4 h-4" /> Enviar Solicitação via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
