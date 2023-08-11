// We import db file where is all the settings for connection
const pool = require("../db");

// Function to get the list to show in MUI datagrid
const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM productos");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM productos ORDER BY id_producto ASC");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getProductCard = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT id_producto, nombre_producto, imagen_producto, descripcion_producto, precio, valoracion_producto FROM productos ORDER BY id_producto ASC");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT id_producto, nombre_producto, descripcion_producto, precio, valoracion_producto FROM productos WHERE id_producto = $1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Product not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getNewProducts = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM productos");
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
  const { nombre_producto, imagen, descripcion, precio, cantidad, id_tipoproducto, id_usuario, id_categoria } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO productos(nombre_producto, imagen, descripcion, precio, cantidad, id_tipoproducto, id_usuario, id_categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [nombre_producto, imagen, descripcion, precio, cantidad, id_tipoproducto, id_usuario, id_categoria]
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
    const { nombre_producto, imagen, descripcion, precio, cantidad, id_tipoproducto, id_usuario, id_categoria } = req.body;

    const result = await pool.query(
      "UPDATE productos SET nombre_producto = $1, imagen = $2, descripcion = $3, precio = $4, cantidad = $5, id_tipoproducto = $6, id_usuario = $7, id_categoria = $8 WHERE id_producto = $9 RETURNING *",
      [nombre_producto, imagen, descripcion, precio, cantidad, id_tipoproducto, id_usuario, id_categoria, id_producto]
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

module.exports = {
  getAllTasks,
  getProducts,
  getSingleTask,
  getProductCard,
  getNewProducts,
  getOneProduct,
  getCategoriesTable,
  getProductTypeTable,
  getUsersTable,
  creatingTask,
  updatingTask,
  deletingTask,
};
