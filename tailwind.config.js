/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d7e7ff",
          200: "#b6d3ff",
          300: "#8eb7ff",
          400: "#5f90ff",
          500: "#3f6bff",
          600: "#2d4fee",
          700: "#263ccc",
          800: "#2436a4",
          900: "#213080",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
}

