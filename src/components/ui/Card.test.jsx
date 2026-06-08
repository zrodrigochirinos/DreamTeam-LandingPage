import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies visible class when intersecting', () => {
    const { container } = render(<Card animateOnScroll>Animated</Card>);
    expect(container.firstChild).toHaveClass('card--visible');
  });

  it('skips scroll animation when animateOnScroll is false', () => {
    const { container } = render(<Card animateOnScroll={false}>Static</Card>);
    expect(container.firstChild).not.toHaveClass('card--hidden');
  });

  it('supports custom className', () => {
    const { container } = render(<Card className="custom-card">X</Card>);
    expect(container.firstChild).toHaveClass('custom-card');
  });
});
