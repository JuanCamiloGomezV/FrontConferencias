/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ring: "#1976d2",
        primary: {
          DEFAULT: "#1976d2",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
    },
  },
  plugins: [],
};
