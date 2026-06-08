import SectionHeader from '../common/SectionHeader';
import Card from '../ui/Card';
import { levels } from '../../data/levels';
import './Levels.css';

const Levels = () => (
  <section id="levels" className="section section--dark levels" aria-labelledby="levels-heading">
    <div className="container">
      <SectionHeader
        eyebrow="Formación"
        title="Niveles de entrenamiento"
        subtitle="Elige el programa que mejor se adapte a tu experiencia y objetivos"
        light
      />

      <ul className="levels__grid" role="list">
        {levels.map((level, index) => (
          <li key={level.id} className="levels__item">
            <Card
              className={`levels__card levels__card--${level.id}`}
              animateOnScroll
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <span className="levels__badge">{level.name}</span>
              <h3 className="levels__name">{level.tagline}</h3>
              <p className="levels__description">{level.description}</p>
              <ul className="levels__highlights">
                {level.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Levels;
