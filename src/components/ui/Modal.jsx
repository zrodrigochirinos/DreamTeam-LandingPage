import { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="modal__content">
        <button
          ref={closeButtonRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          ×
        </button>
        {title && (
          <h3 id="modal-title" className="modal__title">
            {title}
          </h3>
        )}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
