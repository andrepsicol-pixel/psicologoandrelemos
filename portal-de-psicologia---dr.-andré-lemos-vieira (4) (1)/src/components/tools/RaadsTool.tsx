import React, { useState } from 'react';
import { BrainCircuit, RotateCcw, ArrowRight } from 'lucide-react';
import { drAndreProfile } from '../../data/authorData';

interface RaadsToolProps {
  onOpenConsultationModal: (msg?: string) => void;
}

const questions = [
  "Acho mais fácil interagir com pessoas se elas compartilharem dos meus mesmos interesses específicos.",
  "Muitas vezes percebo que as pessoas acham minhas reações sociais estranhas ou diretas demais.",
  "Tenho hipersensibilidade a certos sons, texturas de roupas ou luzes fortes.",
  "Sinto profunda exaustão após participar de eventos sociais longos (necessidade de isolamento para recarregar).",
  "Percebo detalhes minuciosos e padrões no ambiente que outras pessoas costumam ignorar.",
  "Tenho dificuldade intuitiva para entender piadas com sarcasmo ou duplos sentidos implícitos."
];

export const RaadsTool: React.FC<RaadsToolProps> = ({ onOpenConsultationModal }) => {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { label: "Verdadeiro agora e quando criança", pts: 3 },
    { label: "Verdadeiro apenas agora", pts: 2 },
    { label: "Verdadeiro apenas quando criança", pts: 1 },
    { label: "Nunca verdadeiro", pts: 0 }
  ];

  const handleSelect = (idx: number, pts: number) => {
    const updated = [...answers];
    updated[idx] = pts;
    setAnswers(updated);
  };

  const isComplete = answers.every(v => v !== -1);
  const totalScore = answers.reduce((a, b) => a + (b !== -1 ? b : 0), 0);

  const isPositive = totalScore >= 9;

  return (
    <div id="raads-tool-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
          Triagem de Autismo no Adulto (AQ-10 / RAADS Adaptado)
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Rastreio de Traços do Espectro Autista no Adulto</h2>
        <p className="text-slate-600 text-sm mt-1">
          Investigação de traços neurodivergentes de sociabilidade, sobrecarga sensorial e interesses profundos.
        </p>
      </div>

      {!submitted ? (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-medium text-slate-800 text-sm mb-3">{idx + 1}. {q}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {options.map((opt) => (
                  <button
                    key={opt.pts}
                    type="button"
                    onClick={() => handleSelect(idx, opt.pts)}
                    className={`px-3 py-2 text-xs rounded-lg border font-medium text-left ${
                      answers[idx] === opt.pts ? 'bg-teal-700 text-white border-teal-700 font-bold' : 'bg-white text-slate-700 border-slate-200 hover:bg-teal-50'
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
                isComplete ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-md cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Ver Rastreio Neurodivergente <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in text-center">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <BrainCircuit className="w-10 h-10 text-teal-600 mx-auto mb-2" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pontuação do Rastreio</span>
            <div className="text-5xl font-extrabold text-slate-900 my-2">
              {totalScore} <span className="text-xl font-normal text-slate-500">/ 18</span>
            </div>
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${isPositive ? 'bg-teal-100 text-teal-900 border-teal-300' : 'bg-slate-100 text-slate-800 border-slate-300'}`}>
              {isPositive ? "Rastreio com Características do Espectro Autista" : "Sem Indicativos Significativos de TEA"}
            </div>
            <p className="text-slate-700 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {isPositive
                ? "Sua pontuação aponta presença significativa de características neurodivergentes comuns no TEA no adulto. Uma avaliação diagnóstica compreensiva é recomendada."
                : "Pontuação abaixo do limiar indicativo típico de TEA."
              }
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenConsultationModal(`Resultado Rastreio TEA Adulto: ${totalScore}/18`)}
              className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm cursor-pointer shadow-xs"
            >
              Agendar Avaliação com Dr. André
            </button>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-4 py-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 text-sm cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Refazer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
