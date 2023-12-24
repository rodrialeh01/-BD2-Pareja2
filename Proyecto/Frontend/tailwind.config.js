/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        azullog: '#007ac2'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

