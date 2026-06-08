import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <p>Content OK</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('Content OK')).toBeInTheDocument();
  });

  it('shows fallback UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Recargar página/i })).toBeInTheDocument();
  });

  it('reload button triggers location reload', async () => {
    const reload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload },
      writable: true
    });

    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /Recargar página/i }));
    expect(reload).toHaveBeenCalled();
  });
});
