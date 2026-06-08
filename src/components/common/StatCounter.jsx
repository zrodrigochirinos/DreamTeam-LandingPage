import { useEffect, useRef } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { animateCounter, prefersReducedMotion } from '../../utils/animations';

const StatCounter = ({ value, suffix = '', label }) => {
  const [ref, isVisible] = useScrollAnimation(0.3, true);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current || !counterRef.current) return;
    hasAnimated.current = true;

    if (prefersReducedMotion()) {
      counterRef.current.textContent = `${value}${suffix}`;
      return;
    }

    animateCounter(counterRef.current, 0, value, 2000, (n) => `${n}${suffix}`);
  }, [isVisible, value, suffix]);

  return (
    <div ref={ref} className="stat-counter">
      <span ref={counterRef} className="stat-counter__value" aria-label={`${value}${suffix}`}>
        0{suffix}
      </span>
      <span className="stat-counter__label">{label}</span>
    </div>
  );
};

export default StatCounter;
