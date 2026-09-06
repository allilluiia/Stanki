/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07090c",
          900: "#0c1016",
          800: "#141b24",
          700: "#1c2633",
          600: "#2a3748",
        },
        steel: {
          50: "#f2f6fa",
          100: "#dde7f0",
          200: "#b8c9db",
          300: "#8fa8c2",
          400: "#6b87a6",
          500: "#4f6d8c",
          600: "#3d5670",
          700: "#2f4358",
        },
        accent: {
          DEFAULT: "#2f7db5",
          soft: "#3d93cf",
          muted: "#1e4f72",
        },
        brass: {
          DEFAULT: "#b08a4a",
          soft: "#c9a56a",
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "system-ui", "sans-serif"],
        sans: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "metal-grid":
          "linear-gradient(rgba(47,125,181,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(47,125,181,0.06) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(47,125,181,0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(176,138,74,0.08), transparent 50%)",
      },
      boxShadow: {
        panel: "0 24px 60px rgba(0,0,0,0.45)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-in": "fadeIn 0.6s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
