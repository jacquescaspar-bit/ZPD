/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [
    "variant",
    [
      '@media (prefers-color-scheme: dark) { &:not(:where(html[data-dev-theme="light"] *)) }',
      '&:is(:where(html[data-dev-theme="dark"] *))',
    ],
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
