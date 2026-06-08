import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Cargando...' }) => (
  <div className="loading-spinner" role="status" aria-live="polite">
    <img
      src="/logoDT.png"
      alt=""
      className="loading-spinner__logo"
      width="80"
      height="80"
      aria-hidden="true"
    />
    <p className="loading-spinner__message">{message}</p>
  </div>
);

export default LoadingSpinner;
