import { useState, useEffect, Suspense, lazy } from 'react';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import WhatsAppButton from './components/common/WhatsAppButton';
import { updatePageSEO, generateSportsTeamSchema } from './utils/seo';
import './App.css';

const About = lazy(() => import('./components/sections/About'));
const Levels = lazy(() => import('./components/sections/Levels'));
const Achievements = lazy(() => import('./components/sections/Achievements'));
const Contact = lazy(() => import('./components/sections/Contact'));

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    updatePageSEO({
      title: 'DreamTeam',
      description:
        'DreamTeam: equipo de Voley. Niveles formativos, logros y contacto. Voley, deportes.',
      openGraph: {
        title: 'DreamTeam',
        description:
          'Equipo de Voley dedicado a la excelencia deportiva y la competición de alto nivel.',
        image: `${window.location.origin}/logoDT.png`,
        url: window.location.href,
        type: 'website'
      },
      canonical: window.location.href,
      structuredData: generateSportsTeamSchema({
        logo: `${window.location.origin}/logoDT.png`,
        image: `${window.location.origin}/logoDT.png`
      })
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'levels', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <div className="app">
        <a href="#hero" className="skip-link">
          Saltar al contenido principal
        </a>

        <Navigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <WhatsAppButton />

        <main className="main-content" id="main-content">
          <Hero />

          <Suspense fallback={<LoadingSpinner />}>
            <About />
            <Levels />
            <Achievements />
            <Contact />
          </Suspense>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
