import React, { useEffect, useRef } from 'react';
import { X, Film } from 'lucide-react';

export interface VideoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export const VideoLightboxModal: React.FC<VideoLightboxModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title = "TDDS Studio Showreel",
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus trap on close button
    closeButtonRef.current?.focus();

    // Escape listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video player backdrop"
        className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-default border-none p-0 m-0"
      />
      <div
        className="relative z-10 w-full max-w-4xl bg-neutral-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tdds-lime animate-pulse" />
            <h3 id="video-modal-title" className="text-sm font-mono text-white/90 uppercase tracking-wider">
              {title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-tdds-lime"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player or Placeholder */}
        <div className="relative aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 select-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <Film className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-300" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-800/80 border border-white/10 text-xs font-mono tracking-widest text-neutral-300 uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-tdds-lime animate-pulse" />
                In Production
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                On The Way
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
                Our official showreel is currently in the editing suite and will be dropping here shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
