import { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = ({ activeSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Nosotros' },
    { id: 'levels', label: 'Niveles' },
    { id: 'achievements', label: 'Logros' },
    { id: 'contact', label: 'Contacto' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`navigation ${isScrolled ? 'navigation--scrolled' : ''}`}
      role="navigation" 
      aria-label="Navegación principal"
    >
      <div className="navigation__container">
        <button
          type="button"
          className="navigation__logo"
          onClick={() => handleNavClick('hero')}
          aria-label="DreamTeam - Ir al inicio"
        >
          <img
            src="/logoDT.png"
            alt=""
            className="navigation__logo-image"
            width="40"
            height="40"
          />
          <span className="navigation__logo-text">DreamTeam</span>
        </button>

        {/* Desktop Navigation */}
        <ul className="navigation__menu navigation__menu--desktop">
          {navigationItems.map((item) => (
            <li key={item.id} className="navigation__item">
              <button
                className={`navigation__link ${activeSection === item.id ? 'navigation__link--active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="navigation__hamburger"
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="navigation__hamburger-line"></span>
          <span className="navigation__hamburger-line"></span>
          <span className="navigation__hamburger-line"></span>
        </button>

        {/* Mobile Navigation */}
        <ul 
          id="mobile-menu"
          className={`navigation__menu navigation__menu--mobile ${isMenuOpen ? 'navigation__menu--open' : ''}`}
        >
          {navigationItems.map((item) => (
            <li key={item.id} className="navigation__item">
              <button
                className={`navigation__link ${activeSection === item.id ? 'navigation__link--active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="navigation__overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navigation;