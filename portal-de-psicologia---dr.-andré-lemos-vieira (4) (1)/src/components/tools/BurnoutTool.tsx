import React, { useState } from 'react';
import { Flame, RotateCcw, ArrowRight, ShieldAlert } from 'lucide-react';
import { CroResultCard } from './CroResultCard';

interface BurnoutToolProps {
  onOpenConsultationModal: (msg?: string) => void;
}

const questions = [
  "Sinto-me emocionalmente exausto(a) devido ao meu trabalho.",
  "Sinto-me esgotado(a) no final de uma jornada de trabalho.",
  "Sinto-me cansado(a) quando me levanto pela manhã e tenho de encarar outro dia de trabalho.",
  "Sinto que estou me tornando mais insensível e frio(a) com as pessoas no trabalho.",
  "Preocupo-me com o fato de este trabalho estar me endurecendo emocionalmente.",
  "Tenho a sensação de que não consigo alcançar realizações marcantes na minha atividade profissional."
];

export const BurnoutTool: React.FC<BurnoutToolProps> = ({ onOpenConsultationModal }) => {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { label: "Nunca", pts: 0 },
    { label: "Raramente", pts: 1 },
    { label: "Às vezes", pts: 2 },
    { label: "Frequentemente", pts: 3 },
    { label: "Sempre", pts: 4 }
  ];

  const handleSelect = (idx: number, pts: number) => {
    const updated = [...answers];
    updated[idx] = pts;
    setAnswers(updated);
  };

  const isComplete = answers.every(v => v !== -1);
  const totalScore = answers.reduce((a, b) => a + (b !== -1 ? b : 0), 0);

  const getResult = () => {
    if (totalScore <= 7) return { text: "Baixo Risco de Burnout", color: "bg-emerald-100 text-emerald-900 border-emerald-300", desc: "Seus níveis de exaustão ocupacional estão dentro da faixa saudável." };
    if (totalScore <= 15) return { text: "Risco Moderado de Burnout", color: "bg-amber-100 text-amber-900 border-amber-300", desc: "Indícios de estresse ocupacional acumulado. Atenção aos limites de jornada e pausas." };
    return { text: "Alto Risco / Indicativos de Burnout (CID-11 QD85)", color: "bg-rose-100 text-rose-900 border-rose-300", desc: "Sua pontuação sugere esgotamento profissional acentuado. Recomenda-se psicoterapia imediata." };
  };

  const res = getResult();

  return (
    <div id="burnout-tool-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 mb-2">
          MBI Adaptado - Estresse Ocupacional
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Teste de Rastreio de Síndrome de Burnout</h2>
        <p className="text-slate-600 text-sm mt-1">
          Avaliação baseada nas 3 dimensões do Maslach Burnout Inventory (Exaustão, Despersonalização e Ineficácia).
        </p>
      </div>

      {!submitted ? (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-medium text-slate-800 text-sm mb-3">{idx + 1}. {q}</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5">
                {options.map((opt) => (
                  <button
                    key={opt.pts}
                    type="button"
                    onClick={() => handleSelect(idx, opt.pts)}
                    className={`px-2 py-2 text-xs rounded-lg border font-medium text-center ${
                      answers[idx] === opt.pts ? 'bg-rose-600 text-white border-rose-600 font-bold' : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              disabled={!isComplete}
              onClick={() => setSubmitted(true)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                isComplete ? 'bg-rose-700 hover:bg-rose-800 text-white shadow-md cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Ver Rastreio de Burnout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in text-center">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <Flame className="w-10 h-10 text-rose-600 mx-auto mb-2" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pontuação do Rastreio</span>
            <div className="text-5xl font-extrabold text-slate-900 my-2">
              {totalScore} <span className="text-xl font-normal text-slate-500">/ 24</span>
            </div>
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${res.color}`}>
              {res.text}
            </div>
            <p className="text-slate-700 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {res.desc}
            </p>
          </div>

          {/* CRO Conversion Card */}
          <CroResultCard
            testName="Síndrome de Burnout (Maslach)"
            scoreText={`${totalScore}/24`}
            levelText={res.text}
            onOpenConsultationModal={onOpenConsultationModal}
          />

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-medium cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Refazer teste
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
