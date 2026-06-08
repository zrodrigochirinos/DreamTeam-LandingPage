import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

vi.mock('../../utils/whatsapp', () => ({
  formatContactWhatsAppMessage: vi.fn(() => 'mensaje de prueba'),
  openWhatsApp: vi.fn(() => true),
  getWhatsAppUrl: vi.fn(() => 'https://wa.me/51936350975')
}));

import { openWhatsApp } from '../../utils/whatsapp';

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    openWhatsApp.mockReturnValue(true);
  });

  it('renders form fields with labels', () => {
    render(<Contact />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Mensaje')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/María González/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid fields', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje por WhatsApp/i }));

    await waitFor(() => {
      expect(screen.getByText(/nombre es requerido/i)).toBeInTheDocument();
    });
  });

  it('opens WhatsApp on valid submission', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText('Nombre'), 'Juan Pérez');
    await user.type(
      screen.getByLabelText('Mensaje'),
      'Mensaje de prueba con más de diez caracteres.'
    );
    await user.click(screen.getByRole('button', { name: /Enviar mensaje por WhatsApp/i }));

    await waitFor(() => {
      expect(openWhatsApp).toHaveBeenCalled();
      expect(screen.getByText(/WhatsApp abierto/i)).toBeInTheDocument();
    });
  });

  it('has aria-live regions for validation', () => {
    render(<Contact />);
    expect(document.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });

  it('shows error when WhatsApp popup is blocked', async () => {
    openWhatsApp.mockReturnValueOnce(false);
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText('Nombre'), 'Ana Test');
    await user.type(
      screen.getByLabelText('Mensaje'),
      'Quiero información sobre el equipo de voleibol.'
    );
    await user.click(screen.getByRole('button', { name: /Enviar mensaje por WhatsApp/i }));

    await waitFor(() => {
      expect(screen.getByText(/No se pudo abrir WhatsApp/i)).toBeInTheDocument();
    });
  });
});
