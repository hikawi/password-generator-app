/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      fontFamily: {
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      colors: {
        style: {
          "dark-gray": "#24232C",
          gray: "#817D92",
          white: "#E6E5EA",
          "very-dark-gray": "#18171F",
          green: "#A4FFAF",
          red: "#F64A4A",
          orange: "#FB7C58",
          yellow: "#f8CD65",
        },
      },
    },
  },
  plugins: [],
};
