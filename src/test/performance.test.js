import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { readFileSync } from 'fs';

const DIST_ASSETS = join(process.cwd(), 'dist/assets');
const MAX_JS_KB = 500;
const MAX_CSS_KB = 100;

describe('Performance', () => {
  it('vite config enables code splitting via manualChunks', () => {
    const config = readFileSync(join(process.cwd(), 'vite.config.js'), 'utf-8');
    expect(config).toContain('manualChunks');
    expect(config).toContain('chunkSizeWarningLimit');
  });

  it('App uses lazy loading for non-critical sections', () => {
    const app = readFileSync(join(process.cwd(), 'src/App.jsx'), 'utf-8');
    expect(app).toContain('lazy(');
    expect(app).toContain('Suspense');
    expect(app).toContain('LoadingSpinner');
  });

  it('logo asset is under 200KB when present', () => {
    const logoPath = join(process.cwd(), 'public/logoDT.png');
    if (!existsSync(logoPath)) return;
    const sizeKb = statSync(logoPath).size / 1024;
    expect(sizeKb).toBeLessThan(200);
  });

  it('production bundle sizes stay within limits', () => {
    if (!existsSync(DIST_ASSETS)) return;

    const files = readdirSync(DIST_ASSETS);
    let totalJs = 0;
    let totalCss = 0;

    files.forEach((file) => {
      const size = statSync(join(DIST_ASSETS, file)).size;
      if (file.endsWith('.js') && !file.endsWith('.map')) totalJs += size;
      if (file.endsWith('.css')) totalCss += size;
    });

    expect(totalJs / 1024).toBeLessThan(MAX_JS_KB);
    expect(totalCss / 1024).toBeLessThan(MAX_CSS_KB);
  });
});
