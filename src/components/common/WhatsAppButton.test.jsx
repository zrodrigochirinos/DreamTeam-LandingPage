import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppButton from './WhatsAppButton';

describe('WhatsAppButton', () => {
  it('renders link to WhatsApp with accessible label', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /WhatsApp/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(link).toHaveAttribute('target', '_blank');
  });
});
