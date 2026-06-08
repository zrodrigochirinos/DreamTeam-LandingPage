import { Component } from 'react';
import './ErrorBoundary.css';

const isDevelopment = import.meta.env.DEV;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Here you could log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__content">
              {/* Error Icon */}
              <div className="error-boundary__icon">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>

              {/* Error Message */}
              <h1 className="error-boundary__title">
                Algo salió mal
              </h1>
              
              <p className="error-boundary__description">
                Ha ocurrido un error inesperado en la aplicación. 
                Nuestro equipo ha sido notificado y está trabajando para solucionarlo.
              </p>

              {/* Error Details (only in development) */}
              {isDevelopment && this.state.error && (
                <details className="error-boundary__details">
                  <summary className="error-boundary__details-summary">
                    Detalles técnicos (desarrollo)
                  </summary>
                  <div className="error-boundary__details-content">
                    <h3>Error:</h3>
                    <pre className="error-boundary__code">
                      {this.state.error.toString()}
                    </pre>
                    
                    {this.state.errorInfo && (
                      <>
                        <h3>Stack Trace:</h3>
                        <pre className="error-boundary__code">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="error-boundary__actions">
                <button 
                  onClick={this.handleReload}
                  className="error-boundary__button error-boundary__button--primary"
                  type="button"
                >
                  Recargar página
                </button>
                
                <button 
                  onClick={this.handleGoHome}
                  className="error-boundary__button error-boundary__button--secondary"
                  type="button"
                >
                  Ir al inicio
                </button>
              </div>

              {/* Support Information */}
              <div className="error-boundary__support">
                <p className="error-boundary__support-text">
                  Si el problema persiste, contacta con nuestro equipo de soporte.
                </p>
                <a 
                  href="mailto:soporte@dreamteam.com" 
                  className="error-boundary__support-link"
                >
                  soporte@dreamteam.com
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;