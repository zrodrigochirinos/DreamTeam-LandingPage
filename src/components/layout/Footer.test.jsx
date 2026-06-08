import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';
import { setupSectionElements } from '../../test/test-utils';

describe('Footer', () => {
  beforeEach(() => {
    setupSectionElements();
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Contactar por WhatsApp/i })).toBeInTheDocument();
    expect(screen.getByText(/\+51 936 350 975/)).toBeInTheDocument();
  });

  it('renders social media links with external targets', () => {
    render(<Footer />);
    const instagram = screen.getByRole('link', { name: /DreamTeam en Instagram/i });
    expect(instagram).toHaveAttribute('href', expect.stringContaining('instagram'));
    expect(instagram).toHaveAttribute('target', '_blank');
    expect(instagram).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('scrolls to section on quick link click', async () => {
    const user = userEvent.setup();
    render(<Footer />);

    await user.click(screen.getByRole('button', { name: 'Logros' }));
    expect(document.getElementById('achievements').scrollIntoView).toHaveBeenCalled();
  });

  it('displays copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}.*DreamTeam`))).toBeInTheDocument();
  });
});
