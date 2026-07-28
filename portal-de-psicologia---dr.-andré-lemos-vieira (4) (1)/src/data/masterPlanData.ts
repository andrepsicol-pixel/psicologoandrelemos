export interface MasterPlanSection {
  number: number;
  title: string;
  summary: string;
  details: string[];
  keyStrategies: { subtitle: string; content: string }[];
}

export const masterPlanSections: MasterPlanSection[] = [
  {
    number: 1,
    title: "Mapa Completo do Site (Sitemap Estrutural e XML)",
    summary: "Arquitetura hierárquica dividida em Nós Principais, Hubs Teóricos, Módulos de Ferramentas e Nodos Científicos.",
    details: [
      "/ (Homepage - André Lemos Vieira - CRP 01/14042)",
      "/sobre-andre-lemos (Biografia, CRP, Experiência, Consultórios em Ceilândia/Sudoeste e Online)",
      "/categorias/ [Hubs SILO: /ansiedade, /depressao, /tdah, /tea, /toc, /burnout, /relacionamentos, /luto, /autoestima, /saude-sexual, /dependencias, /personalidade, /sono, /psicoterapia]",
      "/artigos/ [Artigos especializados com URLs amigáveis e estruturadas]",
      "/ferramentas/ [Hub Interativo: /gad-7, /phq-9, /asrs-tdah, /raads-autismo, /rosenberg-autoestima, /burnout-mbi, /rpa-tcc, /diario-humor, /calculadora-sono, /plano-exposicao]",
      "/glossario/ [Termos clínicos de A a Z: /glossario/anedonia, /glossario/catastrofizacao, ...]",
      "/casos-clinicos/ [Biblioteca de estudos de caso totalmente anonimizados com aviso legal]",
      "/pesquisa-cientifica/ [Fundamentação no DSM-5-TR, CID-11, APA, NICE, Cochrane, ISSM]",
      "/perguntas-frequentes/ [Central de FAQs com otimização para Featured Snippets]",
      "/assistente-ia/ [MenteClínica AI - Triagem e psicoeducação interativa]",
      "/plano-diretor/ [Documento Estratégico do Portal - Visão de Longo Prazo]",
      "/agendamento/ [Modal de pré-agendamento e canal direto no WhatsApp]"
    ],
    keyStrategies: [
      {
        subtitle: "Sitemap XML Dinâmico com Prioridades",
        content: "Indexação por prioridades: Página Inicial (1.0), Ferramentas Interativas (0.9), Hubs de Categorias SILO (0.9), Artigos Científicos (0.8), Termos do Glossário (0.7). Atualização via PING e protocolos IndexNow para sinalização instantânea aos mecanismos de busca."
      }
    ]
  },
  {
    number: 2,
    title: "Estrutura de Categorias e Clusters SILO",
    summary: "Organização temática isolada semanticamente para transferir autoridade de página (PageRank) de forma limpa e direcionada.",
    details: [
      "SILO Ansiedade & Estresse: /ansiedade -> /ansiedade/tag, /ansiedade/panico, /ansiedade/fobia-social, /ansiedade/gad7-teste",
      "SILO Neurodesenvolvimento: /tdah -> /tdah/adultos, /tdah/disfuncao-executiva, /tdah/asrs-teste | /tea -> /tea/adultos, /tea/masking",
      "SILO Humor & Esgotamento: /depressao -> /depressao/phq9-teste | /burnout -> /burnout/mbi-teste",
      "SILO Relacionamentos & Afeto: /relacionamentos -> /relacionamentos/terapia-casal, /relacionamentos/apego-ansioso",
      "SILO Saúde Sexual Humanizada: /saude-sexual -> /saude-sexual/ansiedade-desempenho, /saude-sexual/disfuncao-eretil-psicogenica"
    ],
    keyStrategies: [
      {
        subtitle: "Isolamento de Links Internos (Internal Linking Rigoroso)",
        content: "Artigos dentro do cluster de Ansiedade apontam para a página mãe (/ansiedade) e para as ferramentas do mesmo cluster (GAD-7), mantendo a coerência semântica e a clareza para o leitor e motores de busca."
      }
    ]
  },
  {
    number: 3,
    title: "Estrutura e Padronização de URLs",
    summary: "URLs curtas, descritivas, focadas na palavra-chave primária e sem parâmetros redundantes.",
    details: [
      "Padrão de Artigo: portalpsicologia.com.br/artigos/tag-sintomas-tratamento-tcc",
      "Padrão de Categoria: portalpsicologia.com.br/categorias/ansiedade",
      "Padrão de Ferramenta: portalpsicologia.com.br/ferramentas/gad-7",
      "Padrão de Termo Glossário: portalpsicologia.com.br/glossario/catastrofizacao",
      "Padrão de Caso Clínico: portalpsicologia.com.br/casos-clinicos/manejo-tag-insonia"
    ],
    keyStrategies: [
      {
        subtitle: "Atemporalidade de URLs",
        content: "Manutenção de URLs amigáveis e atemporais, sem parâmetros temporais descartáveis, garantindo que o conteúdo permaneça continuamente atualizado."
      }
    ]
  },
  {
    number: 4,
    title: "Estratégia de SEO Técnico, Semântico e Google EEAT",
    summary: "Adequação total às diretrizes YMYL (Your Money Your Life) e validação técnica de alta performance.",
    details: [
      "Google EEAT: Todo artigo exibe identificação do autor André Lemos Vieira (CRP 01/14042), data de revisão clínica, fontes bibliográficas (DSM-5-TR, CID-11) e informações de registro no Conselho Regional de Psicologia.",
      "Schema.org Ricos: Implementação de JSON-LD para MedicalWebPage, Person, LocalBusiness (Brasília/DF), FAQPage, Article e BreadcrumbList.",
      "Core Web Vitals: LCP < 1.2s, FID/INP < 50ms, CLS = 0.00. Layout ultraleve e responsivo."
    ],
    keyStrategies: [
      {
        subtitle: "Otimização YMYL e Transparência Ética",
        content: "Inclusão de avisos legais transparentes em todas as ferramentas informando que testes de autoaplicação não constituem diagnóstico psicológico definitivo e fornecendo atalho de emergência para o CVV 188."
      }
    ]
  },
  {
    number: 5,
    title: "Estratégia de Conteúdo para os Próximos 5 Anos",
    summary: "Plano de escalabilidade de publicação mantendo o rigor científico e o compromisso ético.",
    details: [
      "Ano 1 (Fundação de Autoridade): Publicação de páginas pilares de categorias, artigos fundamentais e implantação de ferramentas interativas de triagem.",
      "Ano 2 (Expansão de Nichos): Ampliação do Glossário Clínico, adição de artigos focados em TDAH no Adulto, Burnout, Terapia Sexual e Relacionamentos.",
      "Ano 3 (Consolidação Científica): Tradução e análise de metanálises Cochrane, diretrizes NICE e expansão da Biblioteca de Casos Clínicos Anonimizados.",
      "Ano 4 (Dominância em IA e Voz): Otimização para mecanismos de busca generativos (SGE/Gemini/ChatGPT) com trechos estruturados e resumos objetivos.",
      "Ano 5 (Referência e Difusão do Conhecimento): Publicação de e-books educativos e guias de orientação para pacientes e estudantes de psicologia."
    ],
    keyStrategies: [
      {
        subtitle: "Atualização Sistemática Evergreen",
        content: "Revisão periódica dos conteúdos para manter citações em conformidade com as edições mais recentes dos manuais diagnósticos e diretrizes internacionais."
      }
    ]
  },
  {
    number: 6,
    title: "Roadmap de Implementação por Prioridade",
    summary: "Fases cronológicas de desenvolvimento da plataforma.",
    details: [
      "Fase 1 (MVP de Alta Autoridade): Lançamento do Portal com Perfil Profissional de André Lemos Vieira, Categorias SILO, Ferramentas Interativas e Agendamento via WhatsApp.",
      "Fase 2 (Engajamento e IA): Ativação do Assistente MenteClínica AI, Glossário Clínico e Biblioteca de Casos.",
      "Fase 3 (Expansão de Tráfego): Lançamento da central de FAQs otimizadas e relatórios explicativos.",
      "Fase 4 (Ecossistema Integrado): Aperfeiçoamento da área de suporte e acolhimento do paciente."
    ],
    keyStrategies: [
      {
        subtitle: "Foco Contínuo na Comunicação Ética",
        content: "Em cada fase, disponibilizar canais discretos e elegantes para agendamento de consultas com André Lemos Vieira em Brasília (Ceilândia/Sudoeste) ou Online."
      }
    ]
  },
  {
    number: 7,
    title: "Tecnologias Recomendadas e Arquitetura de Software",
    summary: "Stack moderna, resiliente, de alta velocidade e otimizada para navegação fluida.",
    details: [
      "Frontend: React 18+ TypeScript + Vite + Tailwind CSS + Motion para animações suaves.",
      "Backend API: Node.js + Express + @google/genai (Gemini 3.6 Flash) com Grounding de Corpus para o Assistente MenteClínica AI.",
      "Hospedagem & CDN: Container Cloud Run com suporte a conexões seguras e baixíssima latência.",
      "SEO Data Engine: Gerador dinâmico de Schema.org em tempo de execução."
    ],
    keyStrategies: [
      {
        subtitle: "Segurança de Dados e LGPD",
        content: "Nenhum dado pessoal inserido nos questionários de autoavaliação é armazenado sem consentimento expresso. As avaliações são processadas diretamente no navegador do usuário."
      }
    ]
  },
  {
    number: 8,
    title: "Diretrizes de Atuação e Divulgação Ética",
    summary: "Atuação pautada pelo estrito cumprimento do Código de Ética Profissional do Psicólogo (CFP).",
    details: [
      "Atendimento Clínico: Acolhimento e acompanhamento psicológico individual e de casal, presencial em Ceilândia/Sudoeste (Brasília) e online com André Lemos Vieira.",
      "Materiais Educativos: Conteúdos psicoeducativos pautados no rigor científico da TCC e da Gestalt-terapia.",
      "Compromisso Ético: Ausência de sensacionalismo, promessas apelativas ou garantias de cura, priorizando a prestação de serviços com responsabilidade profissional."
    ],
    keyStrategies: [
      {
        subtitle: "Psicoeducação Humanizada",
        content: "O conteúdo informativo de qualidade capacita o leitor a compreender sua saúde mental e buscar atendimento especializado com autonomia."
      }
    ]
  },
  {
    number: 9,
    title: "Estratégia de Presença Orgânica",
    summary: "Maximização da visibilidade e relevância nos canais de busca e recomendação.",
    details: [
      "Busca Orgânica: Cobertura de temas de interesse em saúde mental com linguagem clara, acessível e fundamentação técnica.",
      "Presença Local: Fortalecimento das informações das unidades de atendimento em Brasília (Ceilândia e Sudoeste).",
      "Acessibilidade e Usabilidade: Interface projetada para leitura confortável em dispositivos móveis e desktops."
    ],
    keyStrategies: [
      {
        subtitle: "Respostas Diretas e Esclarecedoras",
        content: "Artigos e seções estruturados de forma lógica para responder rapidamente às dúvidas mais frequentes dos leitores."
      }
    ]
  },
  {
    number: 10,
    title: "Arquitetura e Funcionalidades do Assistente Virtual MenteClínica AI",
    summary: "Inteligência Artificial desenvolvida para orientação psicoeducativa com base no acervo técnico do portal e manuais diagnósticos (DSM-5-TR e CID-11).",
    details: [
      "Motor Tecnológico: Google Gemini via SDK server-side para segurança e proteção de credenciais.",
      "Fundamentação de Conteúdo: Respostas orientadas pelo acervo do portal (artigos, casos clínicos, glossário e questionários informativos).",
      "Diretriz Ética sobre Sintomas: Esclarecimento educativo de conceitos sem emissão de diagnósticos fechados automatizados.",
      "Diretriz Ética sobre Abordagens: Destaque às práticas da TCC e Gestalt-terapia, orientando sobre a importância da avaliação médica quando necessária.",
      "Acolhimento e Encaminhamento de Emergência: Alerta automático com indicação do CVV (Ligue 188) em situações de crise e canal direto para agendamento com André Lemos Vieira (CRP 01/14042)."
    ],
    keyStrategies: [
      {
        subtitle: "Suporte Psicoeducativo Integrado",
        content: "O assistente opera como recurso informativo inicial, esclarecendo conceitos de saúde emocional e orientando para a consulta profissional individualizada."
      }
    ]
  }
];
