import React, { useState } from 'react';
import {
  Palette,
  Type,
  LayoutGrid,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Award,
  Search,
  MessageCircle,
  FileText,
  Bookmark,
  Calendar,
  Sparkles,
  ShieldCheck,
  Info,
  Clock,
  ArrowRight,
  UploadCloud,
  ChevronRight,
  HeartHandshake,
  Lock,
  Stethoscope,
  BookOpen,
  User,
  Star,
  Check,
  Eye,
  Sliders,
  HelpCircle,
  Bell,
  RefreshCw
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Accordion } from '../components/ui/Accordion';
import { Alert } from '../components/ui/Alert';
import { Skeleton } from '../components/ui/Skeleton';

export interface DesignSystemViewProps {
  onNavigate: (view: any, param?: string) => void;
  onOpenConsultationModal?: () => void;
}

export const DesignSystemView: React.FC<DesignSystemViewProps> = ({
  onNavigate,
  onOpenConsultationModal,
}) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'buttons' | 'cards' | 'forms' | 'components' | 'guidelines'>('tokens');
  
  // Interactive component states for preview
  const [switchState, setSwitchState] = useState(true);
  const [radioState, setRadioState] = useState('tcc');
  const [checkboxState, setCheckboxState] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const triggerToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10 animate-fadeIn">
      {/* Top Banner / Hero */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 md:p-10 shadow-xl border border-white/20 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Palette className="w-96 h-96 text-emerald-300" />
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold shadow-xs">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Design System Oficial &bull; Psicólogo André Lemos Vieira (CRP 01/14042)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Guia de Estilo, Componentes & Identidade Visual
          </h1>

          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed">
            Sistema de design humanizado, acolhedor e fundamentado na Terapia Cognitivo-Comportamental e Gestalt-terapia. Projetado para proporcionar navegabilidade fluida, acessibilidade rigorosa (WCAG 2.2 AA) e transmitir confiança clínica sem apelos comerciais.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Badge variant="emerald" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Acessibilidade WCAG 2.2 AA
            </Badge>
            <Badge variant="sky" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Tailwind CSS + Motion
            </Badge>
            <Badge variant="teal" icon={<Stethoscope className="w-3.5 h-3.5" />}>
              Tom de Voz Humano e Acolhedor
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Header Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80 scrollbar-none">
        {[
          { id: 'tokens', label: 'Cores & Tokens', icon: <Palette className="w-4 h-4" /> },
          { id: 'typography', label: 'Tipografia & Grid', icon: <Type className="w-4 h-4" /> },
          { id: 'buttons', label: 'Botões & Badges', icon: <Sliders className="w-4 h-4" /> },
          { id: 'cards', label: 'Cards da Marca', icon: <FileText className="w-4 h-4" /> },
          { id: 'forms', label: 'Campos & Inputs', icon: <Search className="w-4 h-4" /> },
          { id: 'components', label: 'Componentes Interativos', icon: <LayoutGrid className="w-4 h-4" /> },
          { id: 'guidelines', label: 'Diretrizes & Manual', icon: <BookOpen className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white/70 text-slate-700 hover:bg-white hover:text-emerald-900 border border-white/80'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: TOKENS & PALETTE */}
      {activeTab === 'tokens' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Palette className="w-6 h-6 text-emerald-700" />
              Paleta de Cores e Significado Psicológico
            </h2>
            <p className="text-slate-600 text-sm">
              As cores foram cuidadosamente escolhidas para promover serenidade, legibilidade e acolhimento emocional, reduzindo a ansiedade do visitante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Emeralds */}
            <Card className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-700"></span>
                Verde Esmeralda (Primária)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transmite renovação, equilíbrio clínico e fundamentação científica. Utilizada nos elementos de maior destaque da marca do Dr. André.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950 text-white text-xs font-mono">
                  <span>emerald-950</span>
                  <span className="text-emerald-300">#022c22</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-800 text-white text-xs font-mono">
                  <span>emerald-800</span>
                  <span className="text-emerald-200">#065f46</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-700 text-white text-xs font-mono">
                  <span>emerald-700</span>
                  <span className="text-emerald-100">#047857</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-100 text-emerald-950 text-xs font-mono">
                  <span>emerald-100</span>
                  <span className="text-emerald-800">#d1fae5</span>
                </div>
              </div>
            </Card>

            {/* Neutrals */}
            <Card className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-700"></span>
                Neutros Suaves & Fundo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tom de fundo off-white natural (#f4f7f6) que elimina o cansaço visual e simula papel acetinado de alta qualidade.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f4f7f6] border border-slate-300 text-slate-800 text-xs font-mono">
                  <span>Background Portal</span>
                  <span>#f4f7f6</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 text-white text-xs font-mono">
                  <span>slate-900 (Títulos)</span>
                  <span className="text-slate-400">#0f172a</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-700 text-white text-xs font-mono">
                  <span>slate-700 (Corpo)</span>
                  <span className="text-slate-300">#334155</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-mono">
                  <span>Card Glass</span>
                  <span>rgba(255,255,255,0.8)</span>
                </div>
              </div>
            </Card>

            {/* Accent & Status */}
            <Card className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-600"></span>
                Acentos & Alertas
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tons de apoio para ferramentas, testes clínicos, avisos de emergência (CVV 188) e validações psicoeducativas.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-sky-100 text-sky-950 border border-sky-300 text-xs font-mono">
                  <span>sky-100 (Ferramentas)</span>
                  <span>#e0f2fe</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 text-xs font-mono">
                  <span>amber-100 (Atenção)</span>
                  <span>#fef3c7</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-100 text-rose-950 border border-rose-300 text-xs font-mono">
                  <span>rose-100 (Apoio / Crise)</span>
                  <span>#ffe4e6</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-teal-100 text-teal-950 border border-teal-300 text-xs font-mono">
                  <span>teal-100 (Ciência)</span>
                  <span>#ccfbf1</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: TYPOGRAPHY & GRID */}
      {activeTab === 'typography' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Type className="w-6 h-6 text-emerald-700" />
              Escala Tipográfica & Grid de Layout
            </h2>
            <p className="text-slate-600 text-sm">
              Escala modular com proporção harmoniosa, priorizando legibilidade em telas móveis e alinhamento com a norma culta de escrita científica.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 border-slate-200">
                Hierarquia de Títulos & Textos
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">H1 &bull; 36px - 48px &bull; Bold</span>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Psicoterapia & Conteúdo Científico em Saúde Mental
                  </h1>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">H2 &bull; 24px - 30px &bull; Bold</span>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Abordagem Integrativa em TCC e Gestalt-terapia
                  </h2>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">H3 &bull; 18px - 20px &bull; SemiBold</span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Sintomas da Ansiedade Generalizada (TAG) no Cotidiano
                  </h3>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Body Lead &bull; 16px &bull; Regular</span>
                  <p className="text-base text-slate-700 leading-relaxed">
                    A Terapia Cognitivo-Comportamental é fundamentada na premissa de que a forma como interpretamos os eventos determina nossas reações emocionais e comportamentais.
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Body Small &bull; 14px &bull; Regular</span>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    Atendimento presencial em Brasília (Asa Sul) e consultas síncronas via telepsicologia com regulamentação do CFP.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 border-slate-200">
                Grid System & Breakpoints
              </h3>

              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800">Mobile (&lt; 640px)</div>
                  <div className="text-slate-600">Padding: 16px &bull; 1 Coluna em pilhas simples &bull; Touch target min: 44px</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800">Tablet (640px - 1024px)</div>
                  <div className="text-slate-600">Padding: 24px &bull; 2 a 3 Colunas com gap de 24px</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800">Desktop (1024px - 1536px)</div>
                  <div className="text-slate-600">Container Max: 1280px (`max-w-7xl`) &bull; 12 Colunas &bull; Margem centralizada</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800">Ultra Wide (&gt; 1536px)</div>
                  <div className="text-slate-600">Conteúdo travado no centro para evitar estiramento tipográfico</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> WCAG 2.2 AA Contrast Compliance
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Todo texto em fundo claro mantém contraste mínimo de 4.5:1. Botões contêm foco visível com anel de 2px (`focus:ring-2 focus:ring-emerald-500`).
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 3: BUTTONS & BADGES */}
      {activeTab === 'buttons' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Sliders className="w-6 h-6 text-emerald-700" />
              Botões e Badges de Classificação
            </h2>
            <p className="text-slate-600 text-sm">
              Elementos de ação direta com feedback tátil, estados focados transparentes e chamadas para ação humanizadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 border-slate-200">
                Variantes de Botões
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">
                  Ação Primária (Verde)
                </Button>
                <Button variant="secondary">
                  Ação Secundária
                </Button>
                <Button variant="outline">
                  Contorno Elegante
                </Button>
                <Button variant="ghost">
                  Botão Discreto
                </Button>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-700">Chamada para Agendamento & WhatsApp</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="cta"
                    icon={<MessageCircle className="w-4 h-4" />}
                    onClick={onOpenConsultationModal}
                  >
                    Agendar Consultoria pelo WhatsApp
                  </Button>

                  <Button
                    variant="primary"
                    isLoading={true}
                  >
                    Carregando...
                  </Button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-700">Tamanhos de Botão</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" variant="outline">Pequeno (36px)</Button>
                  <Button size="md" variant="outline">Médio (44px)</Button>
                  <Button size="lg" variant="outline">Grande (50px)</Button>
                </div>
              </div>
            </Card>

            <Card className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 border-slate-200">
                Badges de Etiqueta e Validação
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-bold">Badges Temáticos:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="emerald" icon={<ShieldCheck className="w-3 h-3" />}>CRP 01/14042</Badge>
                    <Badge variant="sky" icon={<Sparkles className="w-3 h-3" />}>Artigo Validado</Badge>
                    <Badge variant="amber" icon={<Clock className="w-3 h-3" />}>Leitura: 6 min</Badge>
                    <Badge variant="teal" icon={<Stethoscope className="w-3 h-3" />}>TCC & Gestalt</Badge>
                    <Badge variant="rose" icon={<AlertTriangle className="w-3 h-3" />}>Apoio Emocional</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-2 font-bold">Variantes de Tamanho:</p>
                  <div className="flex items-center gap-2">
                    <Badge size="sm" variant="emerald">Badge Pequena (11px)</Badge>
                    <Badge size="md" variant="emerald">Badge Média (12px)</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 4: CARDS CATALOG */}
      {activeTab === 'cards' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <FileText className="w-6 h-6 text-emerald-700" />
              Catálogo de Cards do Portal
            </h2>
            <p className="text-slate-600 text-sm">
              Padrões visuais reutilizáveis para exibição de artigos científicos, casos clínicos, ferramentas e FAQs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Artigo */}
            <Card hoverable className="space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald">Ansiedade</Badge>
                  <span className="text-[11px] text-slate-400 font-medium">6 min de leitura</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  Como Interromper o Ciclo da Ruminação Mental na Ansiedade
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  Técnicas reestruturativas da TCC e conceitos de presença da Gestalt-terapia para desacelerar pensamentos intrusivos.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                <span>Ler Artigo Científico</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>

            {/* Card Caso Clínico */}
            <Card hoverable className="space-y-3 bg-slate-900 text-white border-slate-800 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="teal">Estudo de Caso Anonimizado</Badge>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  Superação de Ataques de Pânico com Exposição Interoceptiva
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  Relato clínico sigiloso ilustrando o manejo dos sintomas somáticos do pânico através do protocolo de TCC.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-bold">
                <span>Ver Análise Clínica</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>

            {/* Card Ferramenta */}
            <Card hoverable className="space-y-3 flex flex-col justify-between border-sky-200 bg-sky-50/40">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="sky">Teste Clínico</Badge>
                  <span className="text-[11px] font-bold text-sky-800">Autoavaliação</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  Escala GAD-7 para Arrastreamento da Ansiedade
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  Instrumento validado para mensurar o nível de ansiedade nos últimos 14 dias com feedback imediato.
                </p>
              </div>
              <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-sky-800 font-bold">
                <span>Iniciar Teste Gratuito</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 5: FORMS & INPUTS */}
      {activeTab === 'forms' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Search className="w-6 h-6 text-emerald-700" />
              Campos de Formulário & Controles de Entrada
            </h2>
            <p className="text-slate-600 text-sm">
              Campos com estados acessíveis, rótulos claros e microinterações puras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 border-slate-200">
                Campos de Texto & Busca
              </h3>

              <Input
                label="Nome do Paciente ou Visitante"
                placeholder="Ex: Maria Silva"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                helperText="Identificação para personalização no agendamento."
              />

              <Input
                label="Pesquisa na Biblioteca Científica"
                placeholder="Busque por 'Ansiedade', 'GAD-7', 'TCC'..."
                leftIcon={<Search className="w-4 h-4" />}
              />

              <Input
                label="Campo com Erro de Validação"
                placeholder="exemplo@email"
                defaultValue="email-invalido"
                error="Por favor, informe um endereço de e-mail válido."
              />
            </Card>

            <Card className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 border-slate-200">
                Seletores, Toggles & Radios
              </h3>

              {/* Textarea */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Relato de Sintomas ou Dúvida Psicoeducativa
                </label>
                <textarea
                  rows={3}
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  placeholder="Descreva brevemente o que está buscando..."
                  className="w-full bg-white/90 border border-slate-200 rounded-2xl p-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              {/* Radios */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Abordagem Psicológica de Preferência
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="approach"
                      value="tcc"
                      checked={radioState === 'tcc'}
                      onChange={() => setRadioState('tcc')}
                      className="text-emerald-700 focus:ring-emerald-500"
                    />
                    Terapia Cognitivo-Comportamental
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="approach"
                      value="gestalt"
                      checked={radioState === 'gestalt'}
                      onChange={() => setRadioState('gestalt')}
                      className="text-emerald-700 focus:ring-emerald-500"
                    />
                    Gestalt-terapia
                  </label>
                </div>
              </div>

              {/* Switch Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <div className="text-xs font-bold text-slate-800">Modo de Leitura Focada</div>
                  <div className="text-[11px] text-slate-500">Ocultar barras laterais para leitura de artigos extensos</div>
                </div>
                <button
                  onClick={() => setSwitchState(!switchState)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    switchState ? 'bg-emerald-700' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${
                      switchState ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 6: INTERACTIVE COMPONENTS */}
      {activeTab === 'components' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <LayoutGrid className="w-6 h-6 text-emerald-700" />
              Componentes de Interface Interativos
            </h2>
            <p className="text-slate-600 text-sm">
              Accordions, avisos clínicos, toasts de notificação e carregadores de esqueleto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Accordion & Alerts */}
            <Card className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 border-slate-200">
                Accordion de Perguntas Frequentes (FAQ)
              </h3>

              <Accordion
                items={[
                  {
                    id: 'faq-1',
                    categoryBadge: 'Consulta',
                    title: 'Como funciona a primeira sessão de psicoterapia?',
                    content: 'A primeira sessão é um momento de acolhimento e escuta inicial. O psicólogo compreende suas demandas, histórico de vida e define colaborativamente os objetivos terapêuticos.'
                  },
                  {
                    id: 'faq-2',
                    categoryBadge: 'Sigilo',
                    title: 'As consultas online possuem garantia de sigilo profissional?',
                    content: 'Sim, integralmente. As sessões ocorrem em salas virtuais com criptografia de ponta a ponta e seguem rigorosamente o Código de Ética Profissional do Psicólogo (CFP).'
                  }
                ]}
              />

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-700">Avisos e Alertas do Portal</h4>
                <Alert type="info" title="Nota Científica">
                  Este artigo foi revisado com base na versão atualizada do DSM-5-TR e CID-11.
                </Alert>
                <Alert type="clinical" title="Atendimento de Emergência">
                  Se estiver vivenciando uma crise emocional grave, ligue gratuitamente para o CVV no número 188 ou procure o pronto-socorro mais próximo.
                </Alert>
              </div>
            </Card>

            {/* Toast & Skeletons */}
            <Card className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 border-slate-200">
                Toasts & Carregadores de Esqueleto (Skeletons)
              </h3>

              <div className="space-y-3">
                <Button variant="outline" icon={<Bell className="w-4 h-4" />} onClick={triggerToast}>
                  Testar Notificação Toast
                </Button>

                {toastVisible && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-xl flex items-center gap-3 animate-slideDown border border-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold">Resultado do Teste Salvo</p>
                      <p className="text-slate-300">Você pode revisar seus dados a qualquer momento.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700">Estado de Carregamento (Skeleton Loaders)</h4>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <div className="pt-2 flex gap-2">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 7: GUIDELINES & MANUAL */}
      {activeTab === 'guidelines' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-emerald-700" />
              Manual do Design System & Boas Práticas Clínicas
            </h2>
            <p className="text-slate-600 text-sm">
              Diretrizes de utilização para manter a integridade visual e ética em todo o portal do Dr. André Lemos Vieira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="space-y-4 bg-emerald-50/60 border-emerald-200">
              <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" /> Boas Práticas Obrigatórias (O que Fazer)
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-slate-800 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">&bull;</span>
                  <span><strong>Humanização e Acolhimento:</strong> Use linguagem clara, livre de jargões excessivos e pautada no empoderamento do paciente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">&bull;</span>
                  <span><strong>Validação com CRP:</strong> Todo cabeçalho e rodapé deve referenciar a inscrição profissional (CRP 01/14042).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">&bull;</span>
                  <span><strong>Disclaimers Visíveis:</strong> Ferramentas e testes devem conter alertas explícitos de que não constituem diagnóstico médico.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">&bull;</span>
                  <span><strong>Contraste e Acessibilidade:</strong> Mantenha cores com leitura alta para acomodar leitores com fadiga ocular ou déficit visual.</span>
                </li>
              </ul>
            </Card>

            <Card className="space-y-4 bg-rose-50/60 border-rose-200">
              <h3 className="text-base font-bold text-rose-950 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-700" /> Vedações do Sistema (O que NÃO Fazer)
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-slate-800 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">&bull;</span>
                  <span><strong>Proibido Promessas de Cura:</strong> Nunca utilize termos como "cura definitiva", "solução mágica" ou slogans sensacionalistas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">&bull;</span>
                  <span><strong>Evitar Estética Corporativa/Startup:</strong> Não utilize gradientes neon, efeitos reluzentes de IA genérica ou botões agressivos de venda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">&bull;</span>
                  <span><strong>Sem Apelo Hospitalar Frio:</strong> Evite excesso de brancos estéreis ou azuis cirúrgicos que remetam a ambiente hospitalar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">&bull;</span>
                  <span><strong>Sem Contagem Regressiva:</strong> Vede gatilhos de escassez comercial como cronômetros de promoção.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
