import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinedex: {
          pink: "#c618a6",
          darkPink: "#8f0c96",
          purple: "#48076a",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwind-scrollbar")],
};
export default config;
