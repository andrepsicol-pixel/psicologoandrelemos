import { GlossaryTerm } from '../types/portal';

export const glossaryData: GlossaryTerm[] = [
  {
    id: "anedonia",
    term: "Anedonia",
    category: "Psicopatologia & Humor",
    definition: "Incapacidade total ou parcial de sentir prazer em atividades que anteriormente eram consideradas agradáveis e gratificantes.",
    clinicalContext: "É um dos sintomas cardinais do Transtorno Depressivo Maior (DSM-5-TR) e da esquizofrenia. Relaciona-se com hipoativação nos circuitos dopaminérgicos do sistema de recompensa cerebral.",
    etymology: "Do grego 'an-' (sem) + 'hedone' (prazer).",
    relatedTerms: ["Depressão", "Dopamina", "Distimia", "Ativação Comportamental"]
  },
  {
    id: "agorafobia",
    term: "Agorafobia",
    category: "Ansiedade & Fobias",
    definition: "Medo acentuado ou ansiedade desproporcional em situações de onde a fuga possa ser difícil ou onde o auxílio não esteja disponível em caso de pânico.",
    clinicalContext: "Comum em pacientes com Síndrome do Pânico. Abrange medo de transporte público, locais abertos, multidões ou estar sozinho fora de casa.",
    etymology: "Do grego 'agora' (praça pública) + 'phobos' (medo).",
    relatedTerms: ["Síndrome do Pânico", "TAG", "Plano de Exposição"]
  },
  {
    id: "alexitimia",
    term: "Alexitimia",
    category: "Neuropsicologia & Afeto",
    definition: "Dificuldade marcante na identificação, diferenciação e verbalização dos próprios estados emocionais.",
    clinicalContext: "Frequente em quadros somáticos, TEA no adulto e estresse pós-traumático. O indivíduo descreve sensações corporais sem conseguir nomear a emoção subjacente.",
    etymology: "Do grego 'a-' (sem) + 'lexis' (palavra) + 'thymos' (emoção).",
    relatedTerms: ["TEA", "Somatização", "Regulação Emocional"]
  },
  {
    id: "assertividade",
    term: "Assertividade",
    category: "Habilidades Sociais",
    definition: "Capacidade de expressar sentimentos, desejos e opiniões de forma direta, clara e respeitosa, sem adotar postura passiva nem agressiva.",
    clinicalContext: "Treinada com frequência na Terapia Cognitivo-Comportamental para tratamento de ansiedade social, burnout e conflitos de casal.",
    relatedTerms: ["Habilidades Sociais", "CNV", "Autoestima"]
  },
  {
    id: "awareness",
    term: "Awareness (Tomada de Consciência)",
    category: "Gestalt-terapia",
    definition: "Consciência clara e sensorial do indivíduo sobre suas necessidades, sensações corporais e ambiente no momento presente.",
    clinicalContext: "Conceito central na Gestalt-terapia. Permite ao paciente perceber como interrompe seu próprio ciclo de contato e satisfação.",
    etymology: "Do inglês 'aware' (consciente, ciente).",
    relatedTerms: ["Gestalt-terapia", "Aqui e Agora", "Mindfulness"]
  },
  {
    id: "catastrofizacao",
    term: "Catastrofização",
    category: "Distorções Cognitivas",
    definition: "Distorção cognitiva em que o indivíduo antecipa o pior cenário possível para o futuro sem considerar evidências realistas.",
    clinicalContext: "Elemento chave no Transtorno de Ansiedade Generalizada (TAG) e na dor crônica. Reestruturada pela TCC através da identificação de evidências.",
    relatedTerms: ["TCC", "Distorção Cognitiva", "Registro de Pensamentos"]
  },
  {
    id: "compulsao",
    term: "Compulsão",
    category: "Transtornos Obsessivos",
    definition: "Comportamento repetitivo (físico ou mental) que a pessoa se sente impelida a executar para aliviar a ansiedade provocada por uma obsessão.",
    clinicalContext: "Característica do TOC e de vícios comportamentais (como apostas e pornografia). Trata-se com Exposição e Prevenção de Resposta (ERP).",
    relatedTerms: ["TOC", "Obsessão", "ERP", "Apostas Eletrônicas"]
  },
  {
    id: "despersonalizacao",
    term: "Despersonalização",
    category: "Transtornos Dissociativos",
    definition: "Sensação irreal de estar destacado de si mesmo, do próprio corpo ou dos processos mentais, como se fosse um observador externo.",
    clinicalContext: "Pode ocorrer durante ataques de pânico intensos, episódios de trauma, síndrome de burnout ou no transtorno dissociativo de despersonalização/desrealização.",
    relatedTerms: ["Desrealização", "Pânico", "Burnout", "Trauma"]
  },
  {
    id: "disfuncao-executiva",
    term: "Disfunção Executiva",
    category: "Neuropsicologia",
    definition: "Prejuízo no conjunto de habilidades cognitivas que permitem planejar, focar a atenção, lembrar de instruções e gerenciar múltiplas tarefas.",
    clinicalContext: "Sintoma central no TDAH, lesões no córtex pré-frontal e em quadros demenciais. Requer estratégias de estruturação ambiental e TCC.",
    relatedTerms: ["TDAH", "ASRS", "Memória de Trabalho"]
  },
  {
    id: "distimia",
    term: "Distimia (Transtorno Depressivo Persistente)",
    category: "Psicopatologia & Humor",
    definition: "Quadro depressivo crônico de intensidade leve a moderada que persiste por pelo menos 2 anos ininterruptos.",
    clinicalContext: "O indivíduo frequentemente relata 'sempre ter sido assim' (humor rebaixado, mau humor crônico, pouca energia). Excelente resposta à TCC aliada à farmacoterapia.",
    relatedTerms: ["Depressão", "PHQ-9", "Anedonia"]
  },
  {
    id: "emdr",
    term: "EMDR",
    category: "Abordagens Terapêuticas",
    definition: "Dessensibilização e Reprocessamento por Movimentos Oculares. Abordagem psicoterápica validada para o tratamento de traumas e TEPT.",
    clinicalContext: "Utiliza estimulação bilateral (visual, auditiva ou tátil) para reprocessar memórias traumáticas consolidadas disfuncionalmente no cérebro.",
    relatedTerms: ["TEPT", "Trauma", "Dessensibilização"]
  },
  {
    id: "hipervigilancia",
    term: "Hipervigilância",
    category: "Ansiedade & Trauma",
    definition: "Estado de alerta constante e exagerado, com escaneamento contínuo do ambiente em busca de potenciais ameaças.",
    clinicalContext: "Comum no Transtorno de Estresse Pós-Traumático (TEPT), na Síndrome do Pânico e em pessoas criadas em ambientes altamente instáveis.",
    relatedTerms: ["TEPT", "Pânico", "Ansiedade"]
  },
  {
    id: "masking",
    term: "Masking (Camuflagem Social)",
    category: "Neurodiversidade",
    definition: "Estratégia consciente ou inconsciente adotada por autistas para suprimir traços neurodivergentes e imitar comportamentos neurotípicos.",
    clinicalContext: "Muito frequente em mulheres e adultos autistas sem deficiência intelectual. É uma causa primária de burnout autista e ansiedade social.",
    relatedTerms: ["TEA", "RAADS-R", "Autismo Adulto"]
  },
  {
    id: "psicoeducacao",
    term: "Psicoeducação",
    category: "Técnicas de TCC",
    definition: "Intervenção pedagógica clínica onde o profissional explica detalhadamente ao paciente o funcionamento de seu transtorno e do tratamento.",
    clinicalContext: "Aumenta a adesão ao tratamento, reduz o estigma e capacita o paciente a se tornar seu próprio terapeuta ao longo do tempo.",
    relatedTerms: ["TCC", "Terapia Cognitivo-Comportamental", "DSM-5-TR"]
  },
  {
    id: "resiliencia",
    term: "Resiliência",
    category: "Psicologia Positiva & Adaptação",
    definition: "Capacidade psicológica de se adaptar positivamente, se recuperar ou crescer após vivenciar adversidades ou traumas significativos.",
    clinicalContext: "Desenvolvida na terapia através do fortalecimento de recursos de enfrentamento, regulação emocional e ressignificação de narrativa.",
    relatedTerms: ["Autocompaixão", "Afrontamento", "Luto"]
  },
  {
    id: "somatizacao",
    term: "Somatização",
    category: "Psicossegurança",
    definition: "Manifestação de conflitos ou sofrimentos psicológicos sob a forma de sintomas físicos sem explicação médica orgânica direta.",
    clinicalContext: "Frequente em pacientes com dificuldade de expressão emocional. Dores musculares, gastrite nervosa e cefaleias tensionais são exemplos.",
    relatedTerms: ["Alexitimia", "Sintomas Somáticos", "Estresse"]
  }
];
