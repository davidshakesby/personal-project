/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/main.js',
    './src/views/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: '#101a28',
        light: '#e5e5e5',
        blue: '#0E18F5',
        green: '#31F502'

      },
      spacing: {
        10: '10px',
        16: '16px'
      }
    }
  },
  plugins: []
}
