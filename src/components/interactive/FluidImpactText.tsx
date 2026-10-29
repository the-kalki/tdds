import React from 'react';

export interface FluidImpactTextProps {
  className?: string;
}

/**
 * FluidImpactText - Hardware-accelerated CSS Liquid Mesh Gradient
 * Renders an organic multi-stop flowing gradient (Tangerine, Coral, Crimson, Magenta, Indigo)
 * clipped natively to the "IMPACT." typographic letterforms.
 *
 * Guarantees crisp vector typography across all device pixel ratios without WebGL context overhead.
 */
export const FluidImpactText: React.FC<FluidImpactTextProps> = ({ className = '' }) => {
  return (
    <span
      className={`block text-gradient-coral font-display font-black tracking-tight uppercase select-none ${className}`}
    >
      IMPACT.
    </span>
  );
};
