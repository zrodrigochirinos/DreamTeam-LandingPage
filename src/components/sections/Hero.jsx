import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import './Hero.css';

const heroCards = [
  {
    id: 'levels',
    label: 'Formación',
    title: 'Nuestros niveles',
    image:
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80&auto=format&fit=crop'
  },
  {
    id: 'achievements',
    label: 'Historia',
    title: 'Nuestros logros',
    image:
      'https://images.unsplash.com/photo-1551958214-dced609bbf02?w=600&q=80&auto=format&fit=crop'
  },
  {
    id: 'contact',
    label: 'Contacto',
    title: 'Escríbenos',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&auto=format&fit=crop'
  }
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__pattern" aria-hidden="true" />

      <div className="hero__container">
        <div className="hero__content">
          
          <p className={`hero__eyebrow ${isVisible ? 'hero__eyebrow--visible' : ''}`}>
            Voley profesional
          </p>

          <h1 className={`hero__title ${isVisible ? 'hero__title--visible' : ''}`}>
            Pasión en cada punto
          </h1>

          <p className={`hero__description ${isVisible ? 'hero__description--visible' : ''}`}>
            Dedicados a la excelencia deportiva y la competición de alto nivel.
            Entrena en el nivel que te corresponde y vive la pasión por el Voley.
          </p>

          <div className={`hero__actions ${isVisible ? 'hero__actions--visible' : ''}`}>
            <Button
              variant="primary"
              size="large"
              onClick={() => scrollTo('levels')}
              ariaLabel="Ver niveles de entrenamiento DreamTeam"
            >
              Ver Niveles
            </Button>
            <Button
              variant="outline-light"
              size="large"
              onClick={() => scrollTo('achievements')}
              ariaLabel="Ver logros del equipo"
            >
              Ver Logros
            </Button>
          </div>
        </div>

        <ul className={`hero__cards ${isVisible ? 'hero__cards--visible' : ''}`}>
          {heroCards.map((card, index) => (
            <li key={card.id}>
              <button
                type="button"
                className="hero__card hero__card--media"
                onClick={() => scrollTo(card.id)}
                style={{
                  '--hero-card-image': `url("${card.image}")`,
                  transitionDelay: `${1.2 + index * 0.1}s`
                }}
              >
                <span className="hero__card-label">{card.label}</span>
                <span className="hero__card-title">{card.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-arrow" />
        <span className="hero__scroll-text">Desliza</span>
      </div>
    </section>
  );
};

export default Hero;
