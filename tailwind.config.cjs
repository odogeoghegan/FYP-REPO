/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}","./components/**.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar"), require('flowbite/plugin')],
};
