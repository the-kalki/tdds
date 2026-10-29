import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { validateEnquiry, type EnquiryPayload } from '../../types/content';
import { siteMeta } from '../../content/siteContent';
import { BackButton } from '../common/BackButton';
import { ContinueButton } from '../common/ContinueButton';
import { SendButton } from '../common/SendButton';

export interface LeadCaptureDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const LeadCaptureDrawer: React.FC<LeadCaptureDrawerProps> = ({
  isOpen,
  onClose,
  preSelectedService,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Partial<EnquiryPayload>>({
    serviceNeeded: (preSelectedService as any) || 'Full-Stack Creative',
    estimatedBudget: '₹50,000 - ₹1,50,000',
    name: '',
    brand: '',
    emailOrPhone: '',
    projectDetails: '',
  });

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({
        ...prev,
        serviceNeeded: preSelectedService as any,
      }));
    }
  }, [preSelectedService]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state after closed
      setTimeout(() => {
        setStep(1);
        setIsSubmitted(false);
        setErrors({});
      }, 300);
      return;
    }

    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const servicesList = [
    'Content & Video',
    'Social Media',
    'Advertising & Growth',
    'Branding & Design',
    'Full-Stack Creative',
    'Other',
  ] as const;

  const budgetTiers = [
    'Under ₹50,000',
    '₹50,000 - ₹1,50,000',
    '₹1,50,000 - ₹5,00,000',
    '₹5,00,000+',
    'Not sure yet',
  ] as const;

  const handleNext = () => {
    setErrors({});
    if (step === 1) {
      if (!formData.serviceNeeded) {
        setErrors({ serviceNeeded: 'Please pick a service' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = validateEnquiry(formData);
    if (!result.success || !result.data) {
      setErrors(result.errors);
      return;
    }

    const payload = result.data;

    // 1. Dual-Route Storage: Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('tdds_enquiries') || '[]');
      existing.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem('tdds_enquiries', JSON.stringify(existing));
    } catch {
      // LocalStorage access fallback
    }

    // 2. Dual-Route Launch: Build encoded WhatsApp URL
    const messageLines = [
      `*New Project Enquiry — The Design Dude Studio*`,
      `----------------------------------------`,
      `• *Client Name:* ${payload.name}`,
      payload.brand ? `• *Brand:* ${payload.brand}` : null,
      `• *Contact:* ${payload.emailOrPhone}`,
      `• *Service:* ${payload.serviceNeeded}`,
      `• *Budget:* ${payload.estimatedBudget}`,
      payload.projectDetails ? `• *Brief:* ${payload.projectDetails}` : null,
      `----------------------------------------`,
      `Sent via thedesigndudestudio.com`,
    ].filter(Boolean);

    const waUrl = `https://wa.me/${siteMeta.whatsappNumber}?text=${encodeURIComponent(
      messageLines.join('\n')
    )}`;

    setIsSubmitted(true);

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-drawer-title"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close enquiry drawer backdrop"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-default border-none p-0 m-0"
      />
      <div
        className="relative z-10 w-full max-w-lg bg-neutral-950 text-white h-full border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tdds-lime animate-pulse" />
              <span className="font-mono text-xs text-white/60 tracking-wider uppercase">
                {isSubmitted ? 'ENQUIRY CONFIRMED' : `STEP 0${step} OF 03`}
              </span>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close enquiry form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSubmitted ? (
            <div>
              {/* Step 1: Service */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 id="lead-drawer-title" className="font-display font-bold text-2xl text-white mb-2">
                      What are you looking to create?
                    </h3>
                    <p className="text-white/60 text-sm">
                      Select the primary service your brand requires.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesList.map((service) => {
                      const isSelected = formData.serviceNeeded === service;
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceNeeded: service })}
                          className={`p-4 rounded-xl text-left border transition-all text-sm font-medium ${
                            isSelected
                              ? 'bg-tdds-lime/15 border-tdds-lime text-tdds-lime'
                              : 'bg-white/5 border-white/10 text-white/80 hover:border-white/30'
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Budget & Brief */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white mb-2">
                      Scope & Estimated Budget
                    </h3>
                    <p className="text-white/60 text-sm">
                      Helps us recommend the best creative approach for your goals.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-3">
                      Estimated Investment
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetTiers.map((tier) => {
                        const isSelected = formData.estimatedBudget === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setFormData({ ...formData, estimatedBudget: tier })}
                            className={`px-3.5 py-2 rounded-pill text-xs font-mono transition-all ${
                              isSelected
                                ? 'bg-white text-neutral-950 font-bold shadow'
                                : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/30'
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-notes" className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                      Project Notes (Optional)
                    </label>
                    <textarea
                      id="lead-notes"
                      name="projectDetails"
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Tell us about your launch date, campaign ideas, or existing social presence..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white mb-2">
                      Where can we reach you?
                    </h3>
                    <p className="text-white/60 text-sm">
                      We'll connect directly to discuss the roadmap.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="lead-name" className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Karan Shah"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="lead-brand" className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">
                      Brand or Company Name (Optional)
                    </label>
                    <input
                      id="lead-brand"
                      name="brand"
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g. Zanzar Jewellers"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-contact" className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-1.5">
                      Email or WhatsApp Phone *
                    </label>
                    <input
                      id="lead-contact"
                      name="emailOrPhone"
                      type="text"
                      required
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      placeholder="e.g. +91 98765 43210 or karan@brand.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                    />
                    {errors.emailOrPhone && (
                      <p className="text-xs text-red-400 mt-1">{errors.emailOrPhone}</p>
                    )}
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Success Confirmation Screen */
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-tdds-lime/20 border border-tdds-lime/40 flex items-center justify-center text-tdds-lime mb-6 animate-scale-up">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Enquiry Sent Successfully!
              </h3>
              <p className="text-white/60 text-sm max-w-sm mb-6 leading-relaxed">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. Your brief has been securely logged and forwarded to our creative team.
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-tdds-lime mb-8 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Expected Response: Within 24 hours</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10">
          {!isSubmitted ? (
            <div className="flex items-center gap-3">
              {step > 1 && (
                <BackButton
                  onClick={() => setStep((step - 1) as any)}
                  aria-label="Go back to previous step"
                />
              )}

              {step < 3 ? (
                <ContinueButton
                  onClick={handleNext}
                  className="flex-1 h-14"
                >
                  Continue
                </ContinueButton>
              ) : (
                <SendButton
                  onClick={handleSubmit}
                  className="flex-1 h-14"
                >
                  Send Enquiry & Open WhatsApp
                </SendButton>
              )}
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-full bg-white text-neutral-950 font-bold rounded-pill py-3.5 text-sm"
            >
              Done & Return to Studio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
