import SectionHeader from '../common/SectionHeader';
import Card from '../ui/Card';
import StatCounter from '../common/StatCounter';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section section--light about" aria-labelledby="about-heading">
      <div className="about__stats-band">
        <div className="container about__stats-band-inner">
          <Card className="about__stat-card about__stat-card--band" animateOnScroll>
            <StatCounter value={6} suffix="+" label="Años activos" />
          </Card>
          <Card className="about__stat-card about__stat-card--band" animateOnScroll>
            <StatCounter value={12} suffix="" label="Torneos ganados" />
          </Card>
          <Card className="about__stat-card about__stat-card--band" animateOnScroll>
            <StatCounter value={18} suffix="" label="Jugadores" />
          </Card>
        </div>
      </div>

      <div className="container">
        <SectionHeader
          eyebrow="Nuestra historia"
          title="De entrenar a competir con orgullo"
          subtitle="Pasión, trabajo en equipo y competición de alto nivel"
        />

        <div className="about__grid">
          <div className="about__content reveal reveal--visible">
            <p>
              DreamTeam nació en 2018 con la visión de crear un club de Voley que combinara
              formación deportiva de calidad con valores de respeto, disciplina y superación
              constante. Desde nuestros primeros entrenamientos en un pabellón local, hemos
              crecido hasta convertirnos en un referente regional, con jugadores que representan
              lo mejor del talento nacional en cada posición del campo.
            </p>
            <p>
              Nuestra filosofía se basa en el juego en equipo: cada punto es resultado del
              esfuerzo colectivo, la comunicación en pista y la confianza mutua. Entrenamos con
              metodologías modernas, análisis de video y preparación física específica para el
              Voley de competición.
            </p>
            <p>
              A lo largo de seis temporadas hemos participado en ligas nacionales, torneos
              internacionales amistosos y programas de formación juvenil. El respeto al rival,
              la humildad en la victoria y la fortaleza en la derrota definen nuestra identidad.
            </p>
            <p className="about__mission">
              <strong>Misión:</strong> Promover el Voley de excelencia, formar deportistas
              íntegros y representar con orgullo a nuestra comunidad en cada competición.
            </p>
          </div>

          <div className="about__visual" aria-hidden="true">
            <div className="about__visual-card">
              <img
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80&auto=format&fit=crop"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
