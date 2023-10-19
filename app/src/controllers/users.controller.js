// We import db file where is all the settings for connection
const pool = require("../db");

// Function to get the list to show in MUI datagrid
const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query('SELECT * FROM usuariosView');
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// Function to gte the count number of registers in the tables
const getCount = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM usuariosView");
    const count = result.rows[0].count;
    res.json({ count });
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
      "SELECT * FROM usuarios WHERE id_usuario = $1",
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
const getUserLevel = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM niveles_usuarios");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getUserStatus = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM estados_usuarios");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };
  

  // Function to insert a user
const creatingTask = async (req, res, next) => {
  const { nombre_usuario, contrasenia, dui, fecha_nacimiento, telefono, correo, direccion, id_nivelusuario, id_estadousuario } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO usuarios( nombre_usuario, contrasenia, dui, fecha_nacimiento, telefono, correo, direccion, id_nivelusuario, id_estadousuario ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [ nombre_usuario, contrasenia, dui, fecha_nacimiento, telefono, correo, direccion, id_nivelusuario, id_estadousuario ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

// Function to update a user
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

// Function to delete a user
const deletingTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM usuarios WHERE id_usuario = $1",
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
  getUserLevel,
  getUserStatus,
  creatingTask,
  updatingTask,
  deletingTask,
  getCount
};
