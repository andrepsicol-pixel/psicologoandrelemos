import fs from 'fs';
import path from 'path';
import { articlesData } from '../src/data/articlesData';
import { categoriesData } from '../src/data/categoriesData';
import { faqsData } from '../src/data/faqsData';
import { glossaryData } from '../src/data/glossaryData';
import { casesData } from '../src/data/casesData';
import { scienceData } from '../src/data/scienceData';

const BASE_URL = 'https://www.psicologoandrelemos.com.br';
const TODAY = new Date().toISOString().split('T')[0];

function generateSitemapXml(): string {
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/sobre-dr-andre', priority: '0.9', changefreq: 'weekly' },
    { url: '/servicos', priority: '0.9', changefreq: 'weekly' },
    { url: '/ferramentas', priority: '0.85', changefreq: 'weekly' },
    { url: '/glossario', priority: '0.80', changefreq: 'weekly' },
    { url: '/perguntas-frequentes', priority: '0.80', changefreq: 'weekly' },
    { url: '/casos-clinicos', priority: '0.80', changefreq: 'weekly' },
    { url: '/ciencia-e-pesquisas', priority: '0.80', changefreq: 'weekly' },
    { url: '/biblioteca', priority: '0.70', changefreq: 'weekly' },
    { url: '/newsletter', priority: '0.60', changefreq: 'monthly' },
    { url: '/portal-do-paciente', priority: '0.50', changefreq: 'monthly' },
    { url: '/sitemap', priority: '0.50', changefreq: 'monthly' }
  ];

  const tools = [
    'gad7', 'phq9', 'asrs', 'raads', 'burnout-test',
    'thought-record', 'mood-tracker', 'exposure-plan',
    'rosenberg', 'attachment-quiz', 'sleep-calc', 'stress-scale'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

  // 1. Static Institutional Pages
  xml += `  <!-- Páginas Institucionais & Principais -->\n`;
  staticPages.forEach((page) => {
    xml += `  <url>\n    <loc>${BASE_URL}${page.url}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
  });

  // 2. Clinical Categories (SILO Clusters)
  xml += `  <!-- Categorias Clínicas & Hubs SILO -->\n`;
  categoriesData.forEach((cat) => {
    const slug = cat.slug || cat.id;
    xml += `  <url>\n    <loc>${BASE_URL}/categoria/${slug}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
  });

  // 3. Articles
  xml += `  <!-- Artigos Científicos Baseados em Evidências -->\n`;
  articlesData.forEach((art) => {
    const lastmod = art.reviewDate || TODAY;
    xml += `  <url>\n    <loc>${BASE_URL}/artigo/${art.id}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.80</priority>\n  </url>\n`;
  });

  // 4. Glossary Terms
  xml += `  <!-- Termos do Glossário Clínico -->\n`;
  glossaryData.forEach((term) => {
    xml += `  <url>\n    <loc>${BASE_URL}/glossario#${term.id}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.70</priority>\n  </url>\n`;
  });

  // 5. Clinical Cases
  xml += `  <!-- Estudos de Casos Clínicos -->\n`;
  casesData.forEach((c) => {
    xml += `  <url>\n    <loc>${BASE_URL}/casos-clinicos#${c.id}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
  });

  // 6. Science Studies
  xml += `  <!-- Pesquisas Científicas & Metanálises -->\n`;
  scienceData.forEach((s) => {
    xml += `  <url>\n    <loc>${BASE_URL}/ciencia-e-pesquisas#${s.id}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
  });

  // 7. Interactive Psychological Assessment Tools
  xml += `  <!-- Ferramentas e Testes de Autoavaliação Interativos -->\n`;
  tools.forEach((toolId) => {
    xml += `  <url>\n    <loc>${BASE_URL}/ferramentas/${toolId}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;

  return xml;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /cms
Disallow: /admin
Disallow: /api/

Sitemap: ${BASE_URL}/sitemap.xml
Host: ${BASE_URL}
`;
}

function main() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapXml = generateSitemapXml();
  const robotsTxt = generateRobotsTxt();

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');

  console.log('✅ [SEO Generator] Successfully generated public/sitemap.xml and public/robots.txt dynamically!');
}

main();
