import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        "8xl": "1432px",
      },
      colors: {
        primary: "#2D76E9",
        "custom-black": "#070707",
        "custom-white": "#FEFCFB",
        "custom-verdigris": "#28AFB0",
        "custom-green": "748067",
        "custom-bg": "#DFE7F3",
      },
      spacing: {
        "1.5": "6px",
        "2.5": "10px",
        "3.5": "14px",
        "4.5": "18px",
        "5.5": "22px",
        "6.5": "26px",
        "7.5": "30px",
        "8.5": "34px",
        "9.5": "38px",
        "10.5": "42px",
        "217": "217px",
      },
      fontFamily: {
        custom: ["Jura", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
