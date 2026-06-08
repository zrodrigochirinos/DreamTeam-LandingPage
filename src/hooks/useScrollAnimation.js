import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * @param {number} threshold - Intersection threshold (0-1)
 * @param {boolean} once - Whether to trigger only once
 * @returns {[React.RefObject, boolean]} - [ref, isVisible]
 */
export const useScrollAnimation = (threshold = 0.1, once = true) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, isVisible];
};

export default useScrollAnimation;