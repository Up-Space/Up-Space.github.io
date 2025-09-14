import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1a237e', // A deep, professional blue
        'secondary-teal': '#00bcd4', // A vibrant, growth-oriented teal
        'gray-light': '#f3f4f6',
        'gray-medium': '#6b7280',
        'gray-dark': '#1f2937',
      },
    },
  },
  plugins: [],
};

export default config;
