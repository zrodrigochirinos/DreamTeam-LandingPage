import { getWhatsAppUrl } from '../../utils/whatsapp';
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_DISPLAY } from '../../data/contact';
import { SocialIcon } from '../icons/SocialIcons';
import './Footer.css';

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@dream_teamvoley_ofical?_r=1&_t=ZS-96Fmwp29W6e', icon: 'tiktok' },
  { name: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' }
];

const quickLinks = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Nosotros' },
  { id: 'levels', label: 'Niveles' },
  { id: 'achievements', label: 'Logros' },
  { id: 'contact', label: 'Contacto' }
];

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__container">
        <div className="footer__grid">
          <div className="footer__column">
            <h3 className="footer__heading">DreamTeam</h3>
            <p className="footer__text">
              Equipo de voley profesional comprometido con la excelencia deportiva.
            </p>
            <ul className="footer__contact">
              <li>
                <a
                  href={getWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp"
                >
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>Lima, Perú</li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Enlaces</h3>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    className="footer__link-btn"
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Síguenos</h3>
            <ul className="footer__social" aria-label="Redes sociales">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    className="footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`DreamTeam en ${social.name}`}
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} DreamTeam. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
