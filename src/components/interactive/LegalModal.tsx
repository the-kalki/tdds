import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, Scale, AlertTriangle, Copy, Check } from 'lucide-react';
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
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-focus close button for screen readers & keyboard nav on mount
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Lock body scroll and attach Escape key listener
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

  // Reset scroll position when switching tabs
  useEffect(() => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeDocKey]);

  if (!isOpen) return null;

  const currentDoc: LegalDocument = legalDocuments[activeDocKey];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteMeta.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`legal-sec-${id}`);
    if (el && contentContainerRef.current) {
      const topOffset = el.offsetTop - 80;
      contentContainerRef.current.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      {/* 01. Backdrop: Obsidian Glassmorphism */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
      />

      {/* 02. Modal Window: Slate & Glass Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-[#0C0D12] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 transition-all animate-in zoom-in-95 duration-300">
        {/* Top Header & Tab Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-white/10 bg-[#12131A]/90 backdrop-blur-md">
          {/* Studio Tag & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-tdds-coral flex-shrink-0">
              {activeDocKey === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-mono text-white/50 block">
                LEGAL & COMPLIANCE
              </span>
              <h2 id="legal-modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                {currentDoc.title}
              </h2>
            </div>
          </div>

          {/* Segmented Pill Tabs */}
          <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10 self-center sm:self-auto">
            <button
              onClick={() => setActiveDocKey('privacy')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeDocKey === 'privacy'
                  ? 'bg-white text-neutral-950 shadow-md font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveDocKey('terms')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeDocKey === 'terms'
                  ? 'bg-white text-neutral-950 shadow-md font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Terms of Engagement
            </button>
          </div>

          {/* Close Action */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3.5 right-4 sm:relative sm:top-auto sm:right-auto w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Jump Ribbon & Metadata */}
        <div className="px-5 sm:px-7 py-3 bg-white/[0.02] border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tdds-coral/10 border border-tdds-coral/20 text-tdds-coral font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-tdds-coral animate-pulse" />
              {currentDoc.badge}
            </span>
            <span className="text-white/40 font-mono text-[11px]">
              Jurisdiction: <span className="text-white/70">{currentDoc.jurisdiction}</span>
            </span>
          </div>

          {/* Table of contents quick jumps */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            {currentDoc.sections.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[11px] whitespace-nowrap transition-colors"
              >
                {idx + 1}. {sec.title.split('.')[1]?.trim() || sec.title}
              </button>
            ))}
          </div>
        </div>

        {/* 03. Scrollable Content Body */}
        <div
          ref={contentContainerRef}
          className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-8 text-neutral-300 text-sm leading-relaxed"
        >
          {/* Lead Intro Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white/80">
            <p className="text-sm sm:text-base leading-relaxed text-white/90">
              {currentDoc.intro}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-white/5">
              <span className="text-xs text-white/40 uppercase font-mono tracking-wider mr-1">Statutes:</span>
              {currentDoc.governingLaws.map((law) => (
                <span
                  key={law}
                  className="px-2 py-0.5 rounded bg-white/5 text-white/60 text-[11px] font-mono"
                >
                  {law}
                </span>
              ))}
            </div>
          </div>

          {/* Sections List */}
          {currentDoc.sections.map((sec) => (
            <div
              key={sec.id}
              id={`legal-sec-${sec.id}`}
              className="space-y-4 pt-2 border-t border-white/5 first:border-none first:pt-0"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {sec.title}
                </h3>
                {sec.summary && (
                  <p className="text-xs sm:text-sm text-white/50 mt-1">
                    {sec.summary}
                  </p>
                )}
              </div>

              {/* Points */}
              <div className="space-y-3">
                {sec.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 hover:border-white/10 transition-colors"
                  >
                    {pt.heading && (
                      <h4 className="text-sm font-semibold text-white/90 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-tdds-coral" />
                        {pt.heading}
                      </h4>
                    )}
                    <p className="text-xs sm:text-sm text-neutral-300 pl-3.5">
                      {pt.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Optional High-Impact Table */}
              {sec.table && (
                <div className="overflow-x-auto rounded-xl border border-white/10 my-3">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-white/70">
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
                            <td key={cIdx} className="py-2.5 px-3.5">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Optional Callout Card */}
              {sec.callout && (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    sec.callout.type === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                      : 'bg-tdds-coral/10 border-tdds-coral/20 text-white'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {sec.callout.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-tdds-coral" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs sm:text-sm tracking-tight text-white">
                      {sec.callout.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                      {sec.callout.text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 04. Bottom Action Footer */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-white/10 bg-[#12131A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-white/50">
            <span>Questions regarding terms?</span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-white hover:text-tdds-coral transition-colors font-mono"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to clipboard!</span>
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
                onClick={() => {
                  onClose();
                  onOpenLeadDrawer();
                }}
                className="px-4 py-2 rounded-full bg-white text-neutral-950 font-bold hover:bg-neutral-100 transition-all active:scale-95 text-xs shadow-md"
              >
                Start a Conversation
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
