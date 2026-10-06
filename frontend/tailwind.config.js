/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f8ff',
          100: '#eaf0ff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e3a8a',
        },
        ink: '#0f172a'
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.06)',
      }
    },
  },
  plugins: [],
};
