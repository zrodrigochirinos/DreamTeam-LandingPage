import { render } from '@testing-library/react';
import { vi } from 'vitest';

export const renderWithProviders = (ui, options = {}) => render(ui, { ...options });

export const setupSectionElements = () => {
  ['hero', 'about', 'levels', 'achievements', 'contact'].forEach((id) => {
    if (!document.getElementById(id)) {
      const el = document.createElement('section');
      el.id = id;
      document.body.appendChild(el);
    }
  });
};

export const mockScrollIntoView = () => {
  Element.prototype.scrollIntoView = vi.fn();
};
