export type ViewMode = 
  | 'home'
  | 'category'
  | 'article'
  | 'tools'
  | 'tool-detail'
  | 'glossary'
  | 'cases'
  | 'science'
  | 'faqs'
  | 'master-plan'
  | 'about-doctor'
  | 'ai-assistant'
  | 'design-system'
  | 'cms'
  | 'seo-engine'
  | 'patient-portal'
  | 'library'
  | 'newsletter'
  | 'sitemap';

export interface DoctorLocation {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  addressShort: string;
  fullAddress: string;
  googleMapsEmbedUrl: string;
  googleMapsLink: string;
  description: string;
}

export interface AuthorProfile {
  name: string;
  crp: string;
  title: string;
  university: string;
  specializationInstitution: string;
  approaches: string[];
  targetAudience: string[];
  documentsProvided: string[];
  specialties: string[];
  location: string;
  address: string;
  bio: string;
  howIWorkText: string;
  experienceYears: number;
  clinicAddress: string;
  locations: DoctorLocation[];
  whatsappNumber: string;
  whatsappMessageDefault: string;
  instagramUrl?: string;
  phone?: string;
  email: string;
  avatarUrl: string;
  googleRating: number;
  googleReviewsCount: number;
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  subcategories: string[];
  siloCluster: string;
  symptomsList: string[];
  recommendedTools: string[];
  articlesCount: number;
  featuredArticleId?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  categoryId: string;
  subcategory?: string;
  author: string;
  crp: string;
  reviewDate: string;
  readingTimeMinutes: number;
  dsmCode?: string;
  icdCode?: string;
  evidenceBase: string[];
  tags: string[];
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  featured?: boolean;
  imageUrl?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  definition: string;
  clinicalContext: string;
  etymology?: string;
  relatedTerms: string[];
}

export interface ClinicalCase {
  id: string;
  title: string;
  category: string;
  patientAgeGender: string;
  initialComplaint: string;
  assessmentSteps: string[];
  cbtFormulation: string;
  gestaltIntervention: string;
  sessionsDuration: string;
  outcome: string;
  keyLearnings: string[];
}

export interface ScientificStudy {
  id: string;
  title: string;
  source: string;
  year: number;
  category: string;
  simplifiedSummary: string;
  clinicalImpact: string;
  evidenceLevel: string;
  originalCitation: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  featuredSnippetTarget: boolean;
}

export interface ToolResult {
  score: number;
  maxScore: number;
  severity: 'Mínima' | 'Leve' | 'Moderada' | 'Grave' | 'Muito Grave';
  title: string;
  description: string;
  recommendation: string;
  shareableText: string;
}
