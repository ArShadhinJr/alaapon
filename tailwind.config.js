/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#AC08D0',
        'secondary': '#F22A1C',
        'thirty': '#D71D62'
      },
      backgroundImage: {
        'signup': "url(./src/assets/signupbanner.jpg)",
      }
    },
  },
  plugins: [],
}