import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  onClick,
  ariaLabel,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const disabledClass = disabled ? 'btn--disabled' : '';
  
  const buttonClassName = [
    baseClass, 
    variantClass, 
    sizeClass, 
    disabledClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="btn__content">
        {children}
      </span>
    </button>
  );
};

export default Button;