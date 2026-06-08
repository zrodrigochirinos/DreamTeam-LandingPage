import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Levels from './Levels';
import { levels } from '../../data/levels';

describe('Levels', () => {
  it('renders section with three training levels', () => {
    render(<Levels />);
    expect(document.getElementById('levels')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Niveles de entrenamiento/i })).toBeInTheDocument();

    levels.forEach((level) => {
      expect(screen.getByText(level.name)).toBeInTheDocument();
      expect(screen.getByText(level.tagline)).toBeInTheDocument();
    });
  });

  it('lists highlights for each level', () => {
    render(<Levels />);
    levels.forEach((level) => {
      level.highlights.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });
  });
});
