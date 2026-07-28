import React, { useState } from 'react';
import { Layers, Plus, Trash2, ArrowUpRight } from 'lucide-react';

export const ExposurePlanTool: React.FC = () => {
  const [fearTopic, setFearTopic] = useState('');
  const [steps, setSteps] = useState([
    { id: 1, action: 'Olhar para fotos de apresentações em público', suds: 30 },
    { id: 2, action: 'Gravar um vídeo curto de 1 minuto falando sozinho', suds: 50 },
    { id: 3, action: 'Fazer uma pergunta ao vivo em uma reunião virtual com 5 pessoas', suds: 75 },
    { id: 4, action: 'Apresentar um projeto presencialmente para toda a equipe', suds: 95 }
  ]);
  const [newAction, setNewAction] = useState('');
  const [newSuds, setNewSuds] = useState(50);

  const handleAddStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAction) return;
    const item = { id: Date.now(), action: newAction, suds: newSuds };
    const updated = [...steps, item].sort((a, b) => a.suds - b.suds);
    setSteps(updated);
    setNewAction('');
    setNewSuds(50);
  };

  const handleRemoveStep = (id: number) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  return (
    <div id="exposure-plan-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 mb-2">
          Hierarquia Sistemática de TCC (SUDs)
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Plano de Exposição Gradual (Hierarquia de Medos)</h2>
        <p className="text-slate-600 text-sm mt-1">
          A Exposição e Prevenção de Resposta (ERP) é a ferramenta mais eficaz para tratamento de Fobias, TOC e Agorafobia.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Fobia / Situação Temida Alvo
          </label>
          <input
            type="text"
            value={fearTopic}
            onChange={(e) => setFearTopic(e.target.value)}
            placeholder="Ex: Falar em público / Dirigir em rodovias / Locais fechados"
            className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
          />
        </div>

        <form onSubmit={handleAddStep} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <span className="block text-xs font-bold text-slate-700 uppercase">Adicionar Degrau da Hierarquia</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <input
                type="text"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="Ex: Enviar um áudio em um grupo de WhatsApp"
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">
                Ansiedade Estimada (SUDs: {newSuds}/100)
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={newSuds}
                onChange={(e) => setNewSuds(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Incluir Degrau
          </button>
        </form>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
            <span>Escada de Exposição Ordenada (Da menor para a maior ansiedade)</span>
            <span>{steps.length} degraus</span>
          </h3>

          {steps.map((st, idx) => (
            <div key={st.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs shrink-0">
                  #{idx + 1}
                </span>
                <span className="font-medium text-slate-800">{st.action}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs">
                  {st.suds} SUDs
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveStep(st.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
