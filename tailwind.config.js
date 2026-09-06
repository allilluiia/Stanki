/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "390px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
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
          "radial-gradient(ellipse 70% 55% at 78% 42%, rgba(47,125,181,0.28), transparent 58%), radial-gradient(ellipse 45% 35% at 18% 78%, rgba(176,138,74,0.1), transparent 50%)",
        "machine-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 35%, transparent 65%, rgba(47,125,181,0.12) 100%)",
      },
      boxShadow: {
        panel: "0 24px 60px rgba(0,0,0,0.45)",
        glow: "0 0 40px rgba(47,125,181,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fadeIn 0.7s ease-out both",
        float: "float 7s ease-in-out infinite",
        "scan-line": "scanLine 8s linear infinite",
        "pulse-soft": "pulseSoft 3.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-20%)" },
          "100%": { transform: "translateY(120%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};
