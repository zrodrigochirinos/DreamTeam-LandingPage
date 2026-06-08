import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidName,
  isValidMessage,
  validateContactForm,
  sanitizeString,
  isRequired,
  hasMinLength,
  hasMaxLength
} from './validation.js';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('test+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null)).toBe(false);
    });

    it('should handle whitespace correctly', () => {
      expect(isValidEmail('  test@example.com  ')).toBe(true);
      expect(isValidEmail('test @example.com')).toBe(false);
    });
  });

  describe('isValidName', () => {
    it('should validate correct names', () => {
      expect(isValidName('Juan')).toBe(true);
      expect(isValidName('María José')).toBe(true);
      expect(isValidName('José María García')).toBe(true);
      expect(isValidName('Ángel')).toBe(true);
    });

    it('should reject invalid names', () => {
      expect(isValidName('A')).toBe(false); // Too short
      expect(isValidName('Juan123')).toBe(false); // Contains numbers
      expect(isValidName('Juan@')).toBe(false); // Contains symbols
      expect(isValidName('')).toBe(false);
      expect(isValidName('a'.repeat(51))).toBe(false); // Too long
    });

    it('should handle whitespace correctly', () => {
      expect(isValidName('  Juan  ')).toBe(true);
      expect(isValidName('Juan  María')).toBe(true);
    });
  });

  describe('isValidMessage', () => {
    it('should validate messages with correct length', () => {
      expect(isValidMessage('Hola, este es un mensaje válido')).toBe(true);
      expect(isValidMessage('a'.repeat(10))).toBe(true);
      expect(isValidMessage('a'.repeat(500))).toBe(true);
    });

    it('should reject messages with invalid length', () => {
      expect(isValidMessage('Corto')).toBe(false); // Too short
      expect(isValidMessage('a'.repeat(501))).toBe(false); // Too long
      expect(isValidMessage('')).toBe(false);
      expect(isValidMessage(null)).toBe(false);
    });

    it('should handle whitespace correctly', () => {
      expect(isValidMessage('  Mensaje válido con espacios  ')).toBe(true);
    });
  });

  describe('sanitizeString', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeString('<script>alert("xss")</script>Hello')).toBe('Hello');
      expect(sanitizeString('<p>Paragraph</p>')).toBe('Paragraph');
      expect(sanitizeString('<div><span>Nested</span></div>')).toBe('Nested');
    });

    it('should trim whitespace', () => {
      expect(sanitizeString('  Hello World  ')).toBe('Hello World');
    });

    it('should handle empty or null input', () => {
      expect(sanitizeString('')).toBe('');
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
    });
  });

  describe('isRequired', () => {
    it('should validate required fields correctly', () => {
      expect(isRequired('value')).toBe(true);
      expect(isRequired('  value  ')).toBe(true);
      expect(isRequired(['item'])).toBe(true);
      expect(isRequired(0)).toBe(true);
      expect(isRequired(false)).toBe(true);
    });

    it('should reject empty values', () => {
      expect(isRequired('')).toBe(false);
      expect(isRequired('   ')).toBe(false);
      expect(isRequired(null)).toBe(false);
      expect(isRequired(undefined)).toBe(false);
      expect(isRequired([])).toBe(false);
    });
  });

  describe('hasMinLength', () => {
    it('should validate minimum length correctly', () => {
      expect(hasMinLength('hello', 3)).toBe(true);
      expect(hasMinLength('hello', 5)).toBe(true);
      expect(hasMinLength('  hello  ', 5)).toBe(true);
    });

    it('should reject strings below minimum length', () => {
      expect(hasMinLength('hi', 3)).toBe(false);
      expect(hasMinLength('', 1)).toBe(false);
      expect(hasMinLength(null, 1)).toBe(false);
    });
  });

  describe('hasMaxLength', () => {
    it('should validate maximum length correctly', () => {
      expect(hasMaxLength('hello', 10)).toBe(true);
      expect(hasMaxLength('hello', 5)).toBe(true);
      expect(hasMaxLength('', 5)).toBe(true);
      expect(hasMaxLength(null, 5)).toBe(true);
    });

    it('should reject strings above maximum length', () => {
      expect(hasMaxLength('hello world', 5)).toBe(false);
      expect(hasMaxLength('  hello world  ', 5)).toBe(false);
    });
  });

  describe('validateContactForm', () => {
    it('should validate a complete valid form', () => {
      const formData = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        message: 'Este es un mensaje válido para el formulario de contacto.'
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should return errors for invalid form data', () => {
      const formData = {
        name: 'A', // Too short
        email: 'invalid-email', // Invalid format
        message: 'Short' // Too short
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.message).toBeDefined();
    });

    it('should return errors for missing required fields', () => {
      const formData = {
        name: '',
        email: '',
        message: ''
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toContain('requerido');
      expect(result.errors.email).toContain('requerido');
      expect(result.errors.message).toContain('requerido');
    });
  });
});