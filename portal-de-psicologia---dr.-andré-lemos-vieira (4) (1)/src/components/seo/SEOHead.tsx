import React, { useEffect } from 'react';
import { ViewMode } from '../../types/portal';
import { articlesData } from '../../data/articlesData';
import { categoriesData } from '../../data/categoriesData';
import { drAndreProfile } from '../../data/authorData';

interface SEOHeadProps {
  currentView: ViewMode;
  viewParam?: string;
}

const BASE_URL = "https://www.psicologoandrelemos.com.br";
const DEFAULT_IMAGE = `${BASE_URL}/dr-andre.jpg`;

export const SEOHead: React.FC<SEOHeadProps> = ({ currentView, viewParam }) => {
  useEffect(() => {
    let title = "Dr. André Lemos Vieira | Psicólogo em Brasília (Ceilândia & Sudoeste) e Online";
    let description = "Atendimento psicológico de excelência em Brasília (Ceilândia e Sudoeste) e consulta online. Especialista em Terapia Cognitivo-Comportamental (TCC) e Gestalt-terapia. CRP 01/14042.";
    let keywords = "Psicólogo Brasília, Psicólogo Ceilândia, Psicólogo Sudoeste, Terapia Cognitivo Comportamental, Gestalt-terapia, Dr. André Lemos Vieira, Terapia Online, Psicólogo Taguatinga, Psicólogo Águas Claras";
    let canonical = BASE_URL;
    let ogType = "website";
    let image = DEFAULT_IMAGE;

    if (currentView === 'home') {
      title = "Dr. André Lemos Vieira | Psicólogo em Brasília (Ceilândia & Sudoeste) e Online";
      description = "Psicólogo Clínico (CRP 01/14042) especialista em TCC e Gestalt-terapia em Brasília (Ceilândia e Sudoeste) e Online. Tratamento científico de Ansiedade, Depressão, TDAH, Burnout e Terapia de Casal.";
      canonical = `${BASE_URL}/`;
    } else if (currentView === 'category') {
      const cat = categoriesData.find(c => c.id === viewParam || c.slug === viewParam);
      if (cat) {
        title = `${cat.name}: Sintomas, Tratamento e TCC | Psicólogo André Lemos Vieira`;
        description = `${cat.shortDesc} Entenda as causas e tratamentos baseados em evidências com o Psicólogo André Lemos Vieira (CRP 01/14042) em Brasília e Online.`;
        keywords = `${cat.name}, ${cat.subcategories.join(', ')}, Psicólogo Brasília, TCC Brasília`;
        canonical = `${BASE_URL}/categoria/${cat.slug}`;
      }
    } else if (currentView === 'article') {
      const art = articlesData.find(a => a.id === viewParam || a.slug === viewParam);
      if (art) {
        title = `${art.title} | Dr. André Lemos Vieira`;
        description = art.summary;
        keywords = `${art.tags.join(', ')}, ${art.subcategory}, Psicólogo André Lemos Vieira, CRP 01/14042`;
        canonical = `${BASE_URL}/artigo/${art.id}`;
        ogType = "article";
        if (art.imageUrl) image = art.imageUrl;
      }
    } else if (currentView === 'tools') {
      title = "Ferramentas e Testes de Autoavaliação Psicológica (GAD-7, PHQ-9, ASRS) | Dr. André Lemos Vieira";
      description = "Realize testes psicométricos gratuitos e validados para Ansiedade (GAD-7), Depressão (PHQ-9), TDAH no Adulto (ASRS v1.1), Autismo (RAADS), Burnout e Diário TCC.";
      canonical = `${BASE_URL}/ferramentas${viewParam ? `/${viewParam}` : ''}`;
    } else if (currentView === 'glossary') {
      title = "Glossário Clínico de Psicologia, TCC e Gestalt-terapia | Dr. André Lemos Vieira";
      description = "Dicionário técnico e prático de termos da Psicologia Clínica, Psiquiatria (DSM-5-TR, CID-11), Terapia Cognitivo-Comportamental e Gestalt-terapia.";
      canonical = `${BASE_URL}/glossario`;
    } else if (currentView === 'cases') {
      title = "Casos Clínicos e Estudos de Anamnese Psicológica | Dr. André Lemos Vieira";
      description = "Estudos de casos clínicos reais anonimizados com formulação diagnóstica, plano terapêutico em TCC/Gestalt e evolução do tratamento.";
      canonical = `${BASE_URL}/casos-clinicos`;
    } else if (currentView === 'science') {
      title = "Ciência & Pesquisas Traduzidas (NICE, Cochrane, APA, OMS) | Dr. André Lemos Vieira";
      description = "Diretrizes e metanálises científicas internacionais traduzidas de forma acessível para respaldar a prática da psicoterapia baseada em evidências.";
      canonical = `${BASE_URL}/ciencia-e-pesquisas`;
    } else if (currentView === 'faqs') {
      title = "Perguntas Frequentes sobre Psicoterapia, Valor e Convênios | Dr. André Lemos Vieira";
      description = "Tire dúvidas sobre sessões de psicologia, reembolso de plano de saúde, diferença entre TCC e Gestalt, atendimento presencial em Brasília e consulta online.";
      canonical = `${BASE_URL}/perguntas-frequentes`;
    } else if (currentView === 'about-doctor') {
      title = "Sobre o Dr. André Lemos Vieira — Psicólogo Clínico (CRP 01/14042) em Brasília";
      description = "Conheça a trajetória, formação na UNIP, especialização no CEGEST e atuação do Psicólogo André Lemos Vieira nos consultórios do Sudoeste e Ceilândia (Brasília/DF).";
      canonical = `${BASE_URL}/sobre-dr-andre`;
    } else if (currentView === 'library') {
      title = "Biblioteca Digital de Saúde Mental & E-books Gratuitos | Dr. André Lemos Vieira";
      description = "Baixe e-books, guias práticos e materiais terapêuticos gratuitos desenvolvidos pelo Psicólogo André Lemos Vieira para regulação emocional.";
      canonical = `${BASE_URL}/biblioteca`;
    } else if (currentView === 'newsletter') {
      title = "Boletim MenteClínica — Artigos Científicos e Reflexões Psicológicas";
      description = "Inscreva-se gratuitamente no boletim semanal de saúde mental, neurociência aplicada e práticas da TCC e Gestalt-terapia.";
      canonical = `${BASE_URL}/newsletter`;
    } else if (currentView === 'sitemap') {
      title = "Mapa do Site (Sitemap Visual & Links Diretos) | Dr. André Lemos Vieira";
      description = "Navegue pelo mapa do site completo com todos os artigos, categorias clínicas, testes de autoavaliação e recursos de saúde mental do Dr. André Lemos Vieira.";
      canonical = `${BASE_URL}/sitemap`;
    } else if (currentView === 'patient-portal') {
      title = "Portal do Paciente MenteClínica | Área Restrita de Acompanhamento";
      description = "Área de apoio ao paciente para agendamentos, diários emocionais e tarefas de casa da Terapia Cognitivo-Comportamental.";
      canonical = `${BASE_URL}/portal-do-paciente`;
    } else if (currentView === 'seo-engine') {
      title = "Engine de Otimização e Indexação SEO Técnico | Dr. André Lemos Vieira";
      description = "Painel de auditoria técnica de SEO, sitemap XML, robots.txt, canonical e marcação de dados estruturados Schema.org.";
      canonical = `${BASE_URL}/seo-engine`;
    }

    // Update document title
    document.title = title;

    // Helper to set or create meta tag
    const setMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // Helper to set or create link tag
    const setLink = (rel: string, hrefVal: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefVal);
    };

    // Set Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'author', `${drAndreProfile.name} - ${drAndreProfile.crp}`);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('name', 'theme-color', '#FAF8F5');

    // Set Canonical Link
    setLink('canonical', canonical);

    // Set Open Graph Meta
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:site_name', 'Portal de Psicologia Dr. André Lemos Vieira');
    setMeta('property', 'og:locale', 'pt_BR');

    // Set Twitter Card Meta
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

  }, [currentView, viewParam]);

  return null;
};
