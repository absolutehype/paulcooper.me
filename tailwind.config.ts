import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontWeight: {
        normal: "500",
      },
      fontSize: {
        md: "1.4rem",
        lg: "1.6rem",
        xl: "1.8rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "4xl": "3.6rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
export default config;
