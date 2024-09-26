/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/src/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors : {
        background : "#111827",
        background_dark : "#03071255",
        background_card : "#1f2937",
        text_primary : "#f1f5f9",
        text_secondary : "#d1d5db",
        text_disabled : "#d1d5dbaa"
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ]
}
