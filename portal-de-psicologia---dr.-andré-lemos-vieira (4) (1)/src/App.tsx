import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ViewMode } from './types/portal';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ConsultationModal } from './components/layout/ConsultationModal';
import { FloatingContactMenu } from './components/layout/FloatingContactMenu';
import { SEOHead } from './components/seo/SEOHead';
import { Skeleton } from './components/ui/Skeleton';

// Primary views loaded synchronously
import { HomeView } from './views/HomeView';
import { CategoryDetailView } from './views/CategoryDetailView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { ToolsHubView } from './views/ToolsHubView';
import { GlossaryView } from './views/GlossaryView';
import { CasesView } from './views/CasesView';
import { ScienceDigestView } from './views/ScienceDigestView';
import { FaqHubView } from './views/FaqHubView';
import { AboutDoctorView } from './views/AboutDoctorView';

// Secondary views code-split lazily for Core Web Vitals optimization
const MasterPlanView = lazy(() => import('./views/MasterPlanView').then(m => ({ default: m.MasterPlanView })));
const DesignSystemView = lazy(() => import('./views/DesignSystemView').then(m => ({ default: m.DesignSystemView })));
const CmsAdminView = lazy(() => import('./views/CmsAdminView').then(m => ({ default: m.CmsAdminView })));
const SeoEngineView = lazy(() => import('./views/SeoEngineView').then(m => ({ default: m.SeoEngineView })));
const PatientPortalView = lazy(() => import('./views/PatientPortalView').then(m => ({ default: m.PatientPortalView })));
const DigitalLibraryView = lazy(() => import('./views/DigitalLibraryView').then(m => ({ default: m.DigitalLibraryView })));
const NewsletterView = lazy(() => import('./views/NewsletterView').then(m => ({ default: m.NewsletterView })));
const SitemapView = lazy(() => import('./views/SitemapView').then(m => ({ default: m.SitemapView })));
const AiAssistant = lazy(() => import('./components/ai/AiAssistant').then(m => ({ default: m.AiAssistant })));

const ViewLoadingFallback = () => (
  <div className="max-w-7xl mx-auto px-4 py-16 space-y-6">
    <Skeleton className="h-10 w-2/3 rounded-xl bg-slate-800/50" />
    <Skeleton className="h-6 w-1/3 rounded-lg bg-slate-800/30" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      <Skeleton className="h-64 rounded-2xl bg-slate-800/40" />
      <Skeleton className="h-64 rounded-2xl bg-slate-800/40" />
      <Skeleton className="h-64 rounded-2xl bg-slate-800/40" />
    </div>
  </div>
);

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationNotes, setConsultationNotes] = useState<string>('');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, viewParam]);

  const handleNavigate = (view: ViewMode, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
  };

  const handleOpenConsultationModal = (notes?: string) => {
    setConsultationNotes(notes || '');
    setConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E293B] font-sans selection:bg-[#A68A6B]/30 selection:text-[#1A1A1A] relative overflow-x-hidden">
      {/* Dynamic SEO Meta Tags & Head Injection */}
      <SEOHead currentView={currentView} viewParam={viewParam} />

      {/* Global Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenConsultationModal={() => handleOpenConsultationModal()}
        onSearchQuery={() => handleNavigate('glossary')}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 relative z-10" id="main-content">
        <Suspense fallback={<ViewLoadingFallback />}>
          {currentView === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              onOpenConsultationModal={handleOpenConsultationModal}
            />
          )}

          {currentView === 'category' && (
            <CategoryDetailView
              categoryId={viewParam || 'ansiedade'}
              onNavigate={handleNavigate}
              onOpenConsultationModal={handleOpenConsultationModal}
            />
          )}

          {currentView === 'article' && (
            <ArticleDetailView
              articleId={viewParam || 'tag-sintomas-tratamento-tcc'}
              onNavigate={handleNavigate}
              onOpenConsultationModal={handleOpenConsultationModal}
            />
          )}

          {currentView === 'tools' && (
            <ToolsHubView
              initialToolId={viewParam || 'gad7'}
              onNavigate={handleNavigate}
              onOpenConsultationModal={handleOpenConsultationModal}
            />
          )}

          {currentView === 'glossary' && (
            <GlossaryView onNavigate={handleNavigate} />
          )}

          {currentView === 'cases' && (
            <CasesView
              onNavigate={handleNavigate}
              onOpenConsultationModal={handleOpenConsultationModal}
            />
          )}

          {currentView === 'science' && (
            <ScienceDigestView onNavigate={handleNavigate} />
          )}

          {currentView === 'faqs' && (
            <FaqHubView
              onNavigate={handleNavigate}
              onOpenConsultationModal={() => handleOpenConsultationModal()}
            />
          )}

          {currentView === 'master-plan' && (
            <MasterPlanView onNavigate={handleNavigate} />
          )}

          {currentView === 'about-doctor' && (
            <AboutDoctorView
              onNavigate={handleNavigate}
              onOpenConsultationModal={handleOpenConsultationModal}
            />
          )}

          {currentView === 'design-system' && (
            <DesignSystemView
              onNavigate={handleNavigate}
              onOpenConsultationModal={() => handleOpenConsultationModal()}
            />
          )}

          {currentView === 'cms' && (
            <CmsAdminView
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'seo-engine' && (
            <SeoEngineView
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'patient-portal' && (
            <PatientPortalView
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'library' && (
            <DigitalLibraryView
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'newsletter' && (
            <NewsletterView
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'sitemap' && (
            <SitemapView
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'ai-assistant' && (
            <div className="max-w-7xl mx-auto px-4 py-8">
              <AiAssistant
                onOpenConsultationModal={handleOpenConsultationModal}
                onNavigateToTool={(tId) => handleNavigate('tools', tId)}
              />
            </div>
          )}
        </Suspense>
      </main>

      {/* Floating Contact Menu (Fixed bottom-right) */}
      <FloatingContactMenu />

      {/* Consultation WhatsApp Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        prefilledNotes={consultationNotes}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultationModal={() => handleOpenConsultationModal()}
      />
    </div>
  );
}

export default App;
