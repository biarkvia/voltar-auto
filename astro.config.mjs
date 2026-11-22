import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const { SITE_URL } = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'SITE_');

export default defineConfig({
  site: process.env.SITE_URL || SITE_URL || undefined,
  output: 'static',
  devToolbar: { enabled: false }
});
