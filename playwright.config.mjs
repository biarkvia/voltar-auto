import { defineConfig } from '@playwright/test';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), 'SITE_');
const basePath = (process.env.SITE_BASE_PATH || env.SITE_BASE_PATH || '').replace(/\/$/, '');
const baseURL = 'http://127.0.0.1:4322' + basePath + '/';

export default defineConfig({
  testDir: './tests',
  use: { baseURL, reducedMotion: 'reduce' },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4322',
    url: baseURL
  }
});
