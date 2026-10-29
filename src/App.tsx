import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesBentoSection } from './components/sections/ServicesBentoSection';
import { FeaturedWorkSection } from './components/sections/FeaturedWorkSection';
import { ClientProofMarquee } from './components/interactive/ClientProofMarquee';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ProcessStrip } from './components/sections/ProcessStrip';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/layout/Footer';
import { LeadCaptureDrawer } from './components/interactive/LeadCaptureDrawer';
import { DeliverablesDrawer } from './components/interactive/DeliverablesDrawer';
import { VideoLightboxModal } from './components/interactive/VideoLightboxModal';
import type { ServiceCompartment } from './types/content';
import { heroContent } from './content/siteContent';

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

  const handleOpenLeadDrawer = (service?: string) => {
    setSelectedService(service);
    setIsLeadDrawerOpen(true);
  };

  const handleCloseLeadDrawer = () => {
    setIsLeadDrawerOpen(false);
    setSelectedService(undefined);
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
      <Footer onOpenLeadDrawer={() => handleOpenLeadDrawer()} />

      {/* Interactive Overlays & Modals */}
      <LeadCaptureDrawer
        isOpen={isLeadDrawerOpen}
        onClose={handleCloseLeadDrawer}
        preSelectedService={selectedService}
      />

      <DeliverablesDrawer
        isOpen={!!activeDrawerService}
        service={activeDrawerService}
        onClose={() => setActiveDrawerService(null)}
        onEnquire={(title) => handleOpenLeadDrawer(title)}
      />

      <VideoLightboxModal
        isOpen={videoModal.isOpen}
        onClose={handleCloseVideoModal}
        videoUrl={videoModal.videoUrl}
        title={videoModal.title}
      />
    </div>
  );
};

export default App;
