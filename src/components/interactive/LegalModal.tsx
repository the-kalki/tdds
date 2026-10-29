import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, ArrowUpRight, ShieldCheck, Scale } from 'lucide-react';
import { legalDocuments, type LegalDocument } from '../../content/legalContent';
import { siteMeta } from '../../content/siteContent';

export interface LegalModalProps {
  isOpen: boolean;
  initialDocument?: 'privacy' | 'terms';
  onClose: () => void;
  onOpenLeadDrawer?: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialDocument = 'privacy',
  onClose,
  onOpenLeadDrawer,
}) => {
  const [activeDocKey, setActiveDocKey] = useState<'privacy' | 'terms'>(initialDocument);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus close button on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset scroll when switching tabs
  const handleTabSwitch = (doc: 'privacy' | 'terms') => {
    setActiveDocKey(doc);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const currentDoc: LegalDocument = legalDocuments[activeDocKey];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteMeta.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-drawer-title"
      className="fixed inset-0 z-50 flex justify-end animate-fade-in"
    >
      {/* 01. Backdrop: Subtle Dim & Blur */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close legal drawer backdrop"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-default border-none p-0 m-0 w-full h-full text-left"
      />

      {/* 02. Slide-Over Drawer: Premium Studio Aesthetic */}
      <div className="relative z-10 w-full max-w-xl sm:max-w-2xl bg-[#0B0B0E] text-white h-full border-l border-white/10 flex flex-col justify-between overflow-hidden shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Sticky Header */}
        <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-white/10 bg-[#0E0E12]/95 backdrop-blur-md flex-shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-tdds-coral tracking-widest uppercase font-semibold flex items-center gap-1.5">
              {activeDocKey === 'privacy' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
              LEGAL & COMPLIANCE
            </span>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Minimalist Segmented Pill Tabs */}
          <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10 w-fit">
            <button
              type="button"
              onClick={() => handleTabSwitch('privacy')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeDocKey === 'privacy'
                  ? 'bg-white text-neutral-950 shadow-md font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('terms')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeDocKey === 'terms'
                  ? 'bg-white text-neutral-950 shadow-md font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Terms of Engagement
            </button>
          </div>
        </div>

        {/* Scrollable Editorial Content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-8 text-neutral-300 text-sm leading-relaxed"
        >
          {/* Header Block */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <h2 id="legal-drawer-title" className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {currentDoc.title}
            </h2>
            <p className="text-white/50 text-xs font-mono">
              Last Updated: {currentDoc.lastUpdated} • Jurisdiction: {currentDoc.jurisdiction}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentDoc.governingLaws.map((law) => (
                <span
                  key={law}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-white/60 text-[11px] font-mono"
                >
                  {law}
                </span>
              ))}
            </div>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed pt-3">
              {currentDoc.intro}
            </p>
          </div>

          {/* Editorial Sections (No box-in-box nesting) */}
          {currentDoc.sections.map((sec, idx) => (
            <div key={sec.id} className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-tdds-coral font-bold tracking-wider uppercase">
                  SECTION 0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {sec.title.replace(/^\d+\.\s*/, '')}
                </h3>
                {sec.summary && (
                  <p className="text-xs text-white/50">
                    {sec.summary}
                  </p>
                )}
              </div>

              {/* Clean Points List */}
              <div className="space-y-3 pl-1">
                {sec.points.map((pt, pIdx) => (
                  <div key={pIdx} className="space-y-0.5">
                    {pt.heading && (
                      <h4 className="text-sm font-semibold text-white/95 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-tdds-coral flex-shrink-0" />
                        {pt.heading}
                      </h4>
                    )}
                    <p className="text-xs sm:text-sm text-white/70 pl-3 leading-relaxed">
                      {pt.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Minimal Clean Table */}
              {sec.table && (
                <div className="overflow-x-auto rounded-lg border border-white/10 my-4 bg-white/[0.01]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-white/70 bg-white/[0.03]">
                        {sec.table.headers.map((h) => (
                          <th key={h} className="py-2.5 px-3.5 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-300">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white/[0.02]">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="py-2.5 px-3.5 text-white/75">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Minimalist Editorial Callout */}
              {sec.callout && (
                <div className="border-l-2 border-tdds-coral pl-4 py-2.5 my-4 bg-white/[0.02] rounded-r-lg space-y-1">
                  <h5 className="font-semibold text-xs sm:text-sm text-white flex items-center gap-1.5">
                    {sec.callout.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {sec.callout.text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sticky Bottom Utility Bar */}
        <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#0E0E12] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="flex items-center gap-2 text-white/50">
            <span>Questions?</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-white hover:text-tdds-coral transition-colors font-mono cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Email copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{siteMeta.email}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            {onOpenLeadDrawer && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLeadDrawer();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-950 font-bold hover:bg-neutral-100 transition-all active:scale-95 text-xs shadow-md"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
