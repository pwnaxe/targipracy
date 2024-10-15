/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'sahara-sand': {
          '50': '#fcfbea',
          '100': '#f9f6c8',
          '200': '#f3e77d',
          '300': '#efd955',
          '400': '#e8c527',
          '500': '#d9ae19',
          '600': '#bb8813',
          '700': '#956213',
          '800': '#7c4e17',
          '900': '#6a4119',
          '950': '#3d220b',    
        },
      },
    },
  },
  plugins: [],
};
