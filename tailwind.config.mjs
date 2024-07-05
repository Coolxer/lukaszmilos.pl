/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

export default {
  content: [
    "./dist/index.html",
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      // desktop first
      // 'xl': {'max': '1279px'},
      // 'lg': {'max': '991px'},
      // 'md': {'max': '767px'},
      // 'sm': {'max': '479px'}

      // mobile-first
      sm: "480px",
      // => @media (min-width: 480px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: { poppins: ["Poppins", "sans-serif"] },
    // opacity: {
    //   0: 0,
    //   15: 0.15,
    //   25: 0.25,
    //   50: 0.5,
    //   75: 0.75,
    //   100: 1,
    // },
    // spacing: {
    // 0
    // px
    // 0.5
    // 1
    // 2
    // 4
    // 6
    // 8
    // 10
    // 12
    // 16
    // 24
    // 32
    // 40
    // 48
    // 60
    // 72
    // 80
    // 96
    // },
    borderWidth: {
      0: "0",
      2: "2px",
      DEFAULT: "2px",
      bold: "4px",
    },
    borderRadius: {
      none: "0",
      sm: "0.5rem",
      DEFAULT: "1rem",
      lg: "2rem",
      full: "9999px",
    },
    extend: {
      fontSize: {
        h1: [
          "clamp(3.81rem, 0.87vi + 3.6rem, 4.29rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
        h2: [
          "clamp(3.05rem, 0.69vi + 2.88rem, 3.43rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
        h3: [
          "clamp(2.44rem, 0.55vi + 2.3rem, 2.75rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
        h4: [
          "clamp(1.95rem, 0.44vi + 1.84rem, 2.2rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
        h5: [
          "clamp(1.56rem, 0.36vi + 1.47rem, 1.76rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
        h6: [
          "clamp(1.25rem, 0.28vi + 1.18rem, 1.41rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
      },
      colors: {
        white: "#FCFCFC",
        black: "#1B1B1B",
        gray: {
          lightest: "#F4F4F4",
          light: "#E3E3E3",
          DEFAULT: "#C6C6C6",
          dark: "#3F3F3F",
        },
        accent: {
          lightest: "#C8E0FF",
          light: "#96C3FD",
          DEFAULT: "#006EFF",
          dark: "#003F92",
          darkest: "#00275B",
        },
        danger: {
          light: "#fecaca",
          DEFAULT: "#dc2626",
          dark: "#991b1b",
        },
        success: {
          light: "#bbf7d0",
          DEFAULT: "#22c55e",
          dark: "#166534",
        },
        border_color: "#C6C6C6",

        // secondary section bg
        // tetriary section bg
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "base",
    }),
    require("flowbite/plugin"),
  ],
}
