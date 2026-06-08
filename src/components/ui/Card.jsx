import useScrollAnimation from '../../hooks/useScrollAnimation';
import './Card.css';

const Card = ({
  children,
  className = '',
  animateOnScroll = true,
  as: Component = 'div',
  ...props
}) => {
  const [ref, isVisible] = useScrollAnimation(0.1, true);

  const cardClassName = [
    'card',
    animateOnScroll && isVisible ? 'card--visible' : '',
    animateOnScroll && !isVisible ? 'card--hidden' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={animateOnScroll ? ref : undefined}
      className={cardClassName}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
