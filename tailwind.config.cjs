/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#4f46e5",
        brandPink: "#ec4899",
        brandPurple: "#8b5cf6",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        "3xl": "2rem",
        "full": "9999px",
      }
    },
  },
  plugins: [],
}
