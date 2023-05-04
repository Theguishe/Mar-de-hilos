// We import db file where is all the settings for connection
const pool = require("../db");

// Function to get the list to show in MUI datagrid
const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM pedidos_catalogoView");
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
      "SELECT * FROM pedidos_catalogo WHERE id_pedido_c = $1",
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
const getOrderStatus = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM estados_pedidos");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM productos");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getClient = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM clientes");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// Function to insert a catalog_orders
const creatingTask = async (req, res, next) => {
  const { fecha, hora, id_estadopedido, id_producto, id_cliente } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO pedidos_catalogo( fecha, hora, id_estadopedido, id_producto, id_cliente ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [fecha, hora, id_estadopedido, id_producto, id_cliente]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

// Function to update a catalog_orders
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

// Function to delete a catalog_order
const deletingTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM clientes WHERE id_cliente = $1",
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


// We export here the functions to be used
module.exports = {
  getAllTasks,
  getSingleTask,
  getOrderStatus,
  getProduct,
  getClient,
  creatingTask,
  updatingTask,
  deletingTask,
};
