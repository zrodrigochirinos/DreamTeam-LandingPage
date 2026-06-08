import { describe, it, expect, vi } from 'vitest';
import { submitContactForm } from './contactApi';

describe('contactApi', () => {
  it('resolves on successful submission', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    await expect(submitContactForm()).resolves.toBeUndefined();
    Math.random.mockRestore();
  });

  it('throws on simulated network error', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.01);
    await expect(submitContactForm()).rejects.toThrow('Network error');
    Math.random.mockRestore();
  });
});
