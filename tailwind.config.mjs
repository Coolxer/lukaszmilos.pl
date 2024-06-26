/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "./node_modules/flowbite/**/*.js"],
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
    extend: {
      colors: {
        white: "#FCFCFC",
        black: "#1B1B1B",
        gray: {
          100: "#F4F4F4",
          200: "#C6C6C6",
          300: "#3F3F3F",
        },
        accent: {
          100: "#C8E0FF",
          200: "#96C3FD",
          DEFAULT: "#006EFF",
          300: "#003F92",
          400: "#00275B",
        },
        danger: {
          100: "#fecaca",
          DEFAULT: "#dc2626",
          300: "#991b1b",
        },
        success: {
          100: "#bbf7d0",
          DEFAULT: "#22c55e",
          300: "#166534",
        },
      },
      fontSize: {
        h1: ["clamp(3.81rem, 0.87vi + 3.6rem, 4.29rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        h2: ["clamp(3.05rem, 0.69vi + 2.88rem, 3.43rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        h3: ["clamp(2.44rem, 0.55vi + 2.3rem, 2.75rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        h4: ["clamp(1.95rem, 0.44vi + 1.84rem, 2.2rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        h5: ["clamp(1.56rem, 0.36vi + 1.47rem, 1.76rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        h6: ["clamp(1.25rem, 0.28vi + 1.18rem, 1.41rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      spacing: {
        "section-large": "7rem",
        "section-medium": "6rem",
        "section-small": "5rem",
        "card-v": "2rem",
        "card-h": "1rem",
      },
      borderWidth: {
        DEFAULT: "2px",
        bold: "4px",
      },
      borderRadius: {
        sm: "0.5rem",
        DEFAULT: "1rem",
        lg: "2rem",

        box: "2rem",
        btn: "1rem",
        badge: "0.5rem",
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
