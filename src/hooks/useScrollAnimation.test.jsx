import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import useScrollAnimation from './useScrollAnimation';

const TestComponent = () => {
  const [ref, isVisible] = useScrollAnimation(0.1, true);
  return (
    <div ref={ref} data-testid="target" data-visible={String(isVisible)}>
      {isVisible ? 'visible' : 'hidden'}
    </div>
  );
};

describe('useScrollAnimation', () => {
  it('marks element visible when observed on mount', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('target')).toHaveAttribute('data-visible', 'true');
    expect(screen.getByText('visible')).toBeInTheDocument();
  });

  it('returns ref and visibility tuple from hook', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('target')).toBeInTheDocument();
  });
});
