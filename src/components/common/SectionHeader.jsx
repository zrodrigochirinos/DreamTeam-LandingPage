import useScrollAnimation from '../../hooks/useScrollAnimation';
import './SectionHeader.css';

const SectionHeader = ({ eyebrow, title, subtitle, align = 'center', light = false }) => {
  const [ref, isVisible] = useScrollAnimation(0.15, true);

  return (
    <header
      ref={ref}
      className={`section-header section-header--${align} ${light ? 'section-header--light' : ''} ${isVisible ? 'reveal--visible reveal' : 'reveal'}`}
    >
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  );
};

export default SectionHeader;
