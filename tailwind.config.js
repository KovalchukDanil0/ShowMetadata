import { Flowbite } from "flowbite-react";

/** @type {import('tailwindcss').Config} */
const tailwind = {
  content: [
    "./src/**/*.{js,tsx, ts}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      width: {
        500: "500px",
      },
    },
  },
  darkMode: "media",
  plugins: [Flowbite],
};

export default tailwind;
