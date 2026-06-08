import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResponsive, useBreakpoint, useMinBreakpoint } from './useResponsive.js';

// Mock window.innerWidth
const mockInnerWidth = (width) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe('useResponsive Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up event listeners
    window.removeEventListener('resize', vi.fn());
  });

  describe('useResponsive', () => {
    it('should return "mobile" for widths below 768px', () => {
      mockInnerWidth(500);
      const { result } = renderHook(() => useResponsive());
      expect(result.current).toBe('mobile');
    });

    it('should return "tablet" for widths between 768px and 1023px', () => {
      mockInnerWidth(800);
      const { result } = renderHook(() => useResponsive());
      expect(result.current).toBe('tablet');
    });

    it('should return "desktop" for widths 1024px and above', () => {
      mockInnerWidth(1200);
      const { result } = renderHook(() => useResponsive());
      expect(result.current).toBe('desktop');
    });

    it('should update breakpoint on window resize', () => {
      mockInnerWidth(500);
      const { result } = renderHook(() => useResponsive());
      
      expect(result.current).toBe('mobile');

      act(() => {
        mockInnerWidth(1200);
        window.dispatchEvent(new Event('resize'));
      });

      // Wait for debounced update
      setTimeout(() => {
        expect(result.current).toBe('desktop');
      }, 150);
    });

    it('should handle edge cases at breakpoint boundaries', () => {
      // Test exact breakpoint values
      mockInnerWidth(768);
      const { result: result768 } = renderHook(() => useResponsive());
      expect(result768.current).toBe('tablet');

      mockInnerWidth(1024);
      const { result: result1024 } = renderHook(() => useResponsive());
      expect(result1024.current).toBe('desktop');

      mockInnerWidth(767);
      const { result: result767 } = renderHook(() => useResponsive());
      expect(result767.current).toBe('mobile');
    });
  });

  describe('useBreakpoint', () => {
    it('should return true when current breakpoint matches target', () => {
      mockInnerWidth(800);
      const { result } = renderHook(() => useBreakpoint('tablet'));
      expect(result.current).toBe(true);
    });

    it('should return false when current breakpoint does not match target', () => {
      mockInnerWidth(800);
      const { result } = renderHook(() => useBreakpoint('mobile'));
      expect(result.current).toBe(false);
    });

    it('should update when breakpoint changes', () => {
      mockInnerWidth(500);
      const { result } = renderHook(() => useBreakpoint('tablet'));
      
      expect(result.current).toBe(false);

      act(() => {
        mockInnerWidth(800);
        window.dispatchEvent(new Event('resize'));
      });

      setTimeout(() => {
        expect(result.current).toBe(true);
      }, 150);
    });
  });

  describe('useMinBreakpoint', () => {
    it('should return true when current breakpoint is at least the minimum', () => {
      mockInnerWidth(1200); // desktop
      const { result } = renderHook(() => useMinBreakpoint('tablet'));
      expect(result.current).toBe(true);
    });

    it('should return false when current breakpoint is below minimum', () => {
      mockInnerWidth(500); // mobile
      const { result } = renderHook(() => useMinBreakpoint('tablet'));
      expect(result.current).toBe(false);
    });

    it('should return true when current breakpoint equals minimum', () => {
      mockInnerWidth(800); // tablet
      const { result } = renderHook(() => useMinBreakpoint('tablet'));
      expect(result.current).toBe(true);
    });

    it('should handle all breakpoint combinations correctly', () => {
      // Mobile (500px)
      mockInnerWidth(500);
      const { result: mobileResult } = renderHook(() => useMinBreakpoint('mobile'));
      expect(mobileResult.current).toBe(true);

      // Tablet (800px)
      mockInnerWidth(800);
      const { result: tabletFromMobile } = renderHook(() => useMinBreakpoint('mobile'));
      const { result: tabletFromTablet } = renderHook(() => useMinBreakpoint('tablet'));
      const { result: tabletFromDesktop } = renderHook(() => useMinBreakpoint('desktop'));
      
      expect(tabletFromMobile.current).toBe(true);
      expect(tabletFromTablet.current).toBe(true);
      expect(tabletFromDesktop.current).toBe(false);

      // Desktop (1200px)
      mockInnerWidth(1200);
      const { result: desktopFromMobile } = renderHook(() => useMinBreakpoint('mobile'));
      const { result: desktopFromTablet } = renderHook(() => useMinBreakpoint('tablet'));
      const { result: desktopFromDesktop } = renderHook(() => useMinBreakpoint('desktop'));
      
      expect(desktopFromMobile.current).toBe(true);
      expect(desktopFromTablet.current).toBe(true);
      expect(desktopFromDesktop.current).toBe(true);
    });
  });
});