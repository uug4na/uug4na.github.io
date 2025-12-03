/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        'comic-green': '#50C878',
        'comic-yellow': '#F4D03F',
        'comic-red': '#E74C3C',
        'comic-blue': '#3498DB',
        'comic-purple': '#9B59B6',
        'paper-white': '#F9F7F2',
        'ink-black': '#121212',
        'dark-paper': '#1e1e1e',
      },
      fontFamily: {
        'display': ['Bangers', 'cursive'],
        'comic': ['Comic Neue', 'cursive'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'comic': '4px 4px 0px 0px rgba(0,0,0,1)',
        'comic-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'comic-dark': '4px 4px 0px 0px rgba(255,255,255,0.2)',
      },
    },
  },
  plugins: [],
}