import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { setupSectionElements } from './test-utils';

vi.mock('../components/sections/About', () => ({
  default: () => <section id="about"><h2>About</h2></section>
}));
vi.mock('../components/sections/Levels', () => ({
  default: () => <section id="levels"><h2>Levels</h2></section>
}));
vi.mock('../components/sections/Achievements', () => ({
  default: () => <section id="achievements"><h2>Achievements</h2></section>
}));
vi.mock('../components/sections/Contact', () => ({
  default: () => (
    <section id="contact">
      <h2>Contact</h2>
      <input aria-label="Nombre" />
      <button type="button">Enviar</button>
    </section>
  )
}));

describe('Accessibility', () => {
  beforeEach(() => {
    setupSectionElements();
  });

  it('includes skip to content link', () => {
    render(<App />);
    const skipLink = screen.getByRole('link', { name: /Saltar al contenido/i });
    expect(skipLink).toHaveAttribute('href', '#hero');
  });

  it('has single h1 in hero section', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('navigation has aria-label', () => {
    render(<App />);
    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeInTheDocument();
  });

  it('hamburger exposes aria-expanded state', () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: 'Abrir menú de navegación' })
    ).toHaveAttribute('aria-expanded');
  });
});
