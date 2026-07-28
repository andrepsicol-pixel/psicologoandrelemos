import React from 'react';
import { MessageSquare, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { drAndreProfile } from '../../data/authorData';

interface CroResultCardProps {
  testName: string;
  scoreText: string;
  levelText: string;
  onOpenConsultationModal?: (notes?: string) => void;
}

export const CroResultCard: React.FC<CroResultCardProps> = ({
  testName,
  scoreText,
  levelText,
  onOpenConsultationModal,
}) => {
  const prefilledMessage = `Olá, Dr. André! Realizei o teste de ${testName} no seu portal e obtive o seguinte resultado: ${scoreText} (${levelText}). Gostaria de agendar uma consulta de triagem/avaliação.`;
  const whatsappUrl = `https://wa.me/${drAndreProfile.whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/80 border border-emerald-500/40 shadow-xl shadow-black/50 text-slate-100 relative overflow-hidden">
      {/* Decorative emerald glow aura */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-4">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Acompanhamento Profissional Individualizado</span>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
            Deseja discutir esse resultado com um especialista?
          </h3>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
            Envie sua pontuação diretamente para o Dr. André no WhatsApp e agende uma sessão de triagem para receber orientação clínica personalizada em Brasília ou Online.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/60 group cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>Enviar Pontuação via WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
          </a>

          {onOpenConsultationModal && (
            <button
              type="button"
              onClick={() => onOpenConsultationModal(`${testName}: ${scoreText} (${levelText})`)}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Agendar no Portal</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
