const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      'custom-orange': '#FB4F14',
      'custom-blue': '#35B3B7',
      'custom-black': '#292831',
      'custom-gray': '#D0CECE',
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}