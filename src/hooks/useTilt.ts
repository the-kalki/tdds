import { useState, useRef, type MouseEvent, type CSSProperties } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useTilt(maxTilt = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    const rotateX = -yPct * maxTilt;
    const rotateY = xPct * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 100ms ease-out',
    });
  };

  const handleMouseLeave = () => {
    if (prefersReduced) return;
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  return { ref, style, handleMouseMove, handleMouseLeave };
}
