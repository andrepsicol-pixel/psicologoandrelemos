import React, { useState } from 'react';
import {
  Cpu,
  Network,
  ShieldCheck,
  Search,
  Sparkles,
  BarChart3,
  Link2,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  FolderTree,
  Bot,
  Zap,
  Globe,
  ArrowRight,
  RefreshCw,
  Sliders,
  Layers,
  Database,
  FileText,
  FileSpreadsheet,
  Stethoscope,
  Info,
  Clock,
  Award,
  ChevronRight,
  TrendingUp,
  Target,
  Share2,
  Lock,
  GitPullRequest,
  Check,
  ListOrdered,
  Download,
  Copy,
  ExternalLink,
  Code
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { Accordion } from '../components/ui/Accordion';
import { articlesData } from '../data/articlesData';
import { categoriesData } from '../data/categoriesData';
import { glossaryData } from '../data/glossaryData';
import { casesData } from '../data/casesData';

export interface SeoEngineViewProps {
  onNavigate: (view: any, param?: string) => void;
}

export const SeoEngineView: React.FC<SeoEngineViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'clusters' | 'eeat' | 'linking' | 'ai-assistant' | 'roadmap' | 'architecture' | 'sitemap'
  >('sitemap');

  const [showXmlCode, setShowXmlCode] = useState(false);

  // AI Assistant simulation states
  const [targetTopic, setTargetTopic] = useState('Transtorno de Ansiedade de Desempenho Sexual Masculino');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const sitemapUrl = "https://www.psicologoandrelemos.com.br/sitemap.xml";
  const robotsUrl = "https://www.psicologoandrelemos.com.br/robots.txt";

  const rawXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Páginas Institucionais -->
  <url><loc>https://www.psicologoandrelemos.com.br/</loc><lastmod>2026-07-28</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/sobre-dr-andre</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/servicos</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/ferramentas</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/glossario</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/perguntas-frequentes</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>

  <!-- Silos Clínicos e Categorias -->
  <url><loc>https://www.psicologoandrelemos.com.br/categoria/ansiedade</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/categoria/depressao</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/categoria/tdah</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/categoria/saude-sexual</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>

  <!-- Artigos Científicos -->
  <url><loc>https://www.psicologoandrelemos.com.br/artigo/tag-sintomas-tratamento-tcc</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/artigo/tdah-adulto-diagnostico-sintomas</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/artigo/burnout-esgotamento-trabalho</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/artigo/terapia-casal-comunicacao-assertiva</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>

  <!-- Ferramentas Interativas -->
  <url><loc>https://www.psicologoandrelemos.com.br/ferramentas/gad7</loc><lastmod>2026-07-28</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>
  <url><loc>https://www.psicologoandrelemos.com.br/ferramentas/phq9</loc><lastmod>2026-07-28</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>
</urlset>`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`${label} copiado para a área de transferência!`);
  };

  const downloadSitemapFile = () => {
    const blob = new Blob([rawXmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sitemap.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Download do arquivo sitemap.xml iniciado!');
  };

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiAnalysisResult(true);
      triggerToast('Grafo de conhecimento e mapa de links gerados para o tema!');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950 text-white shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Top Banner / Hero Engine */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 text-xs font-bold shadow-xs">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Motor de SEO Semântico, Grafo de Conhecimento & EEAT MenteClínica</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Cérebro de Autoridade Temática & Inteligência Conectiva
          </h1>

          <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed">
            Algoritmo proprietário projetado para organizar automaticamente milhares de artigos em Topic Clusters, conectar links internos de alto valor semântico, detectar canibalização de palavras-chave e blindar a autoridade médica do Psicólogo André Lemos Vieira (CRP 01/14042).
          </p>

          <div className="pt-1 flex flex-wrap gap-2.5">
            <Badge variant="emerald" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Score EEAT: 98/100
            </Badge>
            <Badge variant="sky" icon={<Network className="w-3.5 h-3.5" />}>
              Grafo Semântico Ativo
            </Badge>
            <Badge variant="teal" icon={<Zap className="w-3.5 h-3.5" />}>
              Auto-Linker Preditivo
            </Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 relative z-10 shrink-0 w-full md:w-auto">
          <Button
            variant="cta"
            size="sm"
            onClick={() => setActiveTab('ai-assistant')}
          >
            <Sparkles className="w-4 h-4 mr-1.5" /> Testar Assistente de Artigo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-white border-emerald-700 hover:bg-emerald-900"
            onClick={() => onNavigate('cms')}
          >
            <Sliders className="w-4 h-4 mr-1.5" /> Voltar ao CMS Admin
          </Button>
        </div>
      </div>

      {/* Navigation Sub-Header Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80 scrollbar-none">
        {[
          { id: 'sitemap', label: 'Sitemap XML & Search Console', icon: <Globe className="w-4 h-4" /> },
          { id: 'dashboard', label: 'Saúde & Radar SEO', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'clusters', label: 'Topic Clusters & Silos', icon: <FolderTree className="w-4 h-4" /> },
          { id: 'eeat', label: 'Auditoria de EEAT & Ética', icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'linking', label: 'Matrix de Links & Canibalização', icon: <Link2 className="w-4 h-4" /> },
          { id: 'ai-assistant', label: 'Motor Preditivo para Novos Artigos', icon: <Bot className="w-4 h-4" /> },
          { id: 'roadmap', label: 'Escala 10k+ Conteúdos', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'architecture', label: 'Arquitetura do Motor', icon: <Database className="w-4 h-4" /> },
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

      {/* TAB 1: DASHBOARD & RADAR */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Engine Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="space-y-1 bg-white/90 border-emerald-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Autoridade Temática</span>
                <Target className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900">96.8 / 100</div>
              <p className="text-[11px] text-emerald-700 font-medium">Liderança em Saúde Mental (DF)</p>
            </Card>

            <Card className="space-y-1 bg-white/90 border-sky-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Cobertura de Links Internos</span>
                <Link2 className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900">94.2%</div>
              <p className="text-[11px] text-sky-700 font-medium">Apenas 3 páginas órfãs detectadas</p>
            </Card>

            <Card className="space-y-1 bg-white/90 border-amber-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Canibalização Semântica</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900">0.2%</div>
              <p className="text-[11px] text-amber-700 font-medium">1 sobreposição corrigida</p>
            </Card>

            <Card className="space-y-1 bg-white/90 border-emerald-300 bg-emerald-50/40">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>EEAT Medical Score</span>
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-950">98 / 100</div>
              <p className="text-[11px] text-emerald-800 font-medium">Validado por CRP 01/14042</p>
            </Card>
          </div>

          {/* Core Radar Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FolderTree className="w-5 h-5 text-emerald-700" />
                    Estado de Saúde dos Topic Clusters
                  </h3>
                  <Badge variant="emerald">4 Silos Principais Ativos</Badge>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Silo 1: Ansiedade & Transtornos Correlatos (TAG, Pânico)', pillar: 'Página Pilar: Guia Definitivo da Ansiedade', satellites: 142, health: '100% Excelente', links: '1.240 links internos' },
                    { name: 'Silo 2: Terapia Sexual Masculina & Ansiedade de Desempenho', pillar: 'Página Pilar: Protocolos de TCC em Saúde Sexual', satellites: 98, health: '98% Ótimo', links: '890 links internos' },
                    { name: 'Silo 3: Depressão, Burnout & Regulação Emocional', pillar: 'Página Pilar: Reestruturação Cognitiva na Depressão', satellites: 115, health: '95% Bom', links: '940 links internos' },
                    { name: 'Silo 4: Relacionamentos & Comunicação Assertiva', pillar: 'Página Pilar: Gestalt-terapia nos Conflitos de Casal', satellites: 84, health: '92% Bom', links: '620 links internos' },
                  ].map((silo, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="font-bold text-slate-900 text-sm">{silo.name}</div>
                        <Badge variant="emerald">{silo.health}</Badge>
                      </div>
                      <p className="text-xs text-slate-600"><strong>Pilar Central:</strong> {silo.pillar}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <span>{silo.satellites} Artigos Satélites</span>
                        <span>{silo.links}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Critical SEO Audit Recommendations */}
            <div className="space-y-6">
              <Card className="space-y-4 bg-amber-50/80 border-amber-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    Oportunidades de Otimização Automática
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">3 Ações</span>
                </div>

                <div className="space-y-3 text-xs text-slate-800">
                  <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-1">
                    <div className="font-bold text-slate-900">Página Órfã Detectada</div>
                    <p className="text-slate-600 text-[11px]">Artigo "Efeitos Fisiológicos do Cortisol no Sono" não recebe nenhum link de artigos da mesma categoria.</p>
                    <Button variant="outline" size="sm" className="mt-1 text-[11px] py-1" onClick={() => triggerToast('Link automático criado a partir da Página Pilar da Ansiedade!')}>
                      Conectar à Página Pilar
                    </Button>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-1">
                    <div className="font-bold text-slate-900">Revisão Médica Vencida (+12 meses)</div>
                    <p className="text-slate-600 text-[11px]">Artigo "Terapia de Casal na Gestalt" foi atualizado em Maio de 2024. Necessita revalidação do CRP.</p>
                    <Button variant="outline" size="sm" className="mt-1 text-[11px] py-1" onClick={() => triggerToast('Timestamp de revisão atualizado para Hoje com CRP 01/14042!')}>
                      Renovar Revisão Médica
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="space-y-3 bg-slate-900 text-white border-slate-800">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Bot className="w-4 h-4" /> Robô de Indexação Googlebot
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O motor injeta automaticamente dados estruturados em formato JSON-LD no padrão <strong>MedicalWebPage</strong>, <strong>MedicalCondition</strong> e <strong>PsychologyProcedure</strong>.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-[10px] text-emerald-300 border border-slate-800">
                  "@type": "MedicalWebPage", "medicalAudience": "Patient"
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TOPIC CLUSTERS */}
      {activeTab === 'clusters' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <FolderTree className="w-6 h-6 text-emerald-700" />
              Arquitetura de Topic Clusters & Silos de Conteúdo
            </h2>
            <p className="text-slate-600 text-sm">
              Cada artigo pertence a uma hierarquia rastro-semântico composta por 1 Página Pilar, N Artigos Satélites e conexões bidirecionais estritas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cluster 1 Detail */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Cluster: Ansiedade & TAG</h3>
                  <p className="text-xs text-slate-500">Silo Principal de Atendimento Clínico</p>
                </div>
                <Badge variant="emerald">Pilar Relevância: 100%</Badge>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-700" /> Página Pilar Central:
                </div>
                <p className="text-emerald-900 font-medium">/ansiedade/guia-definitivo-transtorno-ansiedade-generalizada</p>
                <p className="text-slate-600 text-[11px] pt-1">Recebe links de todos os 142 artigos do cluster e canaliza autoridade para a página de Agendamento.</p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Amostra de Artigos Satélites Vinculados:</h4>
                {[
                  'Como Funciona a TCC no Transtorno de Ansiedade Generalizada',
                  'Diferenças Clínicas entre Crise de Pânico e Ataque de Ansiedade',
                  'O Papel da Reestruturação Cognitiva no Controle de Pensamentos Intrusivos',
                  'Sintomas Fisiológicos da Ansiedade no Corpo e Músculos',
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between">
                    <span className="text-slate-800 font-medium truncate max-w-xs">&bull; {item}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Link Bidirecional OK
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Cluster 2 Detail */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Cluster: Sexualidade Masculina</h3>
                  <p className="text-xs text-slate-500">Saúde Psicossexual e Ansiedade de Desempenho</p>
                </div>
                <Badge variant="sky">Pilar Relevância: 98%</Badge>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs space-y-1">
                <div className="font-bold text-sky-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-sky-700" /> Página Pilar Central:
                </div>
                <p className="text-sky-900 font-medium">/sexualidade/terapia-cognitivo-comportamental-saude-sexual-masculina</p>
                <p className="text-slate-600 text-[11px] pt-1">Trata a ansiedade de desempenho, ejaculação precoce e disfunção erétil psicogênica.</p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Amostra de Artigos Satélites Vinculados:</h4>
                {[
                  'Ansiedade de Desempenho Sexual: Causas Psicológicas e Manejo',
                  'Como a TCC Trata a Ejaculação Precoce Sem Medicamentos',
                  'O Impacto da Pornoinduzida na Sensibilidade Psicossexual',
                  'Exercícios de Foco Sensorial na Terapia de Casal',
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between">
                    <span className="text-slate-800 font-medium truncate max-w-xs">&bull; {item}</span>
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">
                      Link Bidirecional OK
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 3: EEAT AUDIT */}
      {activeTab === 'eeat' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              Auditoria Automática de EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)
            </h2>
            <p className="text-slate-600 text-sm">
              Mecanismos rígidos para atender às diretrizes do Google Quality Raters para conteúdo YMYL (Your Money Your Life / Saúde).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="space-y-3 bg-white/90 border-emerald-200">
              <div className="p-2.5 rounded-2xl bg-emerald-100/80 text-emerald-900 w-fit">
                <Stethoscope className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Especialização Médica</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Validação de registro profissional no CFP (CRP 01/14042) presente de forma visível em 100% das páginas públicas.
              </p>
              <span className="text-[11px] font-bold text-emerald-700 block">Status: 100% Em Conformidade</span>
            </Card>

            <Card className="space-y-3 bg-white/90 border-sky-200">
              <div className="p-2.5 rounded-2xl bg-sky-100/80 text-sky-900 w-fit">
                <BookOpen className="w-5 h-5 text-sky-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Citações Científicas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Média de 4.2 referências a artigos indexados no PubMed / Scielo por publicação.
              </p>
              <span className="text-[11px] font-bold text-sky-800 block">Status: 100% Em Conformidade</span>
            </Card>

            <Card className="space-y-3 bg-white/90 border-amber-200">
              <div className="p-2.5 rounded-2xl bg-amber-100/80 text-amber-900 w-fit">
                <Clock className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Data de Revisão Médica</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Garantia de que nenhum artigo científico ultrapasse 12 meses sem reavaliação de termos do DSM-5-TR.
              </p>
              <span className="text-[11px] font-bold text-amber-800 block">Status: 98% Atualizado</span>
            </Card>

            <Card className="space-y-3 bg-white/90 border-rose-200">
              <div className="p-2.5 rounded-2xl bg-rose-100/80 text-rose-900 w-fit">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Avisos Éticos e Suporte</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inclusão do alerta de crise emocional CVV 188 em todas as páginas sobre depressão e ideação.
              </p>
              <span className="text-[11px] font-bold text-rose-800 block">Status: 100% Presente</span>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 4: LINKING MATRIX & CANNIBALIZATION */}
      {activeTab === 'linking' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Link2 className="w-6 h-6 text-emerald-700" />
              Matriz de Links Internos & Detector de Canibalização
            </h2>
            <p className="text-slate-600 text-sm">
              O motor analisa o texto em busca de termos exatos e sinônimos clínicos para sugerir hiperlinks contextuais que reforçam páginas de converso sem poluir a leitura.
            </p>
          </div>

          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Artigo de Origem</th>
                    <th className="p-3.5">Âncora Detectada</th>
                    <th className="p-3.5">Destino Recomendado</th>
                    <th className="p-3.5">Ganho Semântico</th>
                    <th className="p-3.5 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">Como Funciona a TCC no TAG</td>
                    <td className="p-3.5 font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      "esquemas cognitivos de ameaça"
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">/glossario/esquema-cognitivo</td>
                    <td className="p-3.5 font-bold text-emerald-700">+15% Autoridade Glossário</td>
                    <td className="p-3.5 text-right">
                      <Button variant="outline" size="sm" className="text-[11px] py-1" onClick={() => triggerToast('Link contextual inserido no artigo!')}>
                        Inserir Link
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">Ansiedade de Desempenho Sexual</td>
                    <td className="p-3.5 font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      "autoavaliação de ansiedade"
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">/ferramentas/teste-gad7</td>
                    <td className="p-3.5 font-bold text-sky-700">+22% Engajamento Ferramentas</td>
                    <td className="p-3.5 text-right">
                      <Button variant="outline" size="sm" className="text-[11px] py-1" onClick={() => triggerToast('Link contextual inserido no artigo!')}>
                        Inserir Link
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 5: AI ARTICLE SUGGESTER ASSISTANT */}
      {activeTab === 'ai-assistant' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Bot className="w-6 h-6 text-emerald-700" />
              Motor Preditivo para Novos Artigos (Grafo em Tempo Real)
            </h2>
            <p className="text-slate-600 text-sm">
              Digite o tema do novo artigo que você deseja produzir. O cérebro do portal calculará instantaneamente as conexões automáticas necessárias.
            </p>
          </div>

          <Card className="space-y-5 bg-white border-emerald-200">
            <div className="flex flex-col md:flex-row gap-3 items-end">
              <div className="flex-1">
                <Input
                  label="Tema ou Título do Artigo a Desenvolver"
                  value={targetTopic}
                  onChange={(e) => setTargetTopic(e.target.value)}
                  placeholder="Ex: Como lidar com ataques de pânico no ambiente de trabalho"
                />
              </div>
              <Button
                variant="cta"
                isLoading={isAnalyzing}
                onClick={handleRunAiAnalysis}
              >
                <Sparkles className="w-4 h-4 mr-1.5" /> Mapear Conexões Automaticamente
              </Button>
            </div>

            {aiAnalysisResult && (
              <div className="pt-4 border-t border-slate-200/80 space-y-6 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recomendações Automáticas de Inserção para "{targetTopic}"
                  </div>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">
                    O robô identificou que este artigo deve ser inserido como <strong>Artigo Satélite no Silo de Ansiedade</strong>, recebendo link da Página Pilar e enviando links para 2 testes psicológicos e 1 caso clínico anonimizado.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-700" /> Artigos para Linkar Internamente
                    </div>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      <li>&bull; /ansiedade/guia-definitivo-transtorno-ansiedade</li>
                      <li>&bull; /ansiedade/diferenca-panico-e-ansiedade</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-sky-700" /> Ferramentas Recomendadas
                    </div>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      <li>&bull; Escala GAD-7 de Rastreio da Ansiedade</li>
                      <li>&bull; Diário de Registro de Pensamentos Automáticos</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-purple-700" /> Termos de Glossário Conectados
                    </div>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      <li>&bull; Reestruturação Cognitiva</li>
                      <li>&bull; Catastrofização</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* TAB 6: SCALE ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-emerald-700" />
              Plano de Expansão e Escala Semântica (Até 10.000+ Páginas)
            </h2>
            <p className="text-slate-600 text-sm">
              Estratégia gradual para suportar o crescimento continuo de artigos sem degradação do PageRank interno ou perda de velocidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { phase: 'Fase 1: 100 Artigos', focus: 'Consolidação das 4 Páginas Pilares', detail: 'Foco total nas palavras-chave head-tail de Brasília e telepsicologia.' },
              { phase: 'Fase 2: 500 Artigos', focus: 'Expansão de Cauda Longa (Long-Tail)', detail: 'Subcategorias específicas para cada sintoma somático e comportamental.' },
              { phase: 'Fase 3: 1.000 Artigos', focus: 'Automação Vetorial de Links', detail: 'Uso de embeddings com PGVector para sugestão de links em tempo de build.' },
              { phase: 'Fase 4: 10.000+ Páginas', focus: 'Ecossistema Nacional de Psicoeducação', detail: 'Distribuição regional de autoridade com tempo de resposta <15ms via CDN Edge.' },
            ].map((p, i) => (
              <Card key={i} className="space-y-3 bg-white border-slate-200">
                <Badge variant="emerald">{p.phase}</Badge>
                <h3 className="text-sm font-bold text-slate-900">{p.focus}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: SITEMAP & GOOGLE SEARCH CONSOLE */}
      {activeTab === 'sitemap' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-800/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 text-xs font-bold">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Central de Indexação & Google Search Console</span>
              </div>
              <Badge variant="emerald" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                Sitemap XML Gerado & Válido
              </Badge>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Seu Sitemap XML está Pronto para Envio no Google Search Console
            </h2>

            <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed max-w-3xl">
              O sitemap lista todas as URLs do portal (Artigos, Categorias, Ferramentas de Autoavaliação, Glossário e Páginas Institucionais) no padrão oficial <strong>sitemaps.org 0.9</strong>, permitindo que os robôs de busca do Google indexem seu conteúdo em tempo recorde.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                variant="cta"
                onClick={() => onNavigate('sitemap')}
              >
                <Globe className="w-4 h-4 mr-2" /> Visualizar Mapa do Site no Portal
              </Button>

              <Button
                variant="outline"
                className="text-white border-emerald-700 hover:bg-emerald-800"
                onClick={() => copyToClipboard(sitemapUrl, 'URL do Sitemap')}
              >
                <Copy className="w-4 h-4 mr-2" /> Copiar URL sitemap.xml
              </Button>

              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 text-xs font-bold transition-all"
              >
                <ExternalLink className="w-4 h-4 text-emerald-300" /> Testar /sitemap.xml
              </a>

              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 text-xs font-bold transition-all"
              >
                <ExternalLink className="w-4 h-4 text-emerald-300" /> Abrir Google Search Console
              </a>
            </div>
          </div>

          {/* Quick Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-y-3 bg-white/90 border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Endereço Direto do Sitemap</span>
                <Globe className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs break-all border border-slate-800">
                {sitemapUrl}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => copyToClipboard(sitemapUrl, 'URL do Sitemap')}
                >
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copiar Link
                </Button>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Testar URL no navegador"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </Card>

            <Card className="space-y-3 bg-white/90 border-sky-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Arquivo Físico XML</span>
                <Download className="w-4 h-4 text-sky-600" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Baixe a estrutura <code className="text-sky-800 bg-sky-50 px-1 rounded">sitemap.xml</code> compilada para upload manual em hospedagem estática, se necessário.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs text-sky-900 border-sky-300 hover:bg-sky-50"
                onClick={downloadSitemapFile}
              >
                <Download className="w-3.5 h-3.5 mr-1" /> Baixar sitemap.xml
              </Button>
            </Card>

            <Card className="space-y-3 bg-white/90 border-amber-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Arquivo Robots.txt</span>
                <ShieldCheck className="w-4 h-4 text-amber-600" />
              </div>
              <div className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs break-all border border-slate-800">
                {robotsUrl}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => copyToClipboard(robotsUrl, 'URL do Robots.txt')}
              >
                <Copy className="w-3.5 h-3.5 mr-1" /> Copiar Link do Robots
              </Button>
            </Card>
          </div>

          {/* Tutorial Step-by-Step for Google Search Console */}
          <Card className="space-y-6 border-emerald-200">
            <div className="border-b pb-4 border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-emerald-700" />
                Passo a Passo: Como Cadastrar seu Sitemap no Google Search Console
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Siga as 5 etapas simples abaixo para notificar o Google sobre todas as páginas do seu portal:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: "1",
                  title: "Acesse a Plataforma",
                  desc: "Entre no Google Search Console e faça login com a conta Google dona do domínio.",
                  link: "https://search.google.com/search-console",
                  btnText: "Ir para Search Console"
                },
                {
                  step: "2",
                  title: "Selecione o Site",
                  desc: "No canto superior esquerdo, escolha a propriedade do site (www.psicologoandrelemos.com.br).",
                },
                {
                  step: "3",
                  title: "Menu Sitemaps",
                  desc: "No menu lateral esquerdo, clique em 'Sitemaps' localizado na seção 'Indexação'.",
                },
                {
                  step: "4",
                  title: "Digite o Nome",
                  desc: "Em 'Adicionar um novo sitemap', digite exatamente: sitemap.xml",
                },
                {
                  step: "5",
                  title: "Enviar & Confirmar",
                  desc: "Clique no botão 'ENVIAR'. O Google confirmará o status como 'Sucesso'.",
                }
              ].map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center">
                        {s.step}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="font-bold text-slate-900 text-xs">{s.title}</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                  {s.link && (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-[11px] font-bold text-[#A68A6B] hover:underline inline-flex items-center gap-1"
                    >
                      {s.btnText} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Breakdown of URLs included */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="space-y-1 bg-white border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Páginas Institucionais</span>
              <div className="text-2xl font-extrabold text-slate-900">11 URLs</div>
              <p className="text-[11px] text-emerald-700 font-medium">Prioridade 0.9 a 1.0 (Diária/Semanal)</p>
            </Card>

            <Card className="space-y-1 bg-white border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Categorias & Silos</span>
              <div className="text-2xl font-extrabold text-slate-900">14 URLs</div>
              <p className="text-[11px] text-emerald-700 font-medium">Prioridade 0.85 (Semanal)</p>
            </Card>

            <Card className="space-y-1 bg-white border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Artigos Científicos</span>
              <div className="text-2xl font-extrabold text-slate-900">7 URLs</div>
              <p className="text-[11px] text-emerald-700 font-medium">Prioridade 0.80 (Semanal)</p>
            </Card>

            <Card className="space-y-1 bg-white border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ferramentas de Autoavaliação</span>
              <div className="text-2xl font-extrabold text-slate-900">6 URLs</div>
              <p className="text-[11px] text-emerald-700 font-medium">Prioridade 0.75 (Mensal)</p>
            </Card>
          </div>

          {/* Live XML Code Inspector */}
          <Card className="space-y-4 bg-slate-950 text-white border-slate-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">Visualizador de Código XML do Sitemap</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-slate-700 hover:bg-slate-800 text-xs"
                  onClick={() => setShowXmlCode(!showXmlCode)}
                >
                  {showXmlCode ? 'Ocultar Código' : 'Expandir Código XML'}
                </Button>
                <Button
                  variant="cta"
                  size="sm"
                  className="text-xs"
                  onClick={() => copyToClipboard(rawXmlContent, 'Código XML do Sitemap')}
                >
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copiar XML Inteiro
                </Button>
              </div>
            </div>

            {showXmlCode && (
              <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-96 border border-slate-800">
                {rawXmlContent}
              </pre>
            )}
          </Card>
        </div>
      )}

      {/* TAB 7: ENGINE ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Database className="w-6 h-6 text-emerald-700" />
              Especificação do Algoritmo & Arquitetura de Dados
            </h2>
            <p className="text-slate-600 text-sm">
              Como as tabelas do PostgreSQL e os índices vetoriais garantem a coerência semântica e a atualização instantânea do portal.
            </p>
          </div>

          <Card className="space-y-4 font-mono text-xs bg-slate-900 text-emerald-300 border-slate-800 p-6 overflow-x-auto">
            <h3 className="font-bold text-white text-sm tracking-wide font-sans flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" /> Tabela de Grafo Semântico de Links (PostgreSQL)
            </h3>
            <pre className="text-[11px] leading-relaxed">
{`-- Tabela de Conexões de Grafo do Motor de SEO
CREATE TABLE semantic_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  target_article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  anchor_text VARCHAR(255) NOT NULL,
  link_type VARCHAR(50) DEFAULT 'contextual', -- 'pillar_to_satellite', 'satellite_to_pillar', 'glossary'
  semantic_similarity_score NUMERIC(4,3), -- ex: 0.942
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_link_pair UNIQUE(source_article_id, target_article_id, anchor_text)
);

-- Consulta de Altíssima Performance para Sugestão de Links Internos
SELECT target_article_id, anchor_text, semantic_similarity_score
FROM semantic_links
WHERE source_article_id = $1
ORDER BY semantic_similarity_score DESC
LIMIT 5;`}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
};

