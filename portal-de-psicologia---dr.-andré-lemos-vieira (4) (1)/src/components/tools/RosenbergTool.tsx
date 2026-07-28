import React, { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

interface RosenbergToolProps {
  onOpenConsultationModal: (msg?: string) => void;
}

const questions = [
  "Sinto que sou uma pessoa de valor, pelo menos tanto quanto as outras pessoas.",
  "Sinto que tenho várias qualidades positivas.",
  "Em geral, inclino-me a sentir que sou um fracasso.",
  "Sou capaz de fazer as coisas tão bem quanto a maioria das outras pessoas.",
  "Sinto que não tenho muito do que me orgulhar.",
  "Tomo uma atitude positiva em relação a mim mesmo(a).",
  "No geral, estou satisfeito(a) comigo mesmo(a).",
  "Gostaria de ter mais respeito por mim mesmo(a).",
  "Às vezes me sinto inútil.",
  "Às vezes acho que não sirvo para nada."
];

// Questions index 2, 4, 7, 8, 9 are reverse scored!
const reverseScoredIndices = [2, 4, 7, 8, 9];

export const RosenbergTool: React.FC<RosenbergToolProps> = ({ onOpenConsultationModal }) => {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { label: "Discordo totalmente", rawPoints: 0 },
    { label: "Discordo", rawPoints: 1 },
    { label: "Concordo", rawPoints: 2 },
    { label: "Concordo totalmente", rawPoints: 3 }
  ];

  const handleSelect = (idx: number, pts: number) => {
    const updated = [...answers];
    updated[idx] = pts;
    setAnswers(updated);
  };

  const isComplete = answers.every(v => v !== -1);

  const calculateScore = () => {
    return answers.reduce((acc, curr, idx) => {
      if (curr === -1) return acc;
      if (reverseScoredIndices.includes(idx)) {
        return acc + (3 - curr);
      }
      return acc + curr;
    }, 0);
  };

  const totalScore = calculateScore();

  const getLevel = () => {
    if (totalScore < 15) return { text: "Autoestima Baixa", color: "bg-rose-100 text-rose-900 border-rose-300", desc: "Sua pontuação aponta para percepção de desvalor próprio. A TCC e a Gestalt ajudam na desconstrução do diálogo crítico interno." };
    if (totalScore <= 25) return { text: "Autoestima Satisfatória / Média", color: "bg-emerald-100 text-emerald-900 border-emerald-300", desc: "Você demonstra uma percepção equilibrada sobre seus recursos e limitações." };
    return { text: "Autoestima Elevada", color: "bg-sky-100 text-sky-900 border-sky-300", desc: "Sua pontuação indica autoaceitação consistente e forte senso de valor próprio." };
  };

  const levelInfo = getLevel();

  return (
    <div id="rosenberg-tool-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-800 border border-violet-200 mb-2">
          Escala Científica de Rosenberg
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Escala de Autoestima de Rosenberg</h2>
        <p className="text-slate-600 text-sm mt-1">
          A escala de Rosenberg é o instrumento psicológico mais validado mundialmente para mensurar a autoaceitação.
        </p>
      </div>

      {!submitted ? (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-medium text-slate-800 text-sm md:text-base mb-3">
                {idx + 1}. {q}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {options.map((opt) => {
                  const isSelected = answers[idx] === opt.rawPoints;
                  return (
                    <button
                      key={opt.rawPoints}
                      type="button"
                      onClick={() => handleSelect(idx, opt.rawPoints)}
                      className={`px-3 py-2 text-xs md:text-sm rounded-lg border font-medium text-center ${
                        isSelected
                          ? 'bg-violet-600 text-white border-violet-600 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-violet-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              disabled={!isComplete}
              onClick={() => setSubmitted(true)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                isComplete ? 'bg-violet-700 hover:bg-violet-800 text-white shadow-md cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Calcular Autoestima <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in text-center">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <Sparkles className="w-10 h-10 text-violet-600 mx-auto mb-2" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pontuação de Rosenberg</span>
            <div className="text-5xl font-extrabold text-slate-900 my-2">
              {totalScore} <span className="text-xl font-normal text-slate-500">/ 30</span>
            </div>
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${levelInfo.color}`}>
              {levelInfo.text}
            </div>
            <p className="text-slate-700 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {levelInfo.desc}
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenConsultationModal(`Resultado Autoestima de Rosenberg: ${totalScore}/30 (${levelInfo.text})`)}
              className="px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-sm cursor-pointer shadow-xs"
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
