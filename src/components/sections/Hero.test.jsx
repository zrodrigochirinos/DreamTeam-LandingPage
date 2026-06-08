import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from './Hero';
import { setupSectionElements } from '../../test/test-utils';

describe('Hero', () => {
  beforeEach(() => {
    setupSectionElements();
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('renders headline and tagline', async () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: /Pasión en cada punto/i })).toBeInTheDocument();
    expect(screen.getByText(/Voley profesional/i)).toBeInTheDocument();
  });

  it('shows animation visible classes after mount', async () => {
    render(<Hero />);
    await waitFor(() => {
      expect(document.querySelector('.hero__title--visible')).toBeInTheDocument();
    });
  });

  it('scrolls to levels section on primary CTA click', async () => {
    const user = userEvent.setup();
    render(<Hero />);
    await user.click(screen.getByRole('button', { name: /Ver niveles/i }));
    expect(document.getElementById('levels').scrollIntoView).toHaveBeenCalled();
  });

  it('scrolls to achievements on secondary CTA click', async () => {
    const user = userEvent.setup();
    render(<Hero />);
    await user.click(screen.getByRole('button', { name: /Ver logros/i }));
    expect(document.getElementById('achievements').scrollIntoView).toHaveBeenCalled();
  });
});
