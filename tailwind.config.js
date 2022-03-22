module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./providers/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          "07080b": "#07080b",
          "0d0f14": "#0d0f14",
          full: "#000",
        },
        red: {
          ff3b30: "#ff3b30",
        },
      },
      display: ["group-hover"],
      fontSize: {
        xxs: "0.625rem",
      },
      minWidth: {
        xs: "280",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
