/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
          customBlue: '#54B8D8',
          customIndigo: '#5754D8',
          customDullBlue: '#4F6EAE',
          customTextGrey: '#AFAFAF',
        },
      fontFamily: {
        'outfit': ['Outfit', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

