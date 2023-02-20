/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        socialBg:'#F5F7FB',
        socialBlue:'#218DFA',
      }
    },
  },
  plugins: [],
}
