import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from './Navigation';
import { setupSectionElements } from '../../test/test-utils';

describe('Navigation', () => {
  const onSectionChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    setupSectionElements();
  });

  it('renders navigation links', () => {
    render(<Navigation activeSection="hero" onSectionChange={onSectionChange} />);
    expect(screen.getAllByRole('button', { name: 'Inicio', hidden: true }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: 'Contacto', hidden: true }).length).toBeGreaterThan(0);
  });

  it('toggles mobile menu on hamburger click', async () => {
    const user = userEvent.setup();
    render(<Navigation activeSection="hero" onSectionChange={onSectionChange} />);

    const hamburger = screen.getByRole('button', { name: 'Abrir menú de navegación' });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).toHaveClass('navigation__menu--open');
  });

  it('scrolls to section and calls onSectionChange on nav click', async () => {
    const user = userEvent.setup();
    render(<Navigation activeSection="hero" onSectionChange={onSectionChange} />);

    const aboutButtons = screen.getAllByRole('button', { name: 'Nosotros', hidden: true });
    await user.click(aboutButtons[0]);

    const aboutSection = document.getElementById('about');
    expect(aboutSection.scrollIntoView).toHaveBeenCalled();
    expect(onSectionChange).toHaveBeenCalledWith('about');
  });

  it('highlights active section', () => {
    render(<Navigation activeSection="levels" onSectionChange={onSectionChange} />);
    const levelsButtons = screen.getAllByRole('button', { name: 'Niveles', hidden: true });
    expect(levelsButtons[0]).toHaveClass('navigation__link--active');
    expect(levelsButtons[0]).toHaveAttribute('aria-current', 'page');
  });

  it('applies scrolled class when window scrolls', () => {
    render(<Navigation activeSection="hero" onSectionChange={onSectionChange} />);
    const nav = screen.getByRole('navigation');

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    fireEvent.scroll(window);

    expect(nav).toHaveClass('navigation--scrolled');
  });
});
