/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,cjs}"],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ["Playwrite NL Guides", 'cursive', ],
        nigeria: ["Playwrite NG Modern Guides", 'cursive']
      },
    },
  },
  plugins: [],
}