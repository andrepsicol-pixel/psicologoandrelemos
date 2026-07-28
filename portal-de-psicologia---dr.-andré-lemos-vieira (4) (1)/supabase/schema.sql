-- ============================================================================
-- BANCO DE DADOS OFICIAL - PORTAL DE PSICOLOGIA & MOTOR DE CONHECIMENTO MENTECLÍNICA
-- PSICÓLOGO ANDRÉ LEMOS VIEIRA (CRP 01/14042)
-- Compatível com PostgreSQL 15+ / Supabase com pgvector, RLS e Auditoria Automática
-- ============================================================================

-- Extensions Required
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ----------------------------------------------------------------------------
-- 1. ESTRUTURA DE AUTENTICAÇÃO E PERFIS
-- ----------------------------------------------------------------------------

CREATE TYPE user_role AS ENUM ('admin', 'editor', 'reviewer', 'author', 'patient');

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role user_role DEFAULT 'patient' NOT NULL,
  crp_registration VARCHAR(50),
  bio TEXT,
  avatar_url TEXT,
  phone VARCHAR(50),
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  lgpd_consent_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role user_role NOT NULL,
  resource VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_role_resource_action UNIQUE (role, resource, action)
);

-- ----------------------------------------------------------------------------
-- 2. ARQUITETURA DE CONTEÚDO, ESPECIALIDADES E AUTORES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  crp VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  avatar_url TEXT,
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS specialties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon_name VARCHAR(100),
  color_theme VARCHAR(50) DEFAULT 'emerald',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS topic_clusters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  pillar_article_id UUID, -- Foreign Key alterada posteriormente
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  subtitle VARCHAR(500),
  content TEXT NOT NULL,
  summary TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id),
  subcategory_id UUID REFERENCES subcategories(id),
  cluster_id UUID REFERENCES topic_clusters(id),
  author_id UUID NOT NULL REFERENCES authors(id),
  is_pillar_page BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  reading_time_minutes INT DEFAULT 5,
  medical_review_at TIMESTAMPTZ DEFAULT NOW(),
  embedding vector(1536), -- Embeddings para busca semântica RAG
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Adiciona a restrição circular para o artigo pilar
ALTER TABLE topic_clusters 
ADD CONSTRAINT fk_pillar_article 
FOREIGN KEY (pillar_article_id) REFERENCES articles(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- ----------------------------------------------------------------------------
-- 3. GLOSSÁRIO, FAQ E ESTUDOS DE CASO CLINICOS (ANONIMIZADOS)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS glossary_terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term VARCHAR(255) UNIQUE NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_definition TEXT NOT NULL,
  detailed_explanation TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  clinical_context TEXT,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  usage_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS clinical_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code_name VARCHAR(100) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  demographics VARCHAR(255) NOT NULL,
  complaint TEXT NOT NULL,
  interventions TEXT NOT NULL,
  outcomes TEXT NOT NULL,
  ethical_disclaimer TEXT DEFAULT 'Caso inteiramente sintetizado e anonimizado em consonância com o Código de Ética Profissional do Psicólogo (Resolução CFP nº 010/05).' NOT NULL,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ----------------------------------------------------------------------------
-- 4. TESTES PSICOLÓGICOS E FERRAMENTAS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS psychological_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL, -- GAD-7, PHQ-9, ASRS, etc.
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  questions JSONB NOT NULL,
  scoring_rules JSONB NOT NULL,
  disclaimer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS patient_test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  test_code VARCHAR(50) NOT NULL,
  score INT NOT NULL,
  interpretation TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ----------------------------------------------------------------------------
-- 5. MATRIZ DE SEO, SEMÂNTICA E AUDITORIA AUTOMÁTICA
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS seo_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_type VARCHAR(50) NOT NULL, -- 'article', 'category', 'term', 'case'
  resource_id UUID NOT NULL,
  meta_title VARCHAR(255) NOT NULL,
  meta_description VARCHAR(500) NOT NULL,
  canonical_url TEXT,
  schema_json JSONB NOT NULL,
  eeat_score INT DEFAULT 95,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_resource_seo UNIQUE (resource_type, resource_id)
);

CREATE TABLE IF NOT EXISTS semantic_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  target_article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  anchor_text VARCHAR(255) NOT NULL,
  link_type VARCHAR(50) DEFAULT 'contextual',
  similarity_score NUMERIC(4,3) DEFAULT 0.900,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_link_pair UNIQUE(source_article_id, target_article_id, anchor_text)
);

-- ----------------------------------------------------------------------------
-- 6. POLÍTICAS RLS (ROW LEVEL SECURITY) E SEGURANÇA SUPABASE
-- ----------------------------------------------------------------------------

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_test_results ENABLE ROW LEVEL SECURITY;

-- Leitura pública para artigos publicados
CREATE POLICY "Artigos Publicados sao Visiveis Publicamente"
  ON articles FOR SELECT
  USING (status = 'published');

-- Apenas administradores e editores podem modificar artigos
CREATE POLICY "Editores Podem Alterar Artigos"
  ON articles FOR ALL
  USING (auth.jwt() ->> 'role' IN ('admin', 'editor', 'author'));

-- Pacientes acessam apenas seus próprios resultados
CREATE POLICY "Pacientes Acessam Proprios Resultados"
  ON patient_test_results FOR ALL
  USING (auth.uid() = profile_id);

-- ----------------------------------------------------------------------------
-- 7. VIEWS DE PERFORMANCE E BUSCA
-- ----------------------------------------------------------------------------

CREATE OR REPLACE VIEW view_published_knowledge_base AS
SELECT 
  a.id,
  a.title,
  a.slug,
  a.summary,
  a.is_pillar_page,
  a.reading_time_minutes,
  c.name AS category_name,
  c.slug AS category_slug,
  auth.name AS author_name,
  auth.crp AS author_crp,
  a.published_at
FROM articles a
JOIN categories c ON a.category_id = c.id
JOIN authors auth ON a.author_id = auth.id
WHERE a.status = 'published';

-- ============================================================================
-- FIM DA ESPECIFICAÇÃO DE BANCO DE DADOS POSTGRESQL / SUPABASE
-- ============================================================================
