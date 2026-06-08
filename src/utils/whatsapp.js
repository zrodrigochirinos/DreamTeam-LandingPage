import { WHATSAPP_PHONE } from '../data/contact.js';

export const formatContactWhatsAppMessage = ({ name, message }) =>
  [
    'Hola DreamTeam,',
    '',
    `*Nombre:* ${name.trim()}`,
    '',
    '*Mensaje:*',
    message.trim()
  ].join('\n');

export const getWhatsAppUrl = (text, phone = WHATSAPP_PHONE) => {
  const params = new URLSearchParams({ text });
  return `https://wa.me/${phone}?${params.toString()}`;
};

export const openWhatsApp = (text, phone = WHATSAPP_PHONE) => {
  const url = getWhatsAppUrl(text, phone);
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  return Boolean(opened);
};
