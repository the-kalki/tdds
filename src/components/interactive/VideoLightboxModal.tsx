import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface VideoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export const VideoLightboxModal: React.FC<VideoLightboxModalProps> = ({
  isOpen,
  onClose,
  videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4",
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
        className="relative z-10 w-full max-w-5xl bg-neutral-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
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

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
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
        </div>
      </div>
    </div>
  );
};
