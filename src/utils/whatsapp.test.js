import { describe, it, expect } from 'vitest';
import {
  formatContactWhatsAppMessage,
  getWhatsAppUrl
} from './whatsapp.js';

describe('whatsapp utils', () => {
  it('formats contact message with name, email and body', () => {
    const text = formatContactWhatsAppMessage({
      name: 'Juan',
      message: 'Hola equipo'
    });
    expect(text).toContain('Juan');
    expect(text).toContain('Hola equipo');
  });

  it('builds wa.me url with encoded text', () => {
    const url = getWhatsAppUrl('Hola DreamTeam');
    expect(url).toContain('https://wa.me/51936350975');
    expect(url).toContain('text=');
  });
});
