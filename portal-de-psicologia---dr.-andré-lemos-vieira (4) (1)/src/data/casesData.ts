import { ClinicalCase } from '../types/portal';

export const casesData: ClinicalCase[] = [
  {
    id: "caso-tag-empresaria-brasilia",
    title: "Estudo de Caso: Manejo do TAG e Insônia com Reestruturação Cognitiva em TCC",
    category: "Ansiedade & TAG",
    patientAgeGender: "Paciente M.S., 38 anos, Empresária (Brasília/DF)",
    initialComplaint: "Ataques diários de ansiedade, insônia inicial grave (demorando mais de 2 horas para adormecer) e tensão muscular constante na região cervical por medo de falência dos negócios.",
    assessmentSteps: [
      "Aplicação da escala GAD-7 (Pontuação inicial: 18 - Ansiedade Grave).",
      "Aplicação do diário de sono (PSQI - Qualidade de sono ruim).",
      "Mapeamento do ciclo de pensamento catastrófico de ruína financeira."
    ],
    cbtFormulation: "A paciente apresentava a crença central de vulnerabilidade ('Se eu não controlar tudo, o caos acontecerá'). Os pensamentos automáticos de perigo iminente disparavam hiperativação autônoma à noite.",
    gestaltIntervention: "Trabalho com o experimento de conscientização no aqui-e-agora para acolher a vulnerabilidade reprimida e aliviar o perfeccionismo excessivo.",
    sessionsDuration: "16 sessões semanais de psicoterapia individual.",
    outcome: "Redução da pontuação no GAD-7 para 5 (Ansiedade Leve/Normal). Latência de sono reduzida de 120 minutos para 20 minutos. Retomada de atividades de lazer com maior equilíbrio emocional.",
    keyLearnings: [
      "A tolerância à incerteza é um pilar transformador no tratamento do TAG.",
      "Integrar a higiene do sono às técnicas da TCC acelera a diminuição do estresse e da ansiedade noturna."
    ]
  },
  {
    id: "caso-tdah-adulto-engenheiro",
    title: "Estudo de Caso: Diagnóstico Tardio de TDAH e Estruturação de Funções Executivas",
    category: "TDAH",
    patientAgeGender: "Paciente R.G., 42 anos, Engenheiro de Software (Atendimento Online)",
    initialComplaint: "Sensação crônica de estagnação na carreira, erros por desatenção no trabalho remoto, procrastinação de relatórios e explosões de frustração com familiares.",
    assessmentSteps: [
      "Aplicação do ASRS v1.1 (Pontuação Parte A: 6/6 positiva).",
      "Entrevista clínica retroativa sobre o histórico escolar e familiar na infância.",
      "Investigação de comorbidades (ansiedade secundária à procrastinação)."
    ],
    cbtFormulation: "Disfunção executiva severa compensada por anos com estresse e noites em claro. A baixa motivação dopaminérgica gerava busca por urgência de última hora para iniciar tarefas.",
    gestaltIntervention: "Tomada de consciência da autocrítica destrutiva e ressignificação do diagnóstico tardio como ferramenta de autoconhecimento e autorregulação.",
    sessionsDuration: "20 sessões psicoterapêuticas com psicoeducação familiar.",
    outcome: "Implementação de métodos adaptados de organização temporal (Time-Blocking) e acompanhamento psiquiátrico integrado. Aumento da produtividade e pacificação das relações familiares.",
    keyLearnings: [
      "O diagnóstico tardio traz alívio emocional e elimina a falsa crença de incapacidade.",
      "Ajustes no ambiente físico e digital são indispensáveis para o manejo funcional do TDAH."
    ]
  },
  {
    id: "caso-burnout-servidora-publica",
    title: "Estudo de Caso: Reabilitação Emocional de Burnout e Restabelecimento de Limites",
    category: "Burnout",
    patientAgeGender: "Paciente C.A., 45 anos, Servidora Pública Federal (Brasília/DF)",
    initialComplaint: "Choro compulsivo no ambiente de trabalho, cinismo extremo com colegas de equipe, taquicardia ao ligar o computador e esquecimentos frequentes.",
    assessmentSteps: [
      "Aplicação do Maslach Burnout Inventory (MBI - Pontuações altas em Exaustão Emocional e Despersonalização).",
      "Mapeamento de comportamentos de submissão a demandas alheias (People-pleasing).",
      "Acompanhamento médico integrado."
    ],
    cbtFormulation: "Crença central de que impor limites no ambiente profissional significava rejeição ou fraqueza, resultando em sobrecarga contínua.",
    gestaltIntervention: "Exercícios de percepção de limites corporais e sinais somáticos de esgotamento antes da aceitação de demandas excessivas.",
    sessionsDuration: "24 sessões de psicoterapia.",
    outcome: "Estabelecimento de limites claros de horário, retorno gradual ao trabalho com postura assertiva e sem sobrecarga.",
    keyLearnings: [
      "Estabelecer limites saudáveis frente a demandas externas é condição indispensável para preservar a saúde mental.",
      "A recuperação do Burnout requer reestruturação de hábitos, autocompaixão e resgate do sentido do trabalho."
    ]
  }
];
