import React, { useState } from 'react';
import { Moon, Sun, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export const SleepCalculatorTool: React.FC = () => {
  const [bedTime, setBedTime] = useState('23:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [latencyMinutes, setLatencyMinutes] = useState(30);
  const [nightAwakenings, setNightAwakenings] = useState(1);

  const calculateCycles = () => {
    const [bHours, bMins] = bedTime.split(':').map(Number);
    const [wHours, wMins] = wakeTime.split(':').map(Number);

    let bedDate = new Date();
    bedDate.setHours(bHours, bMins, 0, 0);

    let wakeDate = new Date();
    wakeDate.setHours(wHours, wMins, 0, 0);

    if (wakeDate <= bedDate) {
      wakeDate.setDate(wakeDate.getDate() + 1);
    }

    const totalBedMinutes = (wakeDate.getTime() - bedDate.getTime()) / (1000 * 60);
    const totalActualSleepMinutes = totalBedMinutes - latencyMinutes - (nightAwakenings * 15);
    const sleepEfficiency = Math.round((totalActualSleepMinutes / totalBedMinutes) * 100);

    const cyclesCount = (totalActualSleepMinutes / 90).toFixed(1);

    return {
      totalHours: (totalActualSleepMinutes / 60).toFixed(1),
      sleepEfficiency: Math.max(0, Math.min(100, sleepEfficiency)),
      cyclesCount
    };
  };

  const results = calculateCycles();

  return (
    <div id="sleep-calculator-container" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 mb-2">
          Calculadora Adaptada de Qualidade do Sono (PSQI)
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Calculadora de Qualidade do Sono e Ciclos</h2>
        <p className="text-slate-600 text-sm mt-1">
          O sono de qualidade requer ciclos NREM/REM completos (aprox. 90 minutos) e eficiência de sono superior a 85%.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-indigo-600" /> Horário em que vai para a cama
            </label>
            <input
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Horário de despertar
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Tempo para adormecer (Latência: {latencyMinutes} min)
            </label>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={latencyMinutes}
              onChange={(e) => setLatencyMinutes(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Despertares noturnos ({nightAwakenings}x)
            </label>
            <input
              type="range"
              min="0"
              max="6"
              value={nightAwakenings}
              onChange={(e) => setNightAwakenings(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-indigo-900 text-white p-6 rounded-2xl shadow-sm">
          <div>
            <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">Estimativa de Eficiência</span>
            <div className="text-5xl font-extrabold text-white my-2">
              {results.sleepEfficiency}%
            </div>
            <p className="text-xs text-indigo-200">
              {results.sleepEfficiency >= 85
                ? "Sua eficiência de sono é excelente (&ge; 85%). Parabéns!"
                : "Sua eficiência de sono está abaixo do ideal (< 85%). Recomenda-se higiene do sono e protocolo TCC-I."}
            </p>

            <div className="mt-6 pt-4 border-t border-indigo-800/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-indigo-300">Tempo Real de Sono:</span>
                <span className="font-bold">{results.totalHours} horas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-300">Ciclos de Sono (90 min):</span>
                <span className="font-bold">~{results.cyclesCount} ciclos</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-indigo-950/60 border border-indigo-700/50 text-indigo-200 text-xs">
            <strong className="block font-semibold text-white mb-1">Regra de Ouro TCC-I:</strong>
            Não permaneça mais de 20 minutos acordado na cama. Levante-se, vá a um ambiente de luz fraca e só retorne ao sentir sono.
          </div>
        </div>
      </div>
    </div>
  );
};
