import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Users,
  PieChart,
  ShieldCheck,
  BellRing,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const NewsletterView: React.FC<{ onNavigate: (view: any, param?: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('ansiedade');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setToastMsg(`Inscrição confirmada! Enviamos um e-mail de confirmação (Double Opt-In) para ${email}.`);
    setEmail('');
    setName('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10 animate-fadeIn">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950 text-white shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Main Hero Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 md:p-12 shadow-xl border border-emerald-800 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 text-xs font-bold mx-auto">
          <Mail className="w-4 h-4 text-emerald-400" />
          <span>Boletim de Psicoeducação & Evidências em TCC</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Receba Artigos Semanais sobre Ansiedade, TDAH e Terapia Sexual
        </h1>

        <p className="text-emerald-100/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Sem spam, sem fórmulas mágicas. Conteúdo estritamente técnico, embasado em neurociência e Terapia Cognitivo-Comportamental curado pelo Psicólogo André Lemos Vieira (CRP 01/14042).
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubscribe} className="max-w-xl mx-auto p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-emerald-700/80 space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <Input
              label="Seu Nome Completo"
              placeholder="Ex: Maria Fernandes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white text-slate-900"
              required
            />
            <Input
              label="E-mail Principal"
              type="email"
              placeholder="maria@exemplo.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-slate-900"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-200">Escolha o Tópico de Interesse Principal:</label>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'ansiedade', label: 'Ansiedade & Fobias' },
                { id: 'tdah', label: 'TDAH & Neurodivergência' },
                { id: 'sexual', label: 'Terapia Sexual & Relacionamentos' },
                { id: 'geral', label: 'TCC & Saúde Mental Geral' },
              ].map((topic) => (
                <button
                  type="button"
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    selectedTopic === topic.id
                      ? 'bg-emerald-400 text-slate-950 shadow-md'
                      : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900 border border-emerald-700/60'
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          <Button variant="cta" className="w-full justify-center py-3">
            <Send className="w-4 h-4 mr-2" /> Inscrever-se Gratuitamente (Double Opt-In LGPD)
          </Button>

          <p className="text-[11px] text-center text-emerald-200/80">
            Respeitamos sua privacidade. Seus dados estão seguros e você pode se descadastrar com 1 clique a qualquer momento.
          </p>
        </form>
      </div>

      {/* Benefits Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-2 border-emerald-200">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <BellRing className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Edição Semanal Resumida</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Resumos diretos de 5 minutos de leitura contendo os principais achados em TCC e novas ferramentas clínicas.
          </p>
        </Card>

        <Card className="space-y-2 border-sky-200">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Conformidade LGPD</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Confirmação obrigatória via e-mail e canal de cancelamento imediato garantindo total transparência e proteção de dados.
          </p>
        </Card>

        <Card className="space-y-2 border-purple-200">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Materiais Exclusivos</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Assinantes recebem em primeira mão os lançamentos da Biblioteca Digital, planilhas RPD e testes psicológicos em PDF.
          </p>
        </Card>
      </div>
    </div>
  );
};
