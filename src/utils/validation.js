/**
 * Validation utilities for forms and user input
 */

// Regular expressions for common validations
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[1-9][\d]{0,15}$/,
  name: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  url: /^https?:\/\/.+/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return patterns.email.test(email.trim());
};

/**
 * Validate name (letters and spaces only, 2-50 characters)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid
 */
export const isValidName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 50 && patterns.name.test(trimmed);
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return patterns.phone.test(cleaned);
};

/**
 * Validate message length (10-500 characters)
 * @param {string} message - Message to validate
 * @returns {boolean} - True if valid
 */
export const isValidMessage = (message) => {
  if (!message || typeof message !== 'string') return false;
  const trimmed = message.trim();
  return trimmed.length >= 10 && trimmed.length <= 500;
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return patterns.url.test(url.trim());
};

/**
 * Sanitize string input (remove HTML tags and trim)
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

/**
 * Validate required field
 * @param {any} value - Value to check
 * @returns {boolean} - True if not empty
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Validate minimum length
 * @param {string} value - Value to check
 * @param {number} minLength - Minimum length required
 * @returns {boolean} - True if meets minimum length
 */
export const hasMinLength = (value, minLength) => {
  if (!value || typeof value !== 'string') return false;
  return value.trim().length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} value - Value to check
 * @param {number} maxLength - Maximum length allowed
 * @returns {boolean} - True if within maximum length
 */
export const hasMaxLength = (value, maxLength) => {
  if (!value || typeof value !== 'string') return true;
  return value.trim().length <= maxLength;
};

/**
 * Contact form validation rules
 */
export const contactFormRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: patterns.name,
    requiredMessage: 'El nombre es requerido',
    minLengthMessage: 'El nombre debe tener al menos 2 caracteres',
    maxLengthMessage: 'El nombre no puede tener más de 50 caracteres',
    patternMessage: 'El nombre solo puede contener letras y espacios'
  },
  email: {
    required: true,
    email: true,
    requiredMessage: 'El email es requerido',
    emailMessage: 'Por favor ingresa un email válido'
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 500,
    requiredMessage: 'El mensaje es requerido',
    minLengthMessage: 'El mensaje debe tener al menos 10 caracteres',
    maxLengthMessage: 'El mensaje no puede tener más de 500 caracteres'
  }
};

/**
 * Validate entire contact form
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result with errors
 */
export const validateContactForm = (formData) => {
  const errors = {};
  
  // Validate name
  if (!isRequired(formData.name)) {
    errors.name = 'El nombre es requerido';
  } else if (!isValidName(formData.name)) {
    errors.name = 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras';
  }
  
  // Validate email
  if (!isRequired(formData.email)) {
    errors.email = 'El email es requerido';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Por favor ingresa un email válido';
  }
  
  // Validate message
  if (!isRequired(formData.message)) {
    errors.message = 'El mensaje es requerido';
  } else if (!isValidMessage(formData.message)) {
    errors.message = 'El mensaje debe tener entre 10 y 500 caracteres';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Format validation error messages
 * @param {Object} errors - Error object
 * @returns {string} - Formatted error message
 */
export const formatErrorMessage = (errors) => {
  if (!errors || Object.keys(errors).length === 0) return '';
  
  const errorMessages = Object.values(errors);
  if (errorMessages.length === 1) return errorMessages[0];
  
  return `Se encontraron ${errorMessages.length} errores: ${errorMessages.join(', ')}`;
};

/**
 * Real-time validation debouncer
 * @param {Function} validationFn - Validation function
 * @param {number} delay - Debounce delay in ms
 * @returns {Function} - Debounced validation function
 */
export const debounceValidation = (validationFn, delay = 300) => {
  let timeoutId;
  
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => validationFn(...args), delay);
  };
};

export default {
  patterns,
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidMessage,
  isValidUrl,
  sanitizeString,
  isRequired,
  hasMinLength,
  hasMaxLength,
  contactFormRules,
  validateContactForm,
  formatErrorMessage,
  debounceValidation
};