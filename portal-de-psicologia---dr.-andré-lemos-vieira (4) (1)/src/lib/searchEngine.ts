import { articlesData } from '../data/articlesData';
import { glossaryData } from '../data/glossaryData';
import { faqsData } from '../data/faqsData';
import { casesData } from '../data/casesData';
import { categoriesData } from '../data/categoriesData';

export interface SearchResultItem {
  id: string;
  type: 'article' | 'glossary' | 'faq' | 'case' | 'tool' | 'category';
  title: string;
  subtitle?: string;
  description: string;
  categoryName?: string;
  urlParam: string;
  targetView: 'article' | 'glossary' | 'faqs' | 'cases' | 'tools' | 'category';
  relevanceScore: number;
  tags?: string[];
}

export interface SearchFilters {
  type?: 'all' | 'article' | 'glossary' | 'faq' | 'case' | 'tool' | 'category';
  categorySlug?: string;
}

/**
 * Normaliza textos removendo acentos e convertendo para minúsculas
 */
export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Motor de Busca Unificado com pontuação semântica e suporte a múltiplos módulos
 */
export function executeUnifiedSearch(
  query: string,
  filters: SearchFilters = {}
): SearchResultItem[] {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) return [];

  const results: SearchResultItem[] = [];
  const queryTokens = cleanQuery.split(/\s+/).filter((t) => t.length > 1);

  // 1. Pesquisa em Artigos
  if (!filters.type || filters.type === 'all' || filters.type === 'article') {
    articlesData.forEach((art) => {
      if (filters.categorySlug && art.categoryId !== filters.categorySlug) return;

      const normTitle = normalizeText(art.title);
      const normSummary = normalizeText(art.summary);
      let score = 0;

      if (normTitle.includes(cleanQuery)) score += 50;
      if (normSummary.includes(cleanQuery)) score += 25;

      queryTokens.forEach((token) => {
        if (normTitle.includes(token)) score += 15;
        if (normSummary.includes(token)) score += 8;
        if (art.tags?.some((t) => normalizeText(t).includes(token))) score += 12;
      });

      if (score > 0) {
        const cat = categoriesData.find((c) => c.id === art.categoryId);
        results.push({
          id: art.id,
          type: 'article',
          title: art.title,
          subtitle: `${cat?.name || art.categoryId} • ${art.readingTimeMinutes} min de leitura`,
          description: art.summary,
          categoryName: cat?.name || art.categoryId,
          urlParam: art.slug || art.id,
          targetView: 'article',
          relevanceScore: score,
          tags: art.tags,
        });
      }
    });
  }

  // 2. Pesquisa no Glossário
  if (!filters.type || filters.type === 'all' || filters.type === 'glossary') {
    glossaryData.forEach((term) => {
      const normTerm = normalizeText(term.term);
      const normDef = normalizeText(term.definition);
      let score = 0;

      if (normTerm === cleanQuery) score += 60;
      else if (normTerm.includes(cleanQuery)) score += 40;
      if (normDef.includes(cleanQuery)) score += 15;

      queryTokens.forEach((token) => {
        if (normTerm.includes(token)) score += 12;
      });

      if (score > 0) {
        results.push({
          id: term.id,
          type: 'glossary',
          title: `Termo: ${term.term}`,
          subtitle: `Glossário de Psicoeducação • ${term.category}`,
          description: term.definition,
          categoryName: term.category,
          urlParam: term.id,
          targetView: 'glossary',
          relevanceScore: score,
        });
      }
    });
  }

  // 3. Pesquisa nas Perguntas Frequentes (FAQ)
  if (!filters.type || filters.type === 'all' || filters.type === 'faq') {
    faqsData.forEach((faq) => {
      const normQ = normalizeText(faq.question);
      const normA = normalizeText(faq.answer);
      let score = 0;

      if (normQ.includes(cleanQuery)) score += 45;
      if (normA.includes(cleanQuery)) score += 15;

      if (score > 0) {
        results.push({
          id: faq.id,
          type: 'faq',
          title: faq.question,
          subtitle: `FAQ Clínico • Categoria: ${faq.category}`,
          description: faq.answer,
          categoryName: faq.category,
          urlParam: faq.id,
          targetView: 'faqs',
          relevanceScore: score,
        });
      }
    });
  }

  // 4. Pesquisa nos Estudos de Caso Anonimizados
  if (!filters.type || filters.type === 'all' || filters.type === 'case') {
    casesData.forEach((c) => {
      const normTitle = normalizeText(c.title);
      const normComp = normalizeText(c.initialComplaint);
      const normAge = normalizeText(c.patientAgeGender);
      let score = 0;

      if (normTitle.includes(cleanQuery)) score += 50;
      if (normComp.includes(cleanQuery)) score += 30;
      if (normAge.includes(cleanQuery)) score += 15;

      if (score > 0) {
        results.push({
          id: c.id,
          type: 'case',
          title: c.title,
          subtitle: `${c.patientAgeGender} • ${c.category}`,
          description: c.initialComplaint,
          categoryName: c.category,
          urlParam: c.id,
          targetView: 'cases',
          relevanceScore: score,
        });
      }
    });
  }

  // 5. Pesquisa nas Ferramentas Clínicas & Testes
  if (!filters.type || filters.type === 'all' || filters.type === 'tool') {
    const tools = [
      { id: 'gad7', name: 'Escala de Ansiedade GAD-7', desc: 'Rastreio clínico para Transtorno de Ansiedade Generalizada' },
      { id: 'phq9', name: 'Inventário de Depressão PHQ-9', desc: 'Avaliação de severidade de episódios depressivos e anedonia' },
      { id: 'asrs', name: 'ASRS v1.1 TDAH Adulto', desc: 'Instrumento de autorrastreamento para Transtorno de Déficit de Atenção' },
      { id: 'raads', name: 'AQ-10 / RAADS Autismo Adulto', desc: 'Sinais e características do Espectro Autista em adultos' },
      { id: 'burnout', name: 'Inventário de Burnout MBI', desc: 'Avaliação do nível de esgotamento profissional e exaustão' },
      { id: 'rpa', name: 'Diário de Registro de Pensamentos TCC', desc: 'Ferramenta interativa para reestruturação cognitiva e esquemas' },
    ];

    tools.forEach((t) => {
      const normName = normalizeText(t.name);
      const normDesc = normalizeText(t.desc);
      let score = 0;

      if (normName.includes(cleanQuery)) score += 50;
      if (normDesc.includes(cleanQuery)) score += 20;

      if (score > 0) {
        results.push({
          id: t.id,
          type: 'tool',
          title: t.name,
          subtitle: 'Ferramenta Clinica Interativa',
          description: t.desc,
          urlParam: t.id,
          targetView: 'tools',
          relevanceScore: score,
        });
      }
    });
  }

  // Ordenar por pontuação semântica decrescente
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Autocomplete / Sugestões rápidas em tempo de digitação
 */
export function getSearchAutocompleteSuggestions(query: string): string[] {
  const clean = normalizeText(query);
  if (clean.length < 2) return [];

  const suggestionsSet = new Set<string>();

  articlesData.forEach((a) => {
    if (normalizeText(a.title).includes(clean)) suggestionsSet.add(a.title);
  });

  glossaryData.forEach((g) => {
    if (normalizeText(g.term).includes(clean)) suggestionsSet.add(`O que é ${g.term}?`);
  });

  faqsData.forEach((f) => {
    if (normalizeText(f.question).includes(clean)) suggestionsSet.add(f.question);
  });

  return Array.from(suggestionsSet).slice(0, 5);
}
