import React, { useState } from 'react';
import { Smile, Meh, Frown, Flame, Heart, Sparkles, Plus, Calendar } from 'lucide-react';

export const MoodTrackerTool: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<'excelente' | 'bom' | 'neutro' | 'ansioso' | 'deprimido'>('bom');
  const [note, setNote] = useState('');
  const [trigger, setTrigger] = useState('Trabalho');
  const [history, setHistory] = useState([
    { id: 1, date: 'Hoje, 09:30', mood: 'bom', label: 'Bom', note: 'Manhã produtiva após caminhar no parque.', trigger: 'Saúde' },
    { id: 2, date: 'Ontem, 20:15', mood: 'ansioso', label: 'Ansioso', note: 'Reunião desafiadora à tarde.', trigger: 'Trabalho' }
  ]);

  const moodOptions = [
    { key: 'excelente', label: 'Excelente', icon: Sparkles, color: 'text-amber-500 bg-amber-50 border-amber-300' },
    { key: 'bom', label: 'Tranquilo / Bom', icon: Smile, color: 'text-emerald-600 bg-emerald-50 border-emerald-300' },
    { key: 'neutro', label: 'Neutro', icon: Meh, color: 'text-slate-600 bg-slate-50 border-slate-300' },
    { key: 'ansioso', label: 'Ansioso / Agitado', icon: Flame, color: 'text-orange-600 bg-orange-50 border-orange-300' },
    { key: 'deprimido', label: 'Triste / Exausto', icon: Frown, color: 'text-indigo-600 bg-indigo-50 border-indigo-300' },
  ];

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const moodObj = moodOptions.find(m => m.key === selectedMood);
    const newEntry = {
      id: Date.now(),
      date: `Hoje, ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
      mood: selectedMood,
      label: moodObj?.label || 'Bom',
      note: note || 'Sem observação adicional.',
      trigger
    };
    setHistory([newEntry, ...history]);
    setNote('');
  };

  return (
    <div id="mood-tracker-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 mb-2">
          Monitoramento Emocional Diário
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Diário do Humor & Mapeamento de Gatilhos</h2>
        <p className="text-slate-600 text-sm mt-1">
          Acompanhar as oscilações de humor permite identificar padrões de estresse e antecipar gatilhos comportamentais.
        </p>
      </div>

      <form onSubmit={handleAddEntry} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-3">
            Como você está se sentindo agora?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {moodOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedMood === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedMood(opt.key as any)}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    isSelected
                      ? `${opt.color} font-bold ring-2 ring-offset-1 ring-slate-400 shadow-xs`
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1.5" />
                  <span className="text-xs">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Gatilho Principal Relacionado
            </label>
            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
            >
              <option value="Trabalho">Trabalho / Estudo</option>
              <option value="Relacionamento">Relacionamento / Família</option>
              <option value="Saúde">Saúde Física / Sono</option>
              <option value="Finanças">Finanças</option>
              <option value="Social">Interação Social</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Nota Curta / Pensamento do Momento
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="O que aconteceu antes dessa sensação?"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Registrar Estado Emocional
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" /> Histórico Recente de Humores
        </h3>
        <div className="space-y-2.5">
          {history.map((item) => (
            <div key={item.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{item.label} &bull; <span className="font-normal text-slate-500">{item.date}</span></span>
                <p className="text-slate-600 mt-0.5">{item.note}</p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-semibold text-slate-700 shrink-0">
                {item.trigger}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
