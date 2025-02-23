/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'site-dark': '#151823',  // Dark background
        'site-blue': '#4F7FFF',  // Bright blue
        'site-purple': '#8B5CF6', // Purple accent
        'site-gray': '#1E2231',  // Darker gray for cards
      },
    },
  },
  plugins: [],
}