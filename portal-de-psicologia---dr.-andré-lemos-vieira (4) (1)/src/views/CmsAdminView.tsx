import React, { useState } from 'react';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  BookOpen,
  FolderHeart,
  FileSpreadsheet,
  Image as ImageIcon,
  Users,
  ShieldCheck,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Database,
  BarChart2,
  Link,
  Bot,
  Sliders,
  Save,
  Send,
  Calendar,
  Lock,
  Download,
  Share2,
  History,
  Layers,
  ChevronRight,
  ChevronDown,
  Info,
  Check,
  X,
  Copy,
  RefreshCw,
  HardDrive,
  Cpu,
  Globe,
  Tag,
  Stethoscope,
  Code
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { articlesData } from '../data/articlesData';
import { categoriesData } from '../data/categoriesData';
import { glossaryData } from '../data/glossaryData';
import { casesData } from '../data/casesData';

export interface CmsAdminViewProps {
  onNavigate: (view: any, param?: string) => void;
}

export const CmsAdminView: React.FC<CmsAdminViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'editor' | 'library' | 'categories' | 'glossary' | 'cases' | 'tests' | 'users' | 'audit' | 'architecture'
  >('dashboard');

  // Filter state for articles list in editor tab
  const [articleSearch, setArticleSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [editingArticleId, setEditingArticleId] = useState<string | null>('art-1');

  // Form states for the article editor
  const [editorTitle, setEditorTitle] = useState('Como Funciona a Terapia Cognitivo-Comportamental para Ansiedade Generalizada');
  const [editorSubtitle, setEditorSubtitle] = useState('Entenda o papel das distorções cognitivas, dos pensamentos automáticos e como a reestruturação reduz os sintomas em semanas.');
  const [editorSlug, setEditorSlug] = useState('como-funciona-tcc-ansiedade-generalizada');
  const [editorCategory, setEditorCategory] = useState('ansiedade');
  const [editorDsmCode, setEditorDsmCode] = useState('DSM-5 300.02 (F41.1)');
  const [editorSummary, setEditorSummary] = useState('A Terapia Cognitivo-Comportamental (TCC) é o tratamento de primeira escolha recomendado pela APA e NICE para o Transtorno de Ansiedade Generalizada. Este artigo detalha seus mecanismos científicos.');
  const [editorContent, setEditorContent] = useState(`## 1. O que é o Transtorno de Ansiedade Generalizada (TAG)?

O Transtorno de Ansiedade Generalizada caracteriza-se por uma preocupação excessiva, crônica e de difícil controle. Ao contrário de fobias específicas, a ansiedade no TAG é flutuante e abrange múltiplos domínios da vida diária, como trabalho, família e saúde.

### Principais Sintomas Fisiológicos e Cognitivos:
* Tensão muscular persistente e inquietude.
* Hipervigilância e sensação constante de perigo iminente.
* Fadiga mental e dificuldade de concentração.
* Alterações do sono (insônia inicial ou sono não reparador).

## 2. A Triade Cognitiva de Aaron Beck no TAG

Na perspectiva da TCC, a ansiedade generalizada é alimentada por esquemas cognitivos hiperativos de ameaça. O paciente tende a:
1. **Superestimar a probabilidade** de eventos negativos futuros.
2. **Subestimar a própria capacidade** de enfrentamento e resiliência.
3. **Desconsiderar os fatores de proteção** e suporte disponíveis.

> "A reestruturação cognitiva não busca pensamentos irrealisticamente positivos, mas sim uma avaliação precisa e funcional da realidade." — Psicólogo André Lemos Vieira (CRP 01/14042)`);
  
  // SEO assistant metrics
  const [metaTitle, setMetaTitle] = useState('TCC para Ansiedade Generalizada: Guia Completo | Psicólogo André Lemos Vieira');
  const [metaDesc, setMetaDesc] = useState('Descubra como a TCC trata o Transtorno de Ansiedade Generalizada (TAG) com evidências científicas. Artigo do Psicólogo André Lemos Vieira (CRP 01/14042).');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper AI generate action
  const handleAiGenerateMeta = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setMetaTitle(`${editorTitle.slice(0, 50)} | Psicólogo André Lemos Vieira`);
      setMetaDesc(`Guia especializado sobre ${editorCategory}. Embasado em evidências e elaborado pelo Psicólogo André Lemos Vieira (CRP 01/14042).`);
      setAiGenerating(false);
      showToast('Meta tags e Schema.org gerados automaticamente com IA MenteClínica!');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950 text-white shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Hero CMS */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>MenteClínica CMS &bull; Painel Administrativo de Escala High-Performance</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Gestão Editorial & Núcleo Científico
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Painel customizado para gerenciar mais de 100.000 conteúdos científicos com arquitetura Silo Cluster, inteligência SEO preditiva e auditoria ética rígida.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-slate-700 hover:bg-slate-800"
            onClick={() => onNavigate('home')}
          >
            <Globe className="w-4 h-4 mr-1.5" /> Ver Site
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-emerald-300 border-emerald-700/80 hover:bg-emerald-950/80 bg-emerald-950/40"
            onClick={() => onNavigate('seo-engine')}
          >
            <Cpu className="w-4 h-4 mr-1.5 text-emerald-400" /> Motor de SEO & Conhecimento
          </Button>
          <Button
            variant="cta"
            size="sm"
            onClick={() => {
              setActiveTab('editor');
              setEditingArticleId(null);
              setEditorTitle('');
              setEditorSummary('');
              setEditorContent('');
              showToast('Novo rascunho de artigo iniciado!');
            }}
          >
            <Plus className="w-4 h-4 mr-1.5" /> Criar Conteúdo
          </Button>
        </div>
      </div>

      {/* Navigation Sub-Header Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80 scrollbar-none">
        {[
          { id: 'dashboard', label: 'Dashboard & Métricas', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'editor', label: 'Editor Avançado de Artigos', icon: <FileText className="w-4 h-4" /> },
          { id: 'library', label: 'Biblioteca de Mídias', icon: <ImageIcon className="w-4 h-4" /> },
          { id: 'categories', label: 'Clusters & Silos (SEO)', icon: <FolderTree className="w-4 h-4" /> },
          { id: 'glossary', label: 'Glossário Técnico', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'cases', label: 'Casos Clínicos', icon: <FolderHeart className="w-4 h-4" /> },
          { id: 'tests', label: 'Instrumentos & Testes', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'users', label: 'Acessos & Permissões', icon: <Users className="w-4 h-4" /> },
          { id: 'audit', label: 'Logs de Auditoria', icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'architecture', label: 'Especificação Técnica', icon: <Database className="w-4 h-4" /> },
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

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="space-y-1 bg-white/90 border-emerald-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Publicados</span>
                <FileText className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900">520</div>
              <p className="text-[11px] text-emerald-700 font-medium">+12 esta semana</p>
            </Card>

            <Card className="space-y-1 bg-white/90 border-sky-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Score EEAT Geral</span>
                <ShieldCheck className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900">98/100</div>
              <p className="text-[11px] text-sky-700 font-medium">Classificação Máxima Google</p>
            </Card>

            <Card className="space-y-1 bg-white/90 border-amber-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Rascunhos em Revisão</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900">18</div>
              <p className="text-[11px] text-amber-700 font-medium">Aguardando parecer ético</p>
            </Card>

            <Card className="space-y-1 bg-white/90 border-purple-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Tráfego Orgânico Mês</span>
                <BarChart2 className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900">142.5k</div>
              <p className="text-[11px] text-purple-700 font-medium">+18% vs mês anterior</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Articles Table */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" /> Conteúdos Recentes do Portal
                </h3>
                <Badge variant="emerald">Total: 520 Artigos</Badge>
              </div>

              <Card className="p-0 overflow-hidden border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">Título do Artigo</th>
                        <th className="p-3.5">Categoria</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Score SEO</th>
                        <th className="p-3.5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {articlesData.slice(0, 5).map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900 max-w-xs truncate">
                            {art.title}
                          </td>
                          <td className="p-3.5">
                            <span className="capitalize px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                              {art.categoryId}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                              <CheckCircle2 className="w-3 h-3" /> Publicado
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-emerald-800">
                            96/100
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => {
                                setActiveTab('editor');
                                setEditingArticleId(art.id);
                                setEditorTitle(art.title);
                                setEditorSummary(art.summary);
                                setEditorContent(art.content);
                              }}
                              className="text-slate-600 hover:text-emerald-700 font-bold cursor-pointer"
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* AI Assistant & System Status Sidebar */}
            <div className="space-y-6">
              <Card className="space-y-4 bg-emerald-950 text-white border-emerald-800">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                  <Bot className="w-4 h-4 text-emerald-400" /> MenteClínica AI Editor
                </div>
                <h4 className="text-sm font-bold text-white">Assistente de Coprodução Científica</h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  A IA analisa seu rascunho em tempo real para apontar termos desatualizados do DSM-5-TR, lacunas em esquemas cognitivos e sugerir citações de estudos de meta-análise.
                </p>
                <Button variant="cta" size="sm" className="w-full text-xs" onClick={handleAiGenerateMeta}>
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Executar Auditoria de IA
                </Button>
              </Card>

              <Card className="space-y-3 bg-white/90 border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-slate-600" /> Saúde do Sistema & Indexação
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Sitemap XML gerado:</span>
                    <span className="font-bold text-emerald-700">OK (Auto-sync)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schema.org MedicalWebPage:</span>
                    <span className="font-bold text-emerald-700">Validados</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Latência de Leitura Redis:</span>
                    <span className="font-bold text-slate-800">12ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Backup Automático PostgreSQL:</span>
                    <span className="font-bold text-slate-800">Hoje às 04:00</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARTICLE EDITOR */}
      {activeTab === 'editor' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-6 h-6 text-emerald-700" />
                {editingArticleId ? `Editando Conteúdo: ${editingArticleId}` : 'Criar Novo Artigo Científico'}
              </h2>
              <p className="text-slate-600 text-xs md:text-sm">
                Editor modular de alta definição com auxílio preditivo de SEO, validação de termos éticos do CFP e vinculação de estudos.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => showToast('Rascunho salvo no armazenamento local!')}>
                <Save className="w-4 h-4 mr-1.5" /> Salvar Rascunho
              </Button>
              <Button variant="primary" size="sm" onClick={() => showToast('Artigo publicado com sucesso no portal!')}>
                <Send className="w-4 h-4 mr-1.5" /> Publicar no Portal
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Editor Form Inputs */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="space-y-5">
                <Input
                  label="Título Principal (H1)"
                  placeholder="Ex: Como a Terapia Cognitivo-Comportamental Trata a Ejaculação Precoce"
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                />

                <Input
                  label="Subtítulo / Chamada Editorial"
                  placeholder="Ex: Protocolos de controle de ansiedade de desempenho e foco sensorial..."
                  value={editorSubtitle}
                  onChange={(e) => setEditorSubtitle(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Slug Permanente (URL)"
                    value={editorSlug}
                    onChange={(e) => setEditorSlug(e.target.value)}
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Categoria do Silo
                    </label>
                    <select
                      value={editorCategory}
                      onChange={(e) => setEditorCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl p-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    >
                      {categoriesData.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Código DSM-5 / CID-11"
                    placeholder="Ex: DSM-5 300.02"
                    value={editorDsmCode}
                    onChange={(e) => setEditorDsmCode(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Resumo Executivo (Meta Summary)
                  </label>
                  <textarea
                    rows={3}
                    value={editorSummary}
                    onChange={(e) => setEditorSummary(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Conteúdo Principal em Markdown Científico
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {editorContent.length} caracteres
                    </span>
                  </div>
                  <textarea
                    rows={12}
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    className="w-full bg-slate-900 text-emerald-100 font-mono border border-slate-800 rounded-2xl p-4 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 leading-relaxed mb-4"
                  />

                  {/* Live Rendered Preview (Quiet Luxury) */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-[#A68A6B] uppercase tracking-wider">
                      Pré-visualização em Tempo Real (Quiet Luxury)
                    </span>
                    <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] max-h-96 overflow-y-auto">
                      <MarkdownRenderer content={editorContent} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: SEO Assistant & Metadata */}
            <div className="space-y-6">
              <Card className="space-y-4 bg-emerald-50/70 border-emerald-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    Assistente SEO & EEAT em Tempo Real
                  </h3>
                  <Badge variant="emerald">Score: 95/100</Badge>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/80 border border-emerald-100">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Tamanho do Título (H1)
                    </span>
                    <span className="font-bold text-emerald-800">Ideal (68 chars)</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/80 border border-emerald-100">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Citação do CRP 01/14042
                    </span>
                    <span className="font-bold text-emerald-800">Presente</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/80 border border-emerald-100">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Subtítulos H2/H3
                    </span>
                    <span className="font-bold text-emerald-800">Bem Estruturado</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/80 border border-emerald-100">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Schema MedicalWebPage
                    </span>
                    <span className="font-bold text-emerald-800">Injetado</span>
                  </div>
                </div>

                <Button
                  variant="cta"
                  size="sm"
                  className="w-full text-xs"
                  isLoading={aiGenerating}
                  onClick={handleAiGenerateMeta}
                >
                  <Bot className="w-3.5 h-3.5 mr-1.5" /> Gerar Meta Tags com IA MenteClínica
                </Button>
              </Card>

              {/* Meta Tags Form */}
              <Card className="space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Meta Tags & Snippets Google
                </h3>

                <Input
                  label="SEO Meta Title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  helperText="Recomendado: 50 - 60 caracteres."
                />

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Recomendado: 140 - 160 caracteres.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MEDIA LIBRARY */}
      {activeTab === 'library' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-emerald-700" />
                Biblioteca de Mídias e Ativos Científicos
              </h2>
              <p className="text-slate-600 text-xs md:text-sm">
                Gestão centralizada de infográficos, e-books em PDF, ilustrações anatômicas e fotos do consultório com texto alternativo (Alt-Text) para acessibilidade.
              </p>
            </div>

            <Button variant="primary" size="sm" onClick={() => showToast('Simulação de upload de arquivo concluída!')}>
              <Download className="w-4 h-4 mr-1.5 rotate-180" /> Fazer Upload de Novo Ativo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Infográfico do Ciclo do Pânico', type: 'Infográfico', format: 'PNG', size: '1.2 MB' },
              { title: 'Guia do Sono de Higiene (PDF)', type: 'Download', format: 'PDF', size: '2.4 MB' },
              { title: 'Foto Oficial do Consultório', type: 'Fotografia', format: 'WEBP', size: '420 KB' },
              { title: 'Esquema Cognitivo de Beck (Diagrama)', type: 'Ilustração', format: 'SVG', size: '85 KB' },
            ].map((media, i) => (
              <Card key={i} hoverable className="space-y-3">
                <div className="h-28 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-xs">
                  {media.type}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{media.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span>{media.format}</span>
                    <span>{media.size}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-[11px]" onClick={() => showToast('Link CDN copiado para a área de transferência!')}>
                  <Copy className="w-3 h-3 mr-1" /> Copiar Link CDN
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CATEGORIES & SILO CLUSTERS */}
      {activeTab === 'categories' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <FolderTree className="w-6 h-6 text-emerald-700" />
              Gestão de Silos Temáticos e Clusters
            </h2>
            <p className="text-slate-600 text-sm">
              Organização das páginas pilares e agrupamentos lógicos de conteúdo para distribuição estratégica de autoridade orgânica (PageRank interno).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.map((cat) => (
              <Card key={cat.id} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="font-extrabold text-slate-900 text-base">{cat.name}</div>
                  <Badge variant="emerald">{cat.articlesCount} Artigos</Badge>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{cat.shortDesc}</p>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Subcategorias no Cluster:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs text-emerald-700 font-bold border-t border-slate-100">
                  <span>Silo Cluster: {cat.siloCluster}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-700" />
                Glossário Técnico de Termos Psicológicos
              </h2>
              <p className="text-slate-600 text-xs md:text-sm">
                Definições clínicas rigorosas para alimentar Rich Snippets de definição e internal linking automático.
              </p>
            </div>

            <Button variant="primary" size="sm" onClick={() => showToast('Novo termo adicionado ao glossário!')}>
              <Plus className="w-4 h-4 mr-1.5" /> Adicionar Novo Termo
            </Button>
          </div>

          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Termo Técnico</th>
                    <th className="p-3.5">Categoria</th>
                    <th className="p-3.5">Definição Resumida</th>
                    <th className="p-3.5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {glossaryData.map((term) => (
                    <tr key={term.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{term.term}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          {term.category}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 max-w-md truncate">{term.definition}</td>
                      <td className="p-3.5 text-right">
                        <button className="text-emerald-700 font-bold hover:underline cursor-pointer">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 6: CASES */}
      {activeTab === 'cases' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <FolderHeart className="w-6 h-6 text-emerald-700" />
              Estudos de Caso Clínicos Anonimizados
            </h2>
            <p className="text-slate-600 text-sm">
              Relatos sigilosos elaborados sob as diretrizes do Código de Ética (CFP) para exemplificar intervenções práticas em TCC e Gestalt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {casesData.map((cs) => (
              <Card key={cs.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="teal">{cs.category}</Badge>
                  <span className="text-xs text-slate-500 font-medium">{cs.patientAgeGender}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{cs.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed"><strong>Queixa Inicial:</strong> {cs.initialComplaint}</p>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-800">Formulação TCC:</p>
                  <p className="text-slate-600 leading-relaxed">{cs.cbtFormulation}</p>
                </div>
                <div className="pt-2 flex justify-between items-center text-xs font-bold text-emerald-700">
                  <span>Duração: {cs.sessionsDuration}</span>
                  <button className="hover:underline cursor-pointer">Ver Relato Completo</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: PSYCHOLOGICAL TESTS */}
      {activeTab === 'tests' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <FileSpreadsheet className="w-6 h-6 text-emerald-700" />
              Instrumentos & Testes Psicológicos de Rastreio
            </h2>
            <p className="text-slate-600 text-sm">
              Configurador de escalas psicoeducativas validadas (ex: GAD-7, PHQ-9, IIEF-5) com regras de pontuação e avisos clínicos automáticos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Escala GAD-7', target: 'Ansiedade Generalizada', itemsCount: 7, status: 'Ativo' },
              { name: 'Inventário PHQ-9', target: 'Sintomas Depressivos', itemsCount: 9, status: 'Ativo' },
              { name: 'Índice IIEF-5', target: 'Saúde Sexual Masculina', itemsCount: 5, status: 'Ativo' },
            ].map((test, idx) => (
              <Card key={idx} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="sky">{test.status}</Badge>
                  <span className="text-xs text-slate-500">{test.itemsCount} Perguntas</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{test.name}</h3>
                <p className="text-xs text-slate-600"><strong>Alvo de Rastreio:</strong> {test.target}</p>
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => showToast(`Configurações de ${test.name} salvas!`)}>
                  <Sliders className="w-3.5 h-3.5 mr-1" /> Editar Regras e Faixas
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: USERS & PERMISSIONS */}
      {activeTab === 'users' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Users className="w-6 h-6 text-emerald-700" />
              Controle de Acessos & Matriz de Permissões
            </h2>
            <p className="text-slate-600 text-sm">
              Gerenciamento de papéis para manter o rigor técnico e ético das publicações.
            </p>
          </div>

          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Usuário</th>
                    <th className="p-3.5">Papel</th>
                    <th className="p-3.5">Credencial CRP</th>
                    <th className="p-3.5">Permissões</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">Dr. André Lemos Vieira</td>
                    <td className="p-3.5">
                      <Badge variant="emerald">Administrador Geral</Badge>
                    </td>
                    <td className="p-3.5 font-mono text-slate-800">CRP 01/14042</td>
                    <td className="p-3.5 text-slate-600">Acesso Irrestrito + Aprovação Final</td>
                    <td className="p-3.5 text-right font-bold text-emerald-700">Ativo</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">Revisor Clínico Sênior</td>
                    <td className="p-3.5">
                      <Badge variant="sky">Revisor Ético</Badge>
                    </td>
                    <td className="p-3.5 font-mono text-slate-800">CRP 01/18200</td>
                    <td className="p-3.5 text-slate-600">Aprovação Científica e Checagem de Evidências</td>
                    <td className="p-3.5 text-right font-bold text-emerald-700">Ativo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 9: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              Logs de Auditoria e Histórico de Alterações
            </h2>
            <p className="text-slate-600 text-sm">
              Registro cronológico e imutável de todas as modificações realizadas no portal para conformidade ética.
            </p>
          </div>

          <Card className="space-y-3">
            {[
              { time: 'Hoje às 11:20', user: 'Dr. André Lemos Vieira', action: 'Publicou artigo: "Como Funciona a TCC no TAG"', code: 'ART-520' },
              { time: 'Hoje às 10:45', user: 'IA MenteClínica', action: 'Gerou sugestão de Schema.org para o artigo de Ansiedade', code: 'AUTO-SEO' },
              { time: 'Ontem às 16:30', user: 'Revisor Ético', action: 'Aprovou estudo de caso anonimizado sobre Pânico', code: 'CASE-08' },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">{log.action}</div>
                  <div className="text-slate-500 text-[11px]">{log.user} &bull; {log.time}</div>
                </div>
                <span className="font-mono text-[10px] bg-slate-200 px-2 py-0.5 rounded-md text-slate-800">{log.code}</span>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* TAB 10: ARCHITECTURE SPECIFICATION */}
      {activeTab === 'architecture' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Database className="w-6 h-6 text-emerald-700" />
              Arquitetura de Banco de Dados & Escala (100k+ Páginas)
            </h2>
            <p className="text-slate-600 text-sm">
              Especificação completa do esquema relacional em PostgreSQL / Supabase projetado para altíssima performance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="space-y-4 font-mono text-xs bg-slate-900 text-emerald-300 border-slate-800 p-6 overflow-x-auto">
              <h3 className="font-bold text-white text-sm tracking-wide font-sans flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" /> Schema SQL Relacional
              </h3>
              <pre className="text-[11px] leading-relaxed">
{`-- Tabela Principal de Conteúdos
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  summary TEXT,
  content TEXT NOT NULL,
  category_id VARCHAR(50) REFERENCES categories(id),
  author_id UUID REFERENCES users(id),
  dsm_code VARCHAR(100),
  icd_code VARCHAR(100),
  seo_score INT DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices de Alta Performance para Busca
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_fts ON articles USING gin(to_tsvector('portuguese', title || ' ' || content));`}
              </pre>
            </Card>

            <Card className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-700" /> Diretrizes de Escalabilidade
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Edge Caching & Incremental Static Regeneration (ISR):</strong> Páginas estáticas geradas no Edge com revalidação sob demanda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Full-Text Search em Português:</strong> Mecanismo vetorial direto no banco PostgreSQL eliminando dependência de serviços externos pagos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Backup e Snapshots Contínuos:</strong> Ponto de restauração a cada 15 minutos com réplica de leitura para tráfego intenso.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
