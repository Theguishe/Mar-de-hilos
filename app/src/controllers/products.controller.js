// We import db file where is all the settings for connection
const pool = require("../db");

// Function to get the list to show in MUI datagrid
const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM productosView");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// Function to get just a single row using the id
const getSingleTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM productos WHERE id_producto = $1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
  // res.send("Retrieving a single task");
};

// Functions to populate the comboboxes
const getProductTypeTable = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tipos_productos");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getUsersTable = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM usuarios");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getCategoriesTable = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM categorias");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// Function to insert a product
const creatingTask = async (req, res, next) => {
  const {
    nombre_producto,
    imagen,
    descripcion,
    precio,
    cantidad,
    id_tipoproducto,
    id_usuario,
    id_categoria,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO productos(nombre_producto, imagen, descripcion, precio, cantidad, id_tipoproducto, id_usuario, id_categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        nombre_producto,
        imagen,
        descripcion,
        precio,
        cantidad,
        id_tipoproducto,
        id_usuario,
        id_categoria,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

// Function to update a product
const updatingTask = async (req, res, next) => {
  try {
    const { id_producto } = req.params;
    const {
      nombre_producto,
      imagen,
      descripcion,
      precio,
      cantidad,
      id_tipoproducto,
      id_usuario,
      id_categoria,
    } = req.body;

    const result = await pool.query(
      "UPDATE productos SET nombre_producto = $1, imagen = $2, descripcion = $3, precio = $4, cantidad = $5, id_tipoproducto = $6, id_usuario = $7, id_categoria = $8 WHERE id_producto = $9 RETURNING *",
      [
        nombre_producto,
        imagen,
        descripcion,
        precio,
        cantidad,
        id_tipoproducto,
        id_usuario,
        id_categoria,
        id_producto,
      ]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    console.log(result);
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Function to delete a product
const deletingTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM productos WHERE id_producto = $1",
      [id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    res.send("Task removed succesfully");
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// USADOS PARA LAS GRAFICAS
const productosCategoriaChart = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
    SELECT c.categoria, COUNT(p.id_producto) AS cantidad_productos
    FROM categorias c
    LEFT JOIN productos p ON c.id_categoria = p.id_categoria
    WHERE p.id_producto IS NOT NULL
    GROUP BY c.id_categoria, c.categoria
    ORDER BY c.id_categoria;
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

const productosTipoChart = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
    SELECT c.tipo_producto, COUNT(p.id_producto) AS cantidad_productos
    FROM tipos_productos c
    LEFT JOIN productos p ON c.id_tipoproducto = p.id_tipoproducto
    WHERE p.id_producto IS NOT NULL
    GROUP BY c.id_tipoproducto, c.tipo_producto
    ORDER BY c.id_tipoproducto;
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

const productosPedidosPorMesChart = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
          SELECT
          EXTRACT(MONTH FROM fecha) AS mes,
          COUNT(*) AS cantidad_pedidos
          FROM pedidos_catalogo
          GROUP BY mes
          ORDER BY mes;
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

const countTotalProducts = async (req, res, next) => {
  try {
    const result = await pool.query(`
    SELECT SUM(p.precio) AS total_productos_vendidos
    FROM pedidos_catalogo pc
    JOIN carrito c ON pc.id_pedido_c = c.id_pedido_c
    JOIN productos p ON c.id_producto = p.id_producto
    WHERE pc.id_estadopedido = 3;`);
    res.json(result.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const topTenProductosChart = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
          SELECT p.nombre, SUM(c.cantidad) AS cantidad_vendida
          FROM productos p
          JOIN carrito c ON p.id_producto = c.id_producto
          GROUP BY p.nombre
          ORDER BY cantidad_vendida DESC
          LIMIT 10;
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

const usuariosNivelChart = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
          SELECT nu.nivel_usuario, COUNT(*) AS cantidad_clientes
          FROM usuarios u
          JOIN niveles_usuarios nu ON u.id_nivelusuario = nu.id_nivelusuario
          GROUP BY nu.nivel_usuario;
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

// Para la pagina publica, carga de cards
const getProductCard = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT id_producto, nombre_producto, imagen_producto, precio, descripcion_producto, valoracion_producto FROM productos ORDER BY id_producto ASC");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// Para la pagina publica, carga de cards
const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT id_producto, nombre_producto, imagen_producto, precio, descripcion_producto, valoracion_producto FROM productos WHERE id_producto = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  getCategoriesTable,
  getProductTypeTable,
  getUsersTable,
  creatingTask,
  updatingTask,
  deletingTask,
  productosCategoriaChart,
  productosTipoChart,
  productosPedidosPorMesChart,
  countTotalProducts,
  topTenProductosChart,
  usuariosNivelChart,
  getProductCard,
  getSingleProduct
};
