import React, { useState } from 'react';
import { ViewMode } from '../types/portal';
import { categoriesData } from '../data/categoriesData';
import { articlesData } from '../data/articlesData';
import { SchemaOrgViewer } from '../components/seo/SchemaOrgViewer';
import { BreadcrumbNav } from '../components/seo/BreadcrumbNav';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  Globe, 
  Copy, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  FolderTree, 
  FileText, 
  Activity, 
  BookOpen, 
  HelpCircle, 
  Check, 
  Code,
  ShieldCheck,
  ListOrdered
} from 'lucide-react';

interface SitemapViewProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const SitemapView: React.FC<SitemapViewProps> = ({ onNavigate }) => {
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [showXmlModal, setShowXmlModal] = useState(false);

  const domain = "https://www.psicologoandrelemos.com.br";
  const sitemapUrl = `${domain}/sitemap.xml`;
  const robotsUrl = `${domain}/robots.txt`;

  const triggerToast = (msg: string) => {
    setCopiedToast(msg);
    setTimeout(() => setCopiedToast(null), 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`${label} copiado com sucesso!`);
  };

  const downloadSitemapFile = () => {
    window.open('/sitemap.xml', '_blank');
  };

  const rawXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Páginas Institucionais -->
  <url><loc>${domain}/</loc><lastmod>2026-07-28</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${domain}/sobre-dr-andre</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${domain}/servicos</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${domain}/ferramentas</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>${domain}/glossario</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${domain}/perguntas-frequentes</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${domain}/casos-clinicos</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${domain}/ciencia-e-pesquisas</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${domain}/biblioteca</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${domain}/newsletter</loc><lastmod>2026-07-28</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${domain}/portal-do-paciente</loc><lastmod>2026-07-28</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- Categorias Clínicas / Silos -->
${categoriesData.map(c => `  <url><loc>${domain}/categoria/${c.slug}</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>`).join('\n')}

  <!-- Artigos Científicos -->
${articlesData.map(a => `  <url><loc>${domain}/artigo/${a.id}</loc><lastmod>2026-07-28</lastmod><changefreq>weekly</changefreq><priority>0.80</priority></url>`).join('\n')}

