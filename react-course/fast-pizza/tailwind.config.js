/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    //Override properties
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    //Extend tailwwind styles
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
