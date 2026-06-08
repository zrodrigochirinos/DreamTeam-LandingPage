import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive breakpoint detection
 * @returns {string} - Current breakpoint: 'mobile', 'tablet', 'desktop'
 */
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState('mobile');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setBreakpoint('desktop');
      } else if (width >= 768) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    };

    // Set initial breakpoint
    updateBreakpoint();

    // Add event listener with debouncing
    let timeoutId;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateBreakpoint, 100);
    };

    window.addEventListener('resize', debouncedUpdate);
    
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  return breakpoint;
};

/**
 * Hook to check if current breakpoint matches given breakpoint
 * @param {string} targetBreakpoint - 'mobile', 'tablet', 'desktop'
 * @returns {boolean} - Whether current breakpoint matches target
 */
export const useBreakpoint = (targetBreakpoint) => {
  const currentBreakpoint = useResponsive();
  return currentBreakpoint === targetBreakpoint;
};

/**
 * Hook to check if screen is at least the given breakpoint
 * @param {string} minBreakpoint - 'mobile', 'tablet', 'desktop'
 * @returns {boolean} - Whether screen is at least the given breakpoint
 */
export const useMinBreakpoint = (minBreakpoint) => {
  const currentBreakpoint = useResponsive();
  
  const breakpointOrder = ['mobile', 'tablet', 'desktop'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  const minIndex = breakpointOrder.indexOf(minBreakpoint);
  
  return currentIndex >= minIndex;
};

export default useResponsive;