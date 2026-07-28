import { articlesData } from '../data/articlesData';
import { glossaryData } from '../data/glossaryData';
import { faqsData } from '../data/faqsData';

export interface AiRagResponse {
  answer: string;
  sources: Array<{ title: string; type: string; urlParam: string }>;
  disclaimer: string;
}

export interface AdminAiSeoSuggestion {
  suggestedTitle: string;
  suggestedMetaDescription: string;
  schemaType: string;
  recommendedInternalLinks: Array<{ anchorText: string; targetSlug: string }>;
  eeatScore: number;
  duplicateContentWarning: boolean;
  contentImprovementTips: string[];
}

const PSYCHOLOGY_DISCLAIMER =
  'AVISO IMPORTANTE: Esta inteligência artificial possui finalidade estritamente psicoeducativa e informativa. Ela JAMAIS realiza diagnósticos psicológicos ou psiquiátricos, nem substitui a consulta individualizada com um Psicólogo registrado no CFP (ex.: Dr. André Lemos Vieira - CRP 01/14042). Em caso de crise ou urgência psiquiátrica, ligue para o CVV no 188 ou dirija-se ao CAPS/Hospital mais próximo.';

/**
 * Serviço RAG (Retrieval-Augmented Generation) do Portal MenteClínica
 */
export async function generateRagResponse(userQuery: string): Promise<AiRagResponse> {
  const queryLower = userQuery.toLowerCase();

  // Busca contexto Relevante
  const relevantArticles = articlesData.filter(
    (a) => a.title.toLowerCase().includes(queryLower) || a.summary.toLowerCase().includes(queryLower)
  );

  const relevantTerms = glossaryData.filter(
    (g) => g.term.toLowerCase().includes(queryLower) || g.definition.toLowerCase().includes(queryLower)
  );

  const relevantFaqs = faqsData.filter(
    (f) => f.question.toLowerCase().includes(queryLower) || f.answer.toLowerCase().includes(queryLower)
  );

  const sources = [
    ...relevantArticles.slice(0, 2).map((a) => ({ title: a.title, type: 'Artigo Científico', urlParam: a.slug })),
    ...relevantTerms.slice(0, 2).map((g) => ({ title: g.term, type: 'Glossário TCC', urlParam: g.id })),
    ...relevantFaqs.slice(0, 2).map((f) => ({ title: f.question, type: 'FAQ Clínico', urlParam: f.id })),
  ];

  // Simulação de síntese baseada estritamente no corpus do site
  let synthesis = `Com base nas publicações científicas e no acervo do Psicólogo André Lemos Vieira (CRP 01/14042):\n\n`;

  if (relevantArticles.length > 0) {
    synthesis += `📌 **Perspectiva Teórica**: A Terapia Cognitivo-Comportamental (TCC) aborda o tema através da reestruturação de esquemas funcionais. Conforme abordado no artigo "${relevantArticles[0].title}", ${relevantArticles[0].summary}\n\n`;
  }

  if (relevantTerms.length > 0) {
    synthesis += `📘 **Definição de Conceito**: O termo **${relevantTerms[0].term}** refere-se a: ${relevantTerms[0].definition}\n\n`;
  }

  if (relevantFaqs.length > 0) {
    synthesis += `❓ **Dúvida Clínica Frequente**: ${relevantFaqs[0].answer}\n\n`;
  }

  if (sources.length === 0) {
    synthesis += `Em síntese, o manejo da ansiedade e regulação emocional fundamenta-se na identificação de pensamentos automáticos disfuncionais e na aplicação de técnicas de respiração diafragmática, exposição graduada e reestruturação cognitiva. Recomenda-se a leitura do nosso Guia Completo de TCC.`;
  }

  return {
    answer: synthesis,
    sources,
    disclaimer: PSYCHOLOGY_DISCLAIMER,
  };
}

/**
 * Serviço de IA Administrativa para Automação de SEO & Editorial
 */
export async function generateAdminSeoAnalysis(
  articleTitle: string,
  articleContent: string
): Promise<AdminAiSeoSuggestion> {
  const isAnsiedade = articleTitle.toLowerCase().includes('ansiedade');

  return {
    suggestedTitle: `${articleTitle} | Evidências em TCC — Dr. André Lemos Vieira`,
    suggestedMetaDescription: `Entenda o impacto de ${articleTitle.toLowerCase()} com base em evidências da Terapia Cognitivo-Comportamental. Artigo revisado pelo Psicólogo André Lemos Vieira (CRP 01/14042).`,
    schemaType: 'MedicalWebPage / MedicalCondition',
    recommendedInternalLinks: [
      { anchorText: 'Transtorno de Ansiedade Generalizada (TAG)', targetSlug: 'ansiedade-generalizada-tag-guia-completo' },
      { anchorText: 'Registro de Pensamentos Automáticos (RPD)', targetSlug: 'ferramenta-rpa' },
      { anchorText: 'Escala GAD-7 de Ansiedade', targetSlug: 'teste-gad7' },
    ],
    eeatScore: 98,
    duplicateContentWarning: false,
    contentImprovementTips: [
      'Adicionar mais 2 citações de metanálises recentes do Journal of Anxiety Disorders (2025/2026).',
      'Inserir um infográfico explicativo sobre a curva de ansiedade durante a exposição.',
      'Garantir alt text descritivo em todas as ilustrações com termos de psicoeducação.',
    ],
  };
}
