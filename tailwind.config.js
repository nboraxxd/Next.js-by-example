/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{jsx,tsx}',
    './pages/**/*.{jsx,tsx}',
    './components/**/*.{jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'san-serif'],
      },
    },
  },
  plugins: [],
}
