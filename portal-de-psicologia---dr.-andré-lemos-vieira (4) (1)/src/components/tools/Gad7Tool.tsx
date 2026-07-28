import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, RotateCcw, MessageSquare, ArrowRight } from 'lucide-react';
import { drAndreProfile } from '../../data/authorData';
import { CroResultCard } from './CroResultCard';

interface Gad7ToolProps {
  onOpenConsultationModal: (prefilledMsg?: string) => void;
}

const questions = [
  "Sentir-se nervoso(a), ansioso(a) ou com os nervos à flor da pele?",
  "Não ser capaz de impedir ou de controlar as preocupações?",
  "Preocupar-se muito com diversas coisas diferentes?",
  "Dificuldade para relaxar?",
  "Ficar tão agitado(a) que se torna difícil ficar parado(a)?",
  "Ficar facilmente irritado(a) ou aborrecido(a)?",
  "Sentir medo, como se algo terrível fosse acontecer?"
];

const options = [
  { label: "Nenhuma vez", points: 0 },
  { label: "Vários dias", points: 1 },
  { label: "Mais da metade dos dias", points: 2 },
  { label: "Quase todos os dias", points: 3 }
];

export const Gad7Tool: React.FC<Gad7ToolProps> = ({ onOpenConsultationModal }) => {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionIdx: number, points: number) => {
    const updated = [...answers];
    updated[questionIdx] = points;
    setAnswers(updated);
  };

  const isComplete = answers.every(val => val !== -1);
  const totalScore = answers.reduce((acc, curr) => (curr !== -1 ? acc + curr : acc), 0);

  const getResult = () => {
    if (totalScore <= 4) {
      return {
        level: "Ansiedade Mínima",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
        description: "Sua pontuação indica um nível baixo ou mínimo de ansiedade nas últimas duas semanas. Continue cultivando hábitos saudáveis de autocuidado e higiene mental."
      };
    } else if (totalScore <= 9) {
      return {
        level: "Ansiedade Leve",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
        description: "Sua pontuação sugere ansiedade leve. Táticas de higiene do sono, exercícios de respiração e reestruturação de rotina ajudam a evitar a evolução dos sintomas."
      };
    } else if (totalScore <= 14) {
      return {
        level: "Ansiedade Moderada",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        description: "Sua pontuação aponta para ansiedade moderada. Os sintomas podem estar interferindo na sua concentração, sono ou bem-estar diário. A TCC é altamente indicada."
      };
    } else {
      return {
        level: "Ansiedade Grave",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
        description: "Sua pontuação indica um nível elevado de ansiedade. Recomenda-se buscar uma avaliação clínica individualizada com um psicólogo para iniciar o protocolo de tratamento."
      };
    }
  };

  const result = getResult();

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(-1));
    setSubmitted(false);
  };

  const handleWhatsAppShare = () => {
    const message = `Olá, Dr. André! Realizei o teste de ansiedade GAD-7 no seu portal e obtive pontuação ${totalScore}/21 (${result.level}). Gostaria de agendar uma consulta de avaliação.`;
    const url = `https://wa.me/${drAndreProfile.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="gad7-tool-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 mb-2">
          Escala de Ansiedade Geral (GAD-7)
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Teste Clínico de Ansiedade GAD-7</h2>
        <p className="text-slate-600 text-sm mt-1">
          Nas últimas 2 semanas, com que frequência você foi incomodado(a) pelos problemas abaixo?
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
                  const isSelected = answers[idx] === opt.points;
                  return (
                    <button
                      key={opt.points}
                      type="button"
                      onClick={() => handleSelectOption(idx, opt.points)}
                      className={`px-3 py-2.5 text-xs md:text-sm rounded-lg border transition-all font-medium text-center ${
                        isSelected
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
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
              {answers.filter(a => a !== -1).length} de {questions.length} questões respondidas
            </p>
            <button
              type="button"
              disabled={!isComplete}
              onClick={() => setSubmitted(true)}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                isComplete
                  ? 'bg-sky-700 hover:bg-sky-800 text-white shadow-md cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Ver Resultado Clínico <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pontuação Total</span>
            <div className="text-5xl font-extrabold text-slate-900 my-2">
              {totalScore} <span className="text-xl font-normal text-slate-500">/ 21</span>
            </div>
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${result.badgeColor}`}>
              {result.level}
            </div>
            <p className="text-slate-700 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {result.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Aviso de Responsabilidade Ética (CFP):</strong>
              Este teste é uma ferramenta psicoeducativa de autorrastreamento e NÃO substitui uma avaliação psicológica realizada por um psicólogo clínico registrado.
            </div>
          </div>

          {/* CRO Conversion Card */}
          <CroResultCard
            testName="Ansiedade (GAD-7)"
            scoreText={`${totalScore}/21`}
            levelText={result.level}
            onOpenConsultationModal={onOpenConsultationModal}
          />

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleReset}
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
