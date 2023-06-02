// We import db file where is all the settings for connection
const pool = require("../db");

// Function to get the list to show in MUI datagrid
const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM ordersView");
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
    const allTasks = await pool.query("SELECT nombre_producto FROM productos");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getClient = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT correo FROM clientes");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};


// Function to insert a cart
const creatingTask = async (req, res, next) => {
  const {
    hora,
    fecha,
    id_estadopedido,
    id_cliente,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO pedidos_catalogo(fecha, hora, id_estadopedido, id_cliente) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        hora,
        fecha,
        id_estadopedido,
        id_cliente,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};


// We export here the functions to be used
module.exports = {
  getAllTasks,
  getSingleTask,
  getOrderStatus,
  getProduct,
  getClient,
  creatingTask
};
