import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle, FileText, ArrowRight } from 'lucide-react';

export const ThoughtRecordTool: React.FC = () => {
  const [situation, setSituation] = useState('');
  const [thought, setThought] = useState('');
  const [emotion, setEmotion] = useState('Ansiedade');
  const [intensity, setIntensity] = useState(80);
  const [distortion, setDistortion] = useState('Catastrofização');
  const [evidenceFor, setEvidenceFor] = useState('');
  const [evidenceAgainst, setEvidenceAgainst] = useState('');
  const [rationalResponse, setRationalResponse] = useState('');
  const [newIntensity, setNewIntensity] = useState(40);
  const [savedRecords, setSavedRecords] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const distortionsList = [
    { name: 'Catastrofização', desc: 'Esperar o pior cenário sem evidências realistas.' },
    { name: 'Leitura Mental', desc: 'Achar que sabe o que os outros estão pensando de ruim a seu respeito.' },
    { name: 'Pensamento Tudo-ou-Nada', desc: 'Ver as coisas apenas em 8 ou 80 (ou sou perfeito ou sou um fracasso).' },
    { name: 'Filtro Mental Negativo', desc: 'Focar apenas no detalhe ruim e ignorar tudo o que deu certo.' },
    { name: 'Raciocínio Emocional', desc: 'Acreditar que se sente ansioso, então a situação é obrigatoriamente perigosa.' },
    { name: 'Supergeneralização', desc: 'Concluir que algo ruim que aconteceu uma vez vai se repetir sempre.' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation || !thought || !rationalResponse) return;

    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR'),
      situation,
      thought,
      emotion,
      intensity,
      distortion,
      evidenceFor,
      evidenceAgainst,
      rationalResponse,
      newIntensity
    };

    setSavedRecords([newRecord, ...savedRecords]);
    setIsSaved(true);
  };

  const handleResetForm = () => {
    setSituation('');
    setThought('');
    setRationalResponse('');
    setEvidenceFor('');
    setEvidenceAgainst('');
    setIntensity(80);
    setNewIntensity(40);
    setIsSaved(false);
  };

  return (
    <div id="thought-record-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
          Ferramenta Prática de TCC
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Registro de Pensamentos Automáticos (RPA)</h2>
        <p className="text-slate-600 text-sm mt-1">
          A reestruturação cognitiva é a técnica central da Terapia Cognitivo-Comportamental. Preencha os campos abaixo para examinar seus pensamentos com objetividade.
        </p>
      </div>

      {!isSaved ? (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                1. Situação (Gatilho)
              </label>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                required
                placeholder="Ex: Apresentei um relatório na reunião de equipe e o gestor não fez comentários."
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden min-h-[90px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                2. Pensamento Automático
              </label>
              <textarea
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                required
                placeholder="Ex: 'Meu trabalho ficou horrível, ele com certeza vai me demitir'."
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden min-h-[90px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Emoção Principal
              </label>
              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-sm bg-white"
              >
                <option value="Ansiedade">Ansiedade</option>
                <option value="Medo">Medo</option>
                <option value="Tristeza">Tristeza</option>
                <option value="Raiva">Raiva</option>
                <option value="Culpa">Culpa</option>
                <option value="Vergonha">Vergonha</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Intensidade Inicial ({intensity}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full mt-2 accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Distorção Cognitiva Identificada
              </label>
              <select
                value={distortion}
                onChange={(e) => setDistortion(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-sm bg-white"
              >
                {distortionsList.map((d) => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                3. Evidências que COMPROVAM o pensamento
              </label>
              <textarea
                value={evidenceFor}
                onChange={(e) => setEvidenceFor(e.target.value)}
                placeholder="Fatos concretos e objetivos que apoiam o pensamento..."
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden min-h-[80px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                4. Evidências que DESMENTEM o pensamento
              </label>
              <textarea
                value={evidenceAgainst}
                onChange={(e) => setEvidenceAgainst(e.target.value)}
                placeholder="Fatos e conquistas passadas que desmentem o pensamento catastrófico..."
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden min-h-[80px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              5. Resposta Alternativa e Racional (Visão Equilibrada)
            </label>
            <textarea
              value={rationalResponse}
              onChange={(e) => setRationalResponse(e.target.value)}
              required
              placeholder="Ex: O gestor estava focado na pauta seguinte. Ele elogiou minha entrega na semana passada e não há sinal objetivo de demissão."
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden min-h-[90px]"
            />
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="block text-xs font-bold text-emerald-900 uppercase">
                Reavaliação da Intensidade Emocional ({newIntensity}%)
              </span>
              <p className="text-xs text-emerald-700">Com que intensidade você sente a emoção agora?</p>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={newIntensity}
              onChange={(e) => setNewIntensity(Number(e.target.value))}
              className="w-full md:w-48 accent-emerald-600 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Registrar e Concluir Reestruturação
          </button>
        </form>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-emerald-900">Registro Clínico Concluído com Sucesso!</h3>
            <p className="text-emerald-800 text-sm mt-2 max-w-md mx-auto">
              Sua reavaliação cognitiva reduziu o impacto emocional da {emotion} de <strong>{intensity}%</strong> para <strong>{newIntensity}%</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
            <div className="font-bold text-slate-800 text-sm mb-1">Resumo da Reestruturação:</div>
            <div><strong>Situação:</strong> {situation}</div>
            <div><strong>Pensamento Automático:</strong> "{thought}" ({distortion})</div>
            <div><strong>Resposta Racional:</strong> "{rationalResponse}"</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetForm}
              className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 cursor-pointer"
            >
              Criar Novo Registro
            </button>
          </div>
        </div>
      )}

      {savedRecords.length > 0 && (
        <div className="mt-10 pt-6 border-t border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" /> Meus Registros nesta Sessão ({savedRecords.length})
          </h3>
          <div className="space-y-3">
            {savedRecords.map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{rec.date} - {rec.emotion} ({rec.intensity}% &rarr; {rec.newIntensity}%)</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold">{rec.distortion}</span>
                </div>
                <p className="truncate"><strong>Pensamento:</strong> "{rec.thought}"</p>
                <p className="truncate text-emerald-800"><strong>Resposta:</strong> "{rec.rationalResponse}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
