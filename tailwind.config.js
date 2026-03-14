/** @type {import('tailwindcss').Config} */
module.exports = {
  
  // Specify the paths to all of the template files in your project - at our source directory (src) and any file at any layer with the extensions js, jsx, ts, tsx - this is where Tailwind will look for class names to generate the corresponding styles
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [
    require('./tailwind-preset.js'),
  ],
}

