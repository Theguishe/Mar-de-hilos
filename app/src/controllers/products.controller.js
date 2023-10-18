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
    const result = await pool.query(
      `SELECT
      c.nombre_categoria,
      COUNT(p.id_producto) AS cantidad_productos
  FROM categorias as c
      LEFT JOIN productos p ON c.id_categoria = p.id_categoria
  WHERE p.id_producto IS NOT NULL
  GROUP BY
      c.id_categoria,
      c.nombre_categoria
  ORDER BY c.id_categoria`
    );
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
    LEFT JOIN productos p ON c.id_tipo_producto = p.id_tipo_producto
    WHERE p.id_producto IS NOT NULL
    GROUP BY c.id_tipo_producto, c.tipo_producto
    ORDER BY c.id_tipo_producto
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
          EXTRACT(MONTH FROM fecha_pedido) AS mes,
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
    JOIN carrito c ON pc.id_pedido_catalogo = c.id_pedido_catalogo
    JOIN productos p ON c.id_producto = p.id_producto
    WHERE pc.id_estado_pedido = 3 `);
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
    SELECT p.nombre_producto, SUM(c.cantidad) AS cantidad_vendida
    FROM productos p
    JOIN carrito c ON p.id_producto = c.id_producto
    GROUP BY p.nombre_producto
    ORDER BY cantidad_vendida DESC
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
    SELECT u.nivel_usuario, COUNT(*) AS cantidad_clientes
    FROM usuarios u
    GROUP BY u.nivel_usuario 
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

const productosFav = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
    SELECT b.nombre_producto, SUM(cantidad) FROM carrito a, productos b GROUP BY b.nombre_producto LIMIT 10 OFFSET 0 
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

const pedidosCliente = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
    
SELECT
b.apellido_cliente,
SUM(a.cantidad)
FROM
carrito as a,
clientes as b,
productos as c,
pedidos_catalogo as d
WHERE
a.id_producto = c.id_producto
AND a.id_pedido_catalogo = d.id_pedido_catalogo
AND d.id_cliente = b.id_cliente
GROUP BY b.apellido_cliente
ORDER BY sum
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

const productosCategoria = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
    
    SELECT b.nombre_categoria, COUNT(*) FROM productos a, categorias b WHERE a.id_categoria = b.id_categoria GROUP BY b.nombre_categoria
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

const ultimosPedidos = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
    
    SELECT a.nombre_producto, c.cantidad, b.nombre_categoria, d.fecha_pedido
FROM productos a, categorias b, carrito c, pedidos_catalogo d WHERE a.id_categoria = b.id_categoria AND c.id_producto = a.id_producto  AND c.id_pedido_catalogo = d.id_pedido_catalogo ORDER BY d.fecha_pedido LIMIT 5 OFFSET 0
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

const productosMasResenas = async (req, res, next) => {
  try {
    // Realiza una consulta SQL para obtener la cantidad de productos por categoría
    const result = await pool.query(`
    SELECT a.nombre_producto, COUNT(*)
FROM productos a, resenias_detalles b
WHERE a.id_producto = b.id_producto
GROUP BY a.nombre_producto ORDER BY count DESC LIMIT 5
        `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
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
  productosFav,
  pedidosCliente,
  productosCategoria,
  ultimosPedidos,
  productosMasResenas,
};
