import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Use this if deploying to the root of a domain
  plugins: [react()],
});
