import SectionHeader from '../common/SectionHeader';
import Card from '../ui/Card';
import StatCounter from '../common/StatCounter';
import './Achievements.css';

const achievements = [
  {
    id: 1,
    date: '2025',
    title: 'Campeones sub 16 Los Olivos',
    description: 'Primer título en categoría distrital tras una temporada invicta en casa.'
  },
  {
    id: 2,
    date: '2025',
    title: 'Copa Laderas Varones',
    description: 'Haciendo historia: clasificación a la fase final por primera vez.'
  },
  {
    id: 3,
    date: '2025',
    title: 'Segundo puesto del torneo Sub 14',
    description: 'Gran campaña entre 16 equipos, dejando todo en cada partido.'
  }
];

const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const Achievements = () => (
  <section id="achievements" className="section section--dark achievements" aria-labelledby="achievements-heading">
    <div className="container">
      <SectionHeader
        eyebrow="Trayectoria"
        title="Logros que nos definen"
        subtitle="Historia de éxitos y momentos destacados"
        light
      />

      <div className="achievements__stats">
        <div className="achievements__stat">
          <StatCounter value={3} suffix="" label="Títulos principales" />
        </div>
        <div className="achievements__stat">
          <StatCounter value={25} suffix="+" label="Partidos ganados" />
        </div>
        <div className="achievements__stat">
          <StatCounter value={8} suffix="" label="Temporadas en liga" />
        </div>
      </div>

      <ol className="achievements__timeline" aria-label="Cronología de logros">
        {achievements.map((item) => (
          <li key={item.id} className="achievements__timeline-item reveal reveal--visible">
            <Card className="achievements__card" animateOnScroll={false}>
              <div className="achievements__card-icon">
                <TrophyIcon />
              </div>
              <time className="achievements__date" dateTime={item.date}>
                {item.date}
              </time>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Achievements;
