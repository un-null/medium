/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "notion-tag-red": "rgba(255,115,105,0.5)",
        "notion-tag-blue": "rgba(82,156,202,0.5)",
        "notion-tag-green": "rgba(255,115,105,0.5)",
        "notion-tag-gray": "rgba(206,205,202,0.5)",
      },
    },
  },
  plugins: [],
};
