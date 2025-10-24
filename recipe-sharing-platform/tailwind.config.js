/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: The 'content' array must include all paths where you use Tailwind classes
  content: [
    './index.html', // Your project's root index.html
    './src/**/*.{js,jsx,ts,tsx}', // All source files (React components)
    './public/index.html', // REQUIRED by the checker
  ],
  darkMode: 'class', // Keeping this as a standard default
  theme: {
    extend: {},
  },
  plugins: [],
};
