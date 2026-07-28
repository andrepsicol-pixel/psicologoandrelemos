import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, RotateCcw, MessageSquare, ArrowRight, HeartHandshake } from 'lucide-react';
import { drAndreProfile } from '../../data/authorData';
import { CroResultCard } from './CroResultCard';

interface Phq9ToolProps {
  onOpenConsultationModal: (prefilledMsg?: string) => void;
}

const questions = [
  "Pouco interesse ou pouco prazer em fazer as coisas?",
  "Sentir-se 'para baixo', deprimido(a) ou sem perspectiva?",
  "Dificuldade para adormecer, permanecer dormindo ou dormir demais?",
  "Sentir-se cansado(a) ou com pouca energia?",
  "Falta de apetite ou comer demais?",
  "Sentir-se mal consigo mesmo(a) — ou achar que é um fracasso?",
  "Dificuldade para se concentrar nas coisas, como ler jornal ou ver TV?",
  "Lentidão para se mover/falar que os outros notaram, ou agitação fora do comum?",
  "Pensamentos de que seria melhor estar morto(a) ou de se ferir de alguma maneira?"
];

const options = [
  { label: "Nenhuma vez", points: 0 },
  { label: "Vários dias", points: 1 },
  { label: "Mais da metade dos dias", points: 2 },
  { label: "Quase todos os dias", points: 3 }
];

export const Phq9Tool: React.FC<Phq9ToolProps> = ({ onOpenConsultationModal }) => {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionIdx: number, points: number) => {
    const updated = [...answers];
    updated[questionIdx] = points;
    setAnswers(updated);
  };

  const isComplete = answers.every(val => val !== -1);
  const totalScore = answers.reduce((acc, curr) => (curr !== -1 ? acc + curr : acc), 0);
  const hasSuicidalIdeation = answers[8] > 0;

  const getResult = () => {
    if (totalScore <= 4) {
      return {
        level: "Depressão Mínima/Ausente",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
        description: "Seus sintomas indicam ausência ou nível mínimo de impacto depressivo."
      };
    } else if (totalScore <= 9) {
      return {
        level: "Depressão Leve",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
        description: "Pontuação compatível com sintomas depressivos leves. Estratégias de ativação comportamental e TCC auxiliam na prevenção."
      };
    } else if (totalScore <= 14) {
      return {
        level: "Depressão Moderada",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        description: "Sintomas depressivos moderados identificados. É recomendada a busca de avaliação psicoterápica individual."
      };
    } else if (totalScore <= 19) {
      return {
        level: "Depressão Moderadamente Grave",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
        description: "Pontuação elevada. Recomenda-se acompanhamento psicoterapêutico prioritário com a TCC."
      };
    } else {
      return {
        level: "Depressão Grave",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
        description: "Indicação de depressão grave. Recomenda-se apoio profissional multidisciplinar imediato (psicólogo e psiquiatra)."
      };
    }
  };

  const result = getResult();

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(-1));
    setSubmitted(false);
  };

  return (
    <div id="phq9-tool-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 mb-2">
          Questionário de Saúde do Paciente (PHQ-9)
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Rastreio Clínico de Depressão PHQ-9</h2>
        <p className="text-slate-600 text-sm mt-1">
          Nas últimas 2 semanas, com que frequência você foi incomodado(a) por qualquer um dos problemas abaixo?
        </p>
      </div>

      {!submitted ? (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${idx === 8 ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
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
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
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
                  ? 'bg-indigo-700 hover:bg-indigo-800 text-white shadow-md cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Calcular Resultado <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {hasSuicidalIdeation && (
            <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <HeartHandshake className="w-6 h-6 text-rose-600 shrink-0" />
                <h3 className="text-base font-bold text-rose-900">Apoio Emocional Imediato (CVV - Ligue 188)</h3>
              </div>
              <p className="text-xs md:text-sm text-rose-800 leading-relaxed mb-3">
                Identificamos que você assinalou presença de pensamentos dolorosos sobre o fim da vida. Lembre-se: você não está sozinho(a). O Centro de Valorização da Vida (CVV) oferece atendimento gratuito, sigiloso e 24 horas por dia em todo o Brasil.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:188"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs"
                >
                  <PhoneCall className="w-4 h-4" /> Ligar Gratuitamente para 188
                </a>
                <a
                  href="https://www.cvv.org.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white text-rose-700 border border-rose-300 font-semibold text-xs hover:bg-rose-50"
                >
                  Acessar Chat no site CVV.org.br
                </a>
              </div>
            </div>
          )}

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pontuação PHQ-9</span>
            <div className="text-5xl font-extrabold text-slate-900 my-2">
              {totalScore} <span className="text-xl font-normal text-slate-500">/ 27</span>
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
              <strong className="font-semibold block mb-0.5">Nota de Isenção Ética:</strong>
              O PHQ-9 é um instrumento de rastreamento e não substitui avaliação de diagnóstico pelo psicólogo clínico ou psiquiatra.
            </div>
          </div>

          {/* CRO Conversion Card */}
          <CroResultCard
            testName="Sintomas Depressivos (PHQ-9)"
            scoreText={`${totalScore}/27`}
            levelText={result.level}
            onOpenConsultationModal={onOpenConsultationModal}
          />

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-slate-500 hover:text-slate-700 text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Refazer teste
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
