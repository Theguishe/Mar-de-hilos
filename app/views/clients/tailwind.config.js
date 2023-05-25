/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/Components/prueba.jsx"],
  theme:{
    extend: {},
  },
  plugins:[],
})
module.exports = {
  content: [
    "./src/Components/navbar.jsx",
    "./src/Components/carrusel.jsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

