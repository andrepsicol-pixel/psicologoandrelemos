import React, { useState } from 'react';
import { ShieldAlert, RotateCcw, MessageSquare, ArrowRight, Brain } from 'lucide-react';
import { drAndreProfile } from '../../data/authorData';
import { CroResultCard } from './CroResultCard';

interface AsrsToolProps {
  onOpenConsultationModal: (prefilledMsg?: string) => void;
}

const questionsPartA = [
  "Com que frequência você tem dificuldade para concluir os detalhes finais de um projeto, depois que as partes mais difíceis foram feitas?",
  "Com que frequência você tem dificuldade para colocar as coisas em ordem, quando tem que fazer uma tarefa que exige organização?",
  "Com que frequência você tem problemas para lembrar de compromissos ou obrigações?",
  "Quando você tem uma tarefa que exige muito pensamento, com que frequência você evita ou adia o início?",
  "Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado(a) por muito tempo?",
  "Com que frequência você se sente excessivamente ativo(a) e compelido(a) a fazer coisas, como se estivesse movido(a) por um motor?"
];

const options = [
  { label: "Nunca", points: 0 },
  { label: "Raramente", points: 1 },
  { label: "Às vezes", points: 2 },
  { label: "Com frequência", points: 3 },
  { label: "Com muita frequência", points: 4 }
];

export const AsrsTool: React.FC<AsrsToolProps> = ({ onOpenConsultationModal }) => {
  const [answers, setAnswers] = useState<number[]>(Array(questionsPartA.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (idx: number, points: number) => {
    const updated = [...answers];
    updated[idx] = points;
    setAnswers(updated);
  };

  const isComplete = answers.every(v => v !== -1);
  
  // ASRS Part A criteria: count questions with points >= 2 or >= 3 depending on item
  // Items 1-3 >= 2 (Às vezes+), Items 4-6 >= 3 (Com frequência+)
  const positiveItemsCount = answers.filter((val, idx) => {
    if (idx < 3) return val >= 2;
    return val >= 3;
  }).length;

  const isPositiveScreen = positiveItemsCount >= 4;

  return (
    <div id="asrs-tool-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-2">
          Escala de Autoavaliação de TDAH no Adulto (ASRS-v1.1)
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Rastreio de TDAH no Adulto (ASRS-v1.1)</h2>
        <p className="text-slate-600 text-sm mt-1">
          A escala ASRS v1.1 foi desenvolvida pela Organização Mundial da Saúde (OMS) em conjunto com a Faculdade de Medicina de Harvard.
        </p>
      </div>

      {!submitted ? (
        <div className="space-y-6">
          {questionsPartA.map((q, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-medium text-slate-800 text-sm md:text-base mb-3">
                {idx + 1}. {q}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5">
                {options.map((opt) => {
                  const isSelected = answers[idx] === opt.points;
                  return (
                    <button
                      key={opt.points}
                      type="button"
                      onClick={() => handleSelectOption(idx, opt.points)}
                      className={`px-2 py-2 text-xs rounded-lg border transition-all font-medium text-center ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-600 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              {answers.filter(a => a !== -1).length} de {questionsPartA.length} marcadas
            </p>
            <button
              type="button"
              disabled={!isComplete}
              onClick={() => setSubmitted(true)}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                isComplete
                  ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-md cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Ver Rastreio Clínico <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <Brain className="w-10 h-10 text-amber-600 mx-auto mb-2" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Itens Positivos na Parte A</span>
            <div className="text-5xl font-extrabold text-slate-900 my-2">
              {positiveItemsCount} <span className="text-xl font-normal text-slate-500">/ 6</span>
            </div>
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${isPositiveScreen ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300'}`}>
              {isPositiveScreen ? "Rastreio Positivo para TDAH" : "Rastreio Negativo/Baixa Probabilidade"}
            </div>
            <p className="text-slate-700 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {isPositiveScreen
                ? "Sua pontuação atingiu o limiar significativo de rastreamento para TDAH no adulto. Recomenda-se uma avaliação clínica neuropsicológica completa com o Dr. André Lemos Vieira."
                : "Seus resultados na Parte A indicam baixa frequência de sintomas de desatenção ou hiperatividade no limiar típico de TDAH no adulto."
              }
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Nota Clínica Importante:</strong>
              A ASRS-v1.1 é uma ferramenta de autoavaliação de rastreio inicial. O diagnóstico definitivo de TDAH no adulto requer avaliação clínica aprofundada.
            </div>
          </div>

          {/* CRO Conversion Card */}
          <CroResultCard
            testName="TDAH Adulto (ASRS-v1.1)"
            scoreText={`${positiveItemsCount}/6 itens significativos`}
            levelText={isPositiveScreen ? 'Incrindicativo de TDAH - Rastreio Positivo' : 'Baixa probabilidade no limiar inicial'}
            onOpenConsultationModal={onOpenConsultationModal}
          />

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-slate-500 hover:text-slate-700 text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Refazer o teste
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
