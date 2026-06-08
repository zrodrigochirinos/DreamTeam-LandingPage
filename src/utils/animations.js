/**
 * Animation utilities for the DreamTeam website
 */

// Animation timing functions
export const easingFunctions = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// Animation durations
export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800
};

/**
 * Smooth scroll to element
 * @param {string|Element} target - CSS selector or DOM element
 * @param {number} duration - Animation duration in ms
 * @param {number} offset - Offset from target position
 */
export const smoothScrollTo = (target, duration = 800, offset = 0) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) {
    console.warn('Smooth scroll target not found:', target);
    return;
  }

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function (ease-in-out)
    const ease = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * Animate number counter
 * @param {Element} element - Target element
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Animation duration in ms
 * @param {Function} formatter - Number formatting function
 */
export const animateCounter = (element, start, end, duration = 2000, formatter = (n) => n) => {
  if (!element) return;

  const startTime = performance.now();
  const difference = end - start;

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = start + difference * easeOut;
    
    element.textContent = formatter(Math.floor(current));
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = formatter(end);
    }
  };

  requestAnimationFrame(updateCounter);
};

/**
 * Stagger animation for multiple elements
 * @param {NodeList|Array} elements - Elements to animate
 * @param {string} animationClass - CSS class to add
 * @param {number} delay - Delay between each element (ms)
 */
export const staggerAnimation = (elements, animationClass, delay = 100) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(animationClass);
    }, index * delay);
  });
};

/**
 * Parallax scroll effect
 * @param {Element} element - Element to apply parallax to
 * @param {number} speed - Parallax speed (0-1, where 0.5 is half speed)
 */
export const parallaxScroll = (element, speed = 0.5) => {
  if (!element) return;

  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * speed;
    element.style.transform = `translateY(${parallax}px)`;
  };

  window.addEventListener('scroll', updateParallax, { passive: true });
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', updateParallax);
};

/**
 * Fade in animation with intersection observer
 * @param {Element} element - Element to animate
 * @param {Object} options - Intersection observer options
 */
export const fadeInOnScroll = (element, options = {}) => {
  if (!element) return;

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  observer.observe(element);
  
  return observer;
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} - True if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Conditional animation based on user preferences
 * @param {Function} animationFn - Animation function to run
 * @param {Function} fallbackFn - Fallback function for reduced motion
 */
export const respectMotionPreference = (animationFn, fallbackFn = () => {}) => {
  if (prefersReducedMotion()) {
    fallbackFn();
  } else {
    animationFn();
  }
};

/**
 * Create a typing animation effect
 * @param {Element} element - Target element
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed (ms per character)
 */
export const typeWriter = (element, text, speed = 100) => {
  if (!element) return;

  let i = 0;
  element.textContent = '';
  
  const typing = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  };
  
  typing();
};

// CSS animation classes that should be defined in CSS
export const animationClasses = {
  fadeInUp: 'animate-fade-in-up',
  slideInLeft: 'animate-slide-in-left',
  scaleIn: 'animate-scale-in',
  bounceIn: 'animate-bounce-in',
  rotateIn: 'animate-rotate-in'
};

export default {
  easingFunctions,
  durations,
  smoothScrollTo,
  animateCounter,
  staggerAnimation,
  parallaxScroll,
  fadeInOnScroll,
  prefersReducedMotion,
  respectMotionPreference,
  typeWriter,
  animationClasses
};