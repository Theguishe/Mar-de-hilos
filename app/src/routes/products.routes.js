// We import the need extensions and db file
const { Router } = require("express");
const pool = require("../db");

// We import the different functions from products-controller
const {
  getAllTasks,
  getSingleTask,
  creatingTask,
  updatingTask,
  deletingTask,
  getProductTypeTable,
  getCategoriesTable,
  getUsersTable,
  productosCategoriaChart,
  productosTipoChart,
  productosPedidosPorMesChart,
  countTotalProducts,
  topTenProductosChart,
  usuariosNivelChart,
  productosFav,
  pedidosCliente,
  productosCategoria,
  ultimosPedidos,
  productosMasResenas,
} = require("../controllers/products.controller");

// We  create a variable that will help us to make the http request using the routes
const router = Router();

// We define the different urls destines for every task to attatch
router.get("/products", getAllTasks); // To get all the registers

router.get("/productsList/:id", getSingleTask); // To get a register based on the ID

// To charge comboboxes
router.get("/tipoP", getProductTypeTable);

router.get("/usuarios", getUsersTable);

router.get("/categorias", getCategoriesTable);

router.post("/cproducts", creatingTask); // To create a register

router.put("/productU/:id", updatingTask); // To update a register

router.delete("/productD/:id", deletingTask); // To delete a register

// Productos croche
router.get("/croche" /*Funcion del controller */);

// Usados para graficas
router.get("/productoCategoria", productosCategoriaChart); // To get all the registers

router.get("/productoTipo", productosTipoChart); // To get all the registers

router.get("/productoPorMes", productosPedidosPorMesChart); // To get all the registers

router.get("/countTotal", countTotalProducts); // To get all the registers

router.get("/topTenProductos", topTenProductosChart);

router.get("/usuariosPorNivel", usuariosNivelChart);

router.get("/productos/fav", productosFav);
router.get("/productos/cliente", pedidosCliente);
router.get("/productos/categoria", productosCategoria);
router.get("/pedidos/ultimos", ultimosPedidos);
router.get("/productos/resenas", productosMasResenas);

// We export our  request variable
module.exports = router;
