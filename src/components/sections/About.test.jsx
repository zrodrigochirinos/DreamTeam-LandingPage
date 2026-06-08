import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders section heading and mission content', () => {
    render(<About />);
    expect(screen.getByRole('heading', { level: 2, name: /De entrenar a competir/i })).toBeInTheDocument();
    expect(screen.getByText(/Misión:/i)).toBeInTheDocument();
    expect(screen.getByText(/DreamTeam nació en 2018/i)).toBeInTheDocument();
  });

  it('renders statistics counters', () => {
    render(<About />);
    expect(screen.getByText('Años activos')).toBeInTheDocument();
    expect(screen.getByText('Torneos ganados')).toBeInTheDocument();
    expect(screen.getByText('Jugadores')).toBeInTheDocument();
  });

  it('has about section id for navigation', () => {
    render(<About />);
    expect(document.getElementById('about')).toBeInTheDocument();
  });
});
