import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  alias: {
    '@': resolve(process.cwd(), 'app'),
    '@global': resolve(process.cwd(), '..', '..')
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  }
});
