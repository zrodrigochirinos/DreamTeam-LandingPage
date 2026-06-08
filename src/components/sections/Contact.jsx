import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import Button from '../ui/Button';
import { contactFormRules } from '../../utils/validation';
import useFormValidation from '../../hooks/useFormValidation';
import { formatContactWhatsAppMessage, getWhatsAppUrl, openWhatsApp } from '../../utils/whatsapp';
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_DISPLAY } from '../../data/contact';
import './Contact.css';

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    isSubmitting,
    handleSubmit,
    resetForm,
    getFieldProps
  } = useFormValidation(
    { name: '', message: '' },
    { name: contactFormRules.name, message: contactFormRules.message }
  );

  const sendViaWhatsApp = (formValues) => {
    const text = formatContactWhatsAppMessage(formValues);
    const opened = openWhatsApp(text);

    if (opened) {
      setSubmitStatus('success');
      resetForm();
    } else {
      setSubmitStatus('blocked');
    }
  };

  const onSubmit = async () => {
    setSubmitStatus(null);
    const isValid = await handleSubmit(async (formValues) => {
      sendViaWhatsApp(formValues);
    });
    if (!isValid) setSubmitStatus('error');
  };

  const nameProps = getFieldProps('name');
  const messageProps = getFieldProps('message');

  return (
    <section id="contact" className="section section--dark contact" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeader
          eyebrow="Hablemos"
          title="Escríbenos"
          subtitle="Completa el formulario y te redirigiremos a WhatsApp"
          light
        />

        <div className="contact__layout">
          <aside className="contact__info reveal reveal--visible">
            <h3 className="contact__info-title">DreamTeam</h3>
            <p>
              ¿Quieres unirte al equipo, patrocinar o simplemente saludar? Escríbenos por
              WhatsApp y te responderemos lo antes posible.
            </p>
            <ul className="contact__info-list">
              <li>
                <span className="contact__info-label">WhatsApp</span>
                <a
                  href={getWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <span className="contact__info-label">Ubicación</span>
                <div>Pasamayito, Puente Piedra</div>
                <div>Pampita - La Loza, Los Olivos</div>
              </li>
            </ul>
          </aside>

          <form
            className="contact__form reveal reveal--visible"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            noValidate
            aria-label="Formulario de contacto por WhatsApp"
          >
            <h3 id="contact-heading" className="contact__form-title">
              Envíanos tu mensaje
            </h3>

            <div className="contact__field">
              <label htmlFor="contact-name">Nombre</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Ej: María González"
                value={nameProps.value}
                onChange={nameProps.onChange}
                onBlur={nameProps.onBlur}
                aria-required="true"
                aria-invalid={nameProps.hasError}
                aria-describedby={nameProps.hasError ? 'name-error' : undefined}
                autoComplete="name"
              />
              {nameProps.hasError && (
                <span id="name-error" className="contact__error" role="alert" aria-live="polite">
                  {nameProps.error}
                </span>
              )}
            </div>

            <div className="contact__field">
              <label htmlFor="contact-message">Mensaje</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Escribe tu mensaje aquí (mínimo 10 caracteres)..."
                value={messageProps.value}
                onChange={messageProps.onChange}
                onBlur={messageProps.onBlur}
                aria-required="true"
                aria-invalid={messageProps.hasError}
                aria-describedby={
                  messageProps.hasError ? 'message-error message-hint' : 'message-hint'
                }
                maxLength={500}
              />
              <span id="message-hint" className="contact__hint">
                {messageProps.value?.length || 0}/500 caracteres
              </span>
              {messageProps.hasError && (
                <span id="message-error" className="contact__error" role="alert" aria-live="polite">
                  {messageProps.error}
                </span>
              )}
            </div>

            <div aria-live="polite" className="contact__status">
              {submitStatus === 'success' && (
                <p className="contact__success" role="status">
                  WhatsApp abierto. Confirma el envío del mensaje en la aplicación.
                </p>
              )}
              {submitStatus === 'blocked' && (
                <p className="contact__error" role="alert">
                  No se pudo abrir WhatsApp. Permite ventanas emergentes o{' '}
                  <a href={getWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer">
                    escríbenos directamente
                  </a>
                  .
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={isSubmitting}
              className="contact__submit-whatsapp"
              ariaLabel="Enviar mensaje por WhatsApp"
            >
              {isSubmitting ? 'Abriendo WhatsApp...' : 'Enviar por WhatsApp'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
