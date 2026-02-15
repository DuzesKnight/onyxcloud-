import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07090f',
        panel: '#0e1320',
        soft: '#121a2a',
        brand: '#7c3aed',
        cyan: '#06b6d4'
      },
      boxShadow: {
        glow: '0 0 40px rgba(124,58,237,0.25)'
      }
    }
  },
  plugins: []
};

export default config;
