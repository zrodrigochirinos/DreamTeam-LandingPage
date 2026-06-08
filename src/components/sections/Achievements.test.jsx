import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Achievements from './Achievements';

describe('Achievements', () => {
  it('renders timeline with at least 3 accomplishments', () => {
    render(<Achievements />);
    expect(screen.getByRole('heading', { level: 2, name: /Logros que nos definen/i })).toBeInTheDocument();
    expect(screen.getByText('Campeones sub 16 Los Olivos')).toBeInTheDocument();
    expect(screen.getByText('Copa Laderas Varones')).toBeInTheDocument();
    expect(screen.getByText('Segundo puesto del torneo Sub 14')).toBeInTheDocument();
  });

  it('displays achievement dates', () => {
    render(<Achievements />);
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('renders trophy icons and stat counters', () => {
    const { container } = render(<Achievements />);
    expect(container.querySelectorAll('.achievements__card-icon').length).toBe(3);
    expect(screen.getByText('Títulos principales')).toBeInTheDocument();
    expect(screen.getByText('Partidos ganados')).toBeInTheDocument();
  });
});
