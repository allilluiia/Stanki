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
        canvas: {
          DEFAULT: "#F2F3F1",
          soft: "#DEE3E4",
          deep: "#D4DBDD",
        },
        surface: {
          DEFAULT: "#FAFAF8",
          muted: "#FAFAF8",
        },
        ink: {
          DEFAULT: "#172027",
          soft: "#172027",
          muted: "#657079",
          faint: "#8A949C",
        },
        line: {
          DEFAULT: "#CCD3D6",
          strong: "#B5BFC3",
          soft: "#E0E5E7",
        },
        stage: {
          DEFAULT: "#BECBD1",
          soft: "#CDD7DC",
        },
        accent: {
          DEFAULT: "#718B98",
          soft: "#8AA1AC",
          hover: "#607D8B",
          muted: "#D5DEE2",
          wash: "#E8EDF0",
        },
        brand: {
          DEFAULT: "#172229",
          soft: "#243038",
          wash: "#E8EDF0",
        },
        logo: {
          DEFAULT: "#C83A2D",
        },
        mark: {
          DEFAULT: "#172229",
          soft: "#243038",
          wash: "#E8EDF0",
        },
        steel: {
          50: "#172027",
          100: "#172027",
          200: "#243038",
          300: "#657079",
          400: "#8A949C",
          500: "#B5BFC3",
          600: "#CCD3D6",
          700: "#E0E5E7",
        },
        signal: {
          DEFAULT: "#718B98",
          soft: "#607D8B",
        },
        brass: {
          DEFAULT: "#718B98",
          soft: "#607D8B",
        },
      },
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        /* Unified content rail — 1280 within 1200–1320 band */
        page: "1280px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      boxShadow: {
        frame: "8px 8px 0 0 rgba(23, 32, 39, 0.08)",
        lift: "0 12px 32px rgba(23, 32, 39, 0.08)",
      },
      transitionDuration: {
        150: "150ms",
        180: "180ms",
        220: "220ms",
        280: "280ms",
        320: "320ms",
        400: "400ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        soft: "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fadeIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translate3d(0, 12px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
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
