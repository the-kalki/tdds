import React, { useState, lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesBentoSection } from './components/sections/ServicesBentoSection';
import { FeaturedWorkSection } from './components/sections/FeaturedWorkSection';
import { ClientProofMarquee } from './components/interactive/ClientProofMarquee';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ProcessStrip } from './components/sections/ProcessStrip';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/layout/Footer';
import type { ServiceCompartment } from './types/content';
import { heroContent } from './content/siteContent';

// Lazy-load interactive modals & drawers so their code and legal/form payloads
// are excluded from the critical initial bundle and only parsed on user interaction.
const LeadCaptureDrawer = lazy(() =>
  import('./components/interactive/LeadCaptureDrawer').then((m) => ({ default: m.LeadCaptureDrawer }))
);
const DeliverablesDrawer = lazy(() =>
  import('./components/interactive/DeliverablesDrawer').then((m) => ({ default: m.DeliverablesDrawer }))
);
const VideoLightboxModal = lazy(() =>
  import('./components/interactive/VideoLightboxModal').then((m) => ({ default: m.VideoLightboxModal }))
);
const LegalModal = lazy(() =>
  import('./components/interactive/LegalModal').then((m) => ({ default: m.LegalModal }))
);

export const App: React.FC = () => {
  const [isLeadDrawerOpen, setIsLeadDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [activeDrawerService, setActiveDrawerService] = useState<ServiceCompartment | null>(null);

  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoUrl?: string;
    title?: string;
  }>({
    isOpen: false,
    videoUrl: undefined,
    title: undefined,
  });

  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    initialDoc: 'privacy' | 'terms';
  }>({
    isOpen: false,
    initialDoc: 'privacy',
  });

  const handleOpenLeadDrawer = (service?: string) => {
    setSelectedService(service);
    setIsLeadDrawerOpen(true);
  };

  const handleCloseLeadDrawer = () => {
    setIsLeadDrawerOpen(false);
    setSelectedService(undefined);
  };

  const handleOpenLegal = (doc: 'privacy' | 'terms') => {
    setLegalModal({
      isOpen: true,
      initialDoc: doc,
    });
  };

  const handleCloseLegal = () => {
    setLegalModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleOpenShowreel = () => {
    setVideoModal({
      isOpen: true,
      videoUrl: heroContent.showreelVideoUrl,
      title: "The Design Dude Studio — Showreel",
    });
  };

  const handleOpenCaseVideo = (videoUrl: string, title: string) => {
    setVideoModal({
      isOpen: true,
      videoUrl,
      title,
    });
  };

  const handleCloseVideoModal = () => {
    setVideoModal({
      isOpen: false,
      videoUrl: undefined,
      title: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-tdds-ivory text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 01. Sticky Header Navigation */}
      <Navbar onOpenLeadDrawer={() => handleOpenLeadDrawer()} />

      <main id="main">
        {/* 02. Hero Section: "IDEAS INTO IMPACT." */}
        <HeroSection
          onOpenLeadDrawer={() => handleOpenLeadDrawer()}
          onOpenShowreel={handleOpenShowreel}
        />

        {/* 03. Services Bento Grid (Obsidian Canvas) */}
        <ServicesBentoSection
          onSelectService={(service) => setActiveDrawerService(service)}
          onOpenLeadDrawer={() => handleOpenLeadDrawer()}
        />

        {/* 04. Featured Work Portfolio (Ivory Canvas) */}
        <FeaturedWorkSection
          onOpenCaseVideo={handleOpenCaseVideo}
          onOpenLeadDrawer={() => handleOpenLeadDrawer()}
        />

        {/* 05. Client Roster Infinite Marquee (Obsidian Canvas) */}
        <ClientProofMarquee />

        {/* 06. Testimonials Carousel (Ivory Canvas) */}
        <TestimonialsSection />

        {/* 07. The Way We Work (Process Strip) */}
        <ProcessStrip />

        {/* 08. High-Intent Questions & Answers */}
        <FaqSection />
      </main>

      {/* 09. Blueprint Closing & Studio Footer */}
      <Footer
        onOpenLeadDrawer={() => handleOpenLeadDrawer()}
        onOpenLegal={handleOpenLegal}
      />

      {/* Interactive Overlays & Modals (Mounted & fetched on demand) */}
      <Suspense fallback={null}>
        {isLeadDrawerOpen && (
          <LeadCaptureDrawer
            key={`lead-${selectedService ?? 'default'}`}
            isOpen={isLeadDrawerOpen}
            onClose={handleCloseLeadDrawer}
            preSelectedService={selectedService}
          />
        )}

        {activeDrawerService && (
          <DeliverablesDrawer
            isOpen={!!activeDrawerService}
            service={activeDrawerService}
            onClose={() => setActiveDrawerService(null)}
            onEnquire={(title) => handleOpenLeadDrawer(title)}
          />
        )}

        {videoModal.isOpen && (
          <VideoLightboxModal
            isOpen={videoModal.isOpen}
            onClose={handleCloseVideoModal}
            videoUrl={videoModal.videoUrl}
            title={videoModal.title}
          />
        )}

        {legalModal.isOpen && (
          <LegalModal
            key={`${legalModal.isOpen ? 'open' : 'closed'}-${legalModal.initialDoc}`}
            isOpen={legalModal.isOpen}
            initialDocument={legalModal.initialDoc}
            onClose={handleCloseLegal}
            onOpenLeadDrawer={() => handleOpenLeadDrawer()}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
