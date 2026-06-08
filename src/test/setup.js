import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
  document.title = '';
});

globalThis.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(element) {
    this.callback([{ isIntersecting: true, target: element }]);
  }

  disconnect() {}
  unobserve() {}
};

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn()
});

Object.defineProperty(window, 'scrollY', {
  writable: true,
  configurable: true,
  value: 0
});

globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);

Object.defineProperty(window, 'performance', {
  writable: true,
  value: { now: vi.fn(() => Date.now()) }
});

Element.prototype.scrollIntoView = vi.fn();
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  width: 120,
  height: 120,
  top: 0,
  left: 0,
  bottom: 120,
  right: 120
}));
