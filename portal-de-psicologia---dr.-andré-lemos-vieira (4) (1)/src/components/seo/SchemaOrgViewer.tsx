import React from 'react';
import { drAndreProfile } from '../../data/authorData';
import { faqsData } from '../../data/faqsData';

interface SchemaOrgViewerProps {
  pageType?: 'home' | 'article' | 'category' | 'faq' | 'doctor' | 'tools' | 'glossary' | 'science' | 'cases' | 'sitemap';
  articleData?: any;
  categoryData?: any;
  breadcrumbItems?: Array<{ name: string; item: string }>;
}

const BASE_URL = "https://www.psicologoandrelemos.com.br";

export const SchemaOrgViewer: React.FC<SchemaOrgViewerProps> = ({
  pageType = 'home',
  articleData,
  categoryData,
  breadcrumbItems
}) => {
  // Base Person & Psychologist Schema
  const personSchema = {
    "@type": "Person",
    "@id": `${BASE_URL}/#doctor`,
    "name": "André Lemos Vieira",
    "alternateName": "Dr. André Lemos Vieira",
    "jobTitle": "Psicólogo Clínico Especialista",
    "identifier": "CRP 01/14042",
    "description": drAndreProfile.bio,
    "image": `${BASE_URL}/dr-andre.jpg`,
    "url": BASE_URL,
    "telephone": "+5561992558044",
    "email": "contato@psicologoandrelemos.com.br",
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Universidade Paulista (UNIP)"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Centro de Gestalt-Terapia (CEGEST)"
      }
    ],
    "knowsAbout": [
      "Terapia Cognitivo-Comportamental (TCC)",
      "Gestalt-terapia",
      "Transtornos de Ansiedade",
      "Depressão e Transtornos do Humor",
      "TDAH em Adultos e Crianças",
      "Transtorno do Espectro Autista (TEA)",
      "Burnout e Estresse Ocupacional",
      "Terapia de Casal e Relacionamentos"
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Consultório de Psicologia Dr. André Lemos Vieira",
    "url": BASE_URL,
    "logo": `${BASE_URL}/dr-andre.jpg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+5561992558044",
      "contactType": "Atendimento ao Paciente / Agendamento",
      "areaServed": "BR",
      "availableLanguage": "Portuguese"
    }
  };

  // MedicalBusiness & LocalBusiness Schema
  const medicalBusinessSchema = {
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "@id": `${BASE_URL}/#clinic`,
    "name": "Consultório de Psicologia Dr. André Lemos Vieira - Brasília",
    "description": "Atendimento psicológico presencial em Ceilândia e Sudoeste (Brasília/DF) e psicoterapia online para todo o Brasil. Especialista em TCC e Gestalt-terapia. CRP 01/14042.",
    "url": BASE_URL,
    "telephone": "+5561992558044",
    "priceRange": "$$",
    "image": `${BASE_URL}/dr-andre.jpg`,
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Ceilândia Centro",
        "addressLocality": "Ceilândia, Brasília",
        "addressRegion": "DF",
        "postalCode": "72215-000",
        "addressCountry": "BR"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Edifício Sudoeste, CCSW",
        "addressLocality": "Sudoeste, Brasília",
        "addressRegion": "DF",
        "postalCode": "70680-000",
        "addressCountry": "BR"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Brasília" },
      { "@type": "AdministrativeArea", "name": "Ceilândia" },
      { "@type": "AdministrativeArea", "name": "Sudoeste" },
      { "@type": "AdministrativeArea", "name": "Taguatinga" },
      { "@type": "AdministrativeArea", "name": "Águas Claras" },
      { "@type": "AdministrativeArea", "name": "Plano Piloto" },
      { "@type": "AdministrativeArea", "name": "Guará" },
      { "@type": "AdministrativeArea", "name": "Samambaia" },
      { "@type": "Country", "name": "Brasil" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "156"
    }
  };

  // WebSite & SearchAction Schema
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "url": BASE_URL,
    "name": "Portal de Psicologia Dr. André Lemos Vieira",
    "description": "Portal especializado em Psicologia Clínica, Terapia Cognitivo-Comportamental (TCC), Gestalt-terapia e Testes Psicológicos em Brasília e Online.",
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/glossario?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Services Schema
  const servicesSchema = [
    {
      "@type": "Service",
      "name": "Psicoterapia Individual Presencial e Online (TCC & Gestalt)",
      "serviceType": "Atendimento Psicológico Especializado",
      "provider": { "@id": `${BASE_URL}/#doctor` },
      "areaServed": "Brasília DF e Online",
      "description": "Tratamento de Ansiedade (TAG, Pânico), Depressão, TDAH, Burnout e Autismo em adultos."
    },
    {
      "@type": "Service",
      "name": "Terapia de Casal e Relacionamentos",
      "serviceType": "Psicoterapia Relacional",
      "provider": { "@id": `${BASE_URL}/#doctor` },
      "description": "Mediação de conflitos conjugais, melhoria da comunicação assertiva e reconstrução de vínculos de confiança."
    }
  ];

  // FAQ Schema
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": faqsData.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  // Breadcrumb Schema
  const defaultBreadcrumbs = breadcrumbItems || [
    { name: "Início", item: BASE_URL },
    ...(pageType === 'article' && articleData ? [
      { name: "Artigos", item: `${BASE_URL}/#artigos` },
      { name: articleData.title, item: `${BASE_URL}/artigo/${articleData.id}` }
    ] : pageType === 'category' && categoryData ? [
      { name: "Categorias", item: `${BASE_URL}/#categorias` },
      { name: categoryData.name, item: `${BASE_URL}/categoria/${categoryData.slug}` }
    ] : pageType === 'faq' ? [
      { name: "Perguntas Frequentes", item: `${BASE_URL}/perguntas-frequentes` }
    ] : pageType === 'tools' ? [
      { name: "Ferramentas", item: `${BASE_URL}/ferramentas` }
    ] : pageType === 'glossary' ? [
      { name: "Glossário", item: `${BASE_URL}/glossario` }
    ] : pageType === 'science' ? [
      { name: "Pesquisas Científicas", item: `${BASE_URL}/ciencia-e-pesquisas` }
    ] : pageType === 'cases' ? [
      { name: "Casos Clínicos", item: `${BASE_URL}/casos-clinicos` }
    ] : pageType === 'doctor' ? [
      { name: "Sobre o Psicólogo", item: `${BASE_URL}/sobre-dr-andre` }
    ] : [])
  ];

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": defaultBreadcrumbs.map((b, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": b.name,
      "item": b.item
    }))
  };

  // Article / MedicalWebPage Schema
  let articleSchema = null;
  if (pageType === 'article' && articleData) {
    articleSchema = {
      "@type": ["Article", "BlogPosting", "MedicalWebPage"],
      "@id": `${BASE_URL}/artigo/${articleData.id}#webpage`,
      "url": `${BASE_URL}/artigo/${articleData.id}`,
      "headline": articleData.title,
      "description": articleData.summary,
      "articleSection": articleData.subcategory || "Psicologia Clínica",
      "image": {
        "@type": "ImageObject",
        "url": articleData.imageUrl || `${BASE_URL}/dr-andre.jpg`,
        "width": 1200,
        "height": 630
      },
      "datePublished": articleData.reviewDate || "2026-07-20",
      "dateModified": articleData.reviewDate || "2026-07-20",
      "author": { "@id": `${BASE_URL}/#doctor` },
      "publisher": { "@id": `${BASE_URL}/#organization` },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${BASE_URL}/artigo/${articleData.id}`
      },
      "citation": articleData.evidenceBase || ["APA", "NICE", "DSM-5-TR", "CID-11"],
      "code": [articleData.dsmCode, articleData.icdCode].filter(Boolean),
      "medicalAudience": "PatientsAndPublic"
    };
  }

  // Combine graph
  const graphElements: any[] = [
    personSchema,
    organizationSchema,
    medicalBusinessSchema,
    websiteSchema,
    breadcrumbSchema,
    ...servicesSchema
  ];

  if (pageType === 'faq' || pageType === 'home') {
    graphElements.push(faqSchema);
  }

  if (articleSchema) {
    graphElements.push(articleSchema);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graphElements
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
