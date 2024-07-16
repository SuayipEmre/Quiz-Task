import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'white-soft': '0px 0px 15px 0px #FFFFFF12',
        'white-strong': '0px 25px 50px -12px #FFFFFF40',
       
      },
      colors: {
        secondary : '#2b3945',
        third: '#202c37', 
      },
    },
  },
  plugins: [],
};
export default config;
