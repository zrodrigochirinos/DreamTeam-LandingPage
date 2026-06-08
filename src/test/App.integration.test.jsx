import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { setupSectionElements } from './test-utils';

describe('App integration', () => {
  beforeEach(() => {
    setupSectionElements();
    Element.prototype.scrollIntoView = vi.fn();
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('renders main layout sections', async () => {
    render(<App />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Pasión en cada punto/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /De entrenar a competir/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Niveles de entrenamiento/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Logros que nos definen/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Escríbenos' })).toBeInTheDocument();
    });
  });

  it('navigates between sections via navigation', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => screen.getByRole('heading', { name: 'Escríbenos' }));

    await user.click(screen.getAllByRole('button', { name: 'Contacto', hidden: true })[0]);
    expect(document.getElementById('contact').scrollIntoView).toHaveBeenCalled();
  });

  it('renders footer with social links', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /Instagram/i })).toBeInTheDocument();
  });
});
