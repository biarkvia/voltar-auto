import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'SITE_');

export default defineConfig({
  site: process.env.SITE_URL || env.SITE_URL || undefined,
  base: process.env.SITE_BASE_PATH || env.SITE_BASE_PATH || '/',
  output: 'static',
  markdown: { syntaxHighlight: false },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "connect-src 'none'",
        "form-action 'none'",
        "object-src 'none'",
        "base-uri 'none'"
      ]
    }
  },
  devToolbar: { enabled: false }
});