  <!-- Ferramentas Interativas -->
  <url><loc>${domain}/ferramentas/gad7</loc><lastmod>2026-07-28</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>
  <url><loc>${domain}/ferramentas/phq9</loc><lastmod>2026-07-28</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>
  <url><loc>${domain}/ferramentas/asrs</loc><lastmod>2026-07-28</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>
</urlset>`;

  const pagesList = [
    { name: 'Página Inicial (Home)', view: 'home' as ViewMode, url: '/', priority: '1.0' },
    { name: 'Sobre o Dr. André Lemos Vieira (CRP 01/14042)', view: 'about-doctor' as ViewMode, url: '/sobre-dr-andre', priority: '0.9' },
    { name: 'Central de Ferramentas e Testes Interativos', view: 'tools' as ViewMode, url: '/ferramentas', priority: '0.85' },
    { name: 'Glossário Clínico de Psicologia (+500 termos)', view: 'glossary' as ViewMode, url: '/glossario', priority: '0.8' },
    { name: 'Perguntas Frequentes (FAQ Hub)', view: 'faqs' as ViewMode, url: '/perguntas-frequentes', priority: '0.8' },
    { name: 'Biblioteca de Casos Clínicos ILUSTRATIVOS', view: 'cases' as ViewMode, url: '/casos-clinicos', priority: '0.8' },
    { name: 'Pesquisas Traduzidas & Ciência Digest', view: 'science' as ViewMode, url: '/ciencia-e-pesquisas', priority: '0.8' },
    { name: 'Biblioteca Digital (PDFs & Guias Gratuitos)', view: 'library' as ViewMode, url: '/biblioteca', priority: '0.7' },
    { name: 'Assinar Newsletter TCC & Psicoeducação', view: 'newsletter' as ViewMode, url: '/newsletter', priority: '0.6' },
    { name: 'Área Restrita / Portal do Paciente', view: 'patient-portal' as ViewMode, url: '/portal-do-paciente', priority: '0.5' },
  ];

  const toolsList = [
    { id: 'gad7', name: 'Escala GAD-7 (Mapeamento de Ansiedade)', url: '/ferramentas/gad7' },
    { id: 'phq9', name: 'Questionário PHQ-9 (Rastreio de Depressão)', url: '/ferramentas/phq9' },
    { id: 'asrs', name: 'Escala ASRS-v1.1 (Sintomas de TDAH no Adulto)', url: '/ferramentas/asrs' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10 animate-fadeIn">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#A68A6B] text-xs font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { label: 'Início', view: 'home' },
          { label: 'Mapa do Site & Sitemap XML', active: true }
        ]}
        onNavigate={onNavigate}
      />

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#1A1A1A] to-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-xl border border-[#A68A6B]/30 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A68A6B]/20 text-[#A68A6B] border border-[#A68A6B]/40 text-xs font-bold">
            <Globe className="w-4 h-4 text-[#A68A6B]" />
            <span>Estrutura de Indexação Oficial (Sitemap XML)</span>
          </div>
          <Badge variant="emerald" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
            Status: Ativo & Validado
          </Badge>
        </div>

        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Mapa do Site (Sitemap) & Central de Indexação
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mt-2 max-w-3xl">
            Navegue por toda a arquitetura hierárquica do Portal do Dr. André Lemos Vieira. Abaixo você encontra tanto a navegação visual completa quanto os arquivos oficiais <code className="text-[#A68A6B] bg-white/10 px-1.5 py-0.5 rounded">sitemap.xml</code> e <code className="text-[#A68A6B] bg-white/10 px-1.5 py-0.5 rounded">robots.txt</code> para cadastro direto no Google Search Console.
          </p>
        </div>

        {/* Action Buttons Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-[#A68A6B] hover:bg-[#8F7356] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" /> Abrir sitemap.xml no Navegador
          </a>

          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10 text-xs"
            onClick={() => copyToClipboard(sitemapUrl, 'URL do Sitemap')}
          >
            <Copy className="w-4 h-4 mr-1.5" /> Copiar Link do Sitemap
          </Button>

          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10 text-xs"
            onClick={() => setShowXmlModal(!showXmlModal)}
          >
            <Code className="w-4 h-4 mr-1.5" /> {showXmlModal ? 'Ocultar Código XML' : 'Ver Código XML'}
          </Button>
        </div>
      </div>

      {/* Toggleable Raw XML Code Viewer */}
      {showXmlModal && (
        <Card className="bg-slate-950 text-white border-slate-800 p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#A68A6B]" />
              <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
                Conteúdo do Arquivo /sitemap.xml (Padrão sitemaps.org 0.9)
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-white border-slate-700 hover:bg-slate-800"
              onClick={() => copyToClipboard(rawXmlContent, 'Código XML do Sitemap')}
            >
              <Copy className="w-3.5 h-3.5 mr-1" /> Copiar Código Inteiro
            </Button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-80 border border-slate-800">
            {rawXmlContent}
          </pre>
        </Card>
      )}

      {/* Visual Sitemap Structure Grid */}
      <div className="space-y-8">
        <div className="border-b border-[#E8E2D9] pb-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
            Navegação Geral do Portal (Sitemap Visual)
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Acesse diretamente qualquer seção, categoria clínica ou artigo do portal através dos atalhos abaixo:
          </p>
        </div>

        {/* Section 1: Institutional Pages */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#A68A6B] text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#1A1A1A]">
              Páginas Institucionais e Principais ({pagesList.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {pagesList.map((p, i) => (
              <button
                key={i}
                onClick={() => onNavigate(p.view)}
                className="p-4 rounded-2xl bg-white border border-[#E8E2D9] hover:border-[#A68A6B] hover:shadow-xs transition-all text-left flex items-start justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="font-bold text-xs text-[#1A1A1A] group-hover:text-[#A68A6B] transition-colors block">
                    {p.name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block">{p.url}</span>
                </div>
                <Badge variant="emerald" className="text-[10px] shrink-0">
                  Pri: {p.priority}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Clinical Categories & SILO Clusters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#A68A6B] text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#1A1A1A]">
              Categorias Clínicas & Hubs SILO ({categoriesData.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('category', cat.id)}
                className="p-4 rounded-2xl bg-white border border-[#E8E2D9] hover:border-[#A68A6B] hover:shadow-xs transition-all text-left flex items-start justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="font-bold text-xs text-[#1A1A1A] group-hover:text-[#A68A6B] transition-colors block">
                    {cat.name}
                  </span>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{cat.shortDesc}</p>
                  <span className="text-[10px] font-mono text-[#A68A6B] block">/categoria/{cat.slug}</span>
                </div>
                <FolderTree className="w-4 h-4 text-[#A68A6B] shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Scientific Articles */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#A68A6B] text-white flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#1A1A1A]">
              Artigos Científicos de Alta Relevância ({articlesData.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {articlesData.map((art) => (
              <button
                key={art.id}
                onClick={() => onNavigate('article', art.id)}
                className="p-4 rounded-2xl bg-white border border-[#E8E2D9] hover:border-[#A68A6B] hover:shadow-xs transition-all text-left flex items-start justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="font-bold text-xs text-[#1A1A1A] group-hover:text-[#A68A6B] transition-colors block line-clamp-1">
                    {art.title}
                  </span>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{art.summary}</p>
                  <span className="text-[10px] font-mono text-slate-400 block">/artigo/{art.id}</span>
                </div>
                <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Interactive Self-Assessment Tools */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#A68A6B] text-white flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#1A1A1A]">
              Ferramentas de Autoavaliação Interativas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {toolsList.map((t) => (
              <button
                key={t.id}
                onClick={() => onNavigate('tools', t.id)}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] hover:border-[#A68A6B] transition-all text-left flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div>
                  <span className="font-bold text-xs text-[#1A1A1A] group-hover:text-[#A68A6B] block">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#A68A6B] block mt-0.5">{t.url}</span>
                </div>
                <Activity className="w-4 h-4 text-[#A68A6B] shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Google Search Console Guide Section */}
      <Card className="p-6 md:p-8 bg-white border-[#E8E2D9] space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-3">
          <ListOrdered className="w-5 h-5 text-[#A68A6B]" />
          <h3 className="font-extrabold text-[#1A1A1A] text-base">
            Como Enviar este Sitemap ao Google Search Console
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-1">
            <span className="font-bold text-[#A68A6B] block">Passo 1</span>
            <p>Acesse o <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="font-bold underline text-[#A68A6B]">Google Search Console</a> com sua conta.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-1">
            <span className="font-bold text-[#A68A6B] block">Passo 2</span>
            <p>Selecione o domínio <strong>psicologoandrelemos.com.br</strong> no canto superior esquerdo.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-1">
            <span className="font-bold text-[#A68A6B] block">Passo 3</span>
            <p>Clique em <strong>Sitemaps</strong> na barra lateral da seção "Indexação".</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-1">
            <span className="font-bold text-[#A68A6B] block">Passo 4</span>
            <p>Em "Adicionar novo sitemap", digite <code>sitemap.xml</code> e clique em <strong>ENVIAR</strong>.</p>
          </div>
        </div>
      </Card>

      {/* Schema.org */}
      <SchemaOrgViewer pageType="sitemap" />
    </div>
  );
};
