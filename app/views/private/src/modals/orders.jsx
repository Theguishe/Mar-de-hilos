import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const ModalData = () => {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [id_estadopedido, setId_estadopedido] = useState("");
  const [id_producto, setId_producto] = useState("");
  const [id_cliente, setId_cliente] = useState("");

  const [EstadosPedidos, setEstadosPedidos] = useState([]);
  const [Productos, setProductos] = useState([]);
  const [Clientes, setClientes] = useState([]);

  const handleFecha = (e) => {
    setFecha(e.target.value);
  };

  const handleHora = (e) => {
    setHora(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/pedidosCS")
      .then((response) => response.json())
      .then((data) => setEstadosPedidos(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/pedidosCP")
      .then((response) => response.json())
      .then((data) => setProductos(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/pedidosCC")
      .then((response) => response.json())
      .then((data) => setClientes(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fecha: fecha,
      hora: hora,
      id_estadopedido: id_estadopedido,
      id_producto: id_producto,
      id_cliente: id_cliente,
    };

    const res = await fetch("http://localhost:5000/CpedidosC", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <Box
      sx={{
        background: "transparent",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
        <TextField
          className="register-inputs"
          id="user-email"
          label="Enter the order date"
          placeholder="example@gmail.com"
          variant="filled"
          value={fecha}
          onChange={handleFecha}
          sx={{
            fontSize: "15px",
            width: "45%",
            marginRight: "12px",
            marginBottom: "30px",
            input: {
              "&:focus": {
                color: "#fff",
              },
            },
            label: {
              color: "#fff",
              "&:focus": {
                color: "#fff",
              },
            },
          }}
        />
        <TextField
          className="register-inputs"
          id="user-password"
          label="Enter the order hour"
          variant="filled"
          value={hora}
          onChange={handleHora}
          sx={{
            marginLeft: "2%",
            width: "50.5%",
          }}
        />

        <FormControl
          variant="filled"
          sx={{ fontSize: "15px", marginBottom: "4%" }}
          fullWidth
        >
          <InputLabel id="demo-simple-select-filled-label">
            Order Status
          </InputLabel>
          <Select
            value={id_estadopedido}
            onChange={(e) => setId_estadopedido(e.target.value)}
          >
            {EstadosPedidos.map((option) => (
              <MenuItem
                key={option.id_estadopedido}
                value={option.id_estadopedido}
              >
                {option.estado_pedido}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="filled"
          sx={{ fontSize: "15px", marginBottom: "4%" }}
          fullWidth
        >
          <InputLabel id="demo-simple-select-filled-label">
            User level
          </InputLabel>
          <Select
              value={id_producto}
              onChange={(e) => setId_producto(e.target.value)}
            >
              {Productos.map((option) => (
                <MenuItem key={option.id_producto} value={option.id_producto}>
                  {option.nombre_producto}
                </MenuItem>
              ))}
            </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ fontSize: "15px" }} fullWidth>
          <InputLabel id="demo-simple-select-filled-label">
            User status
          </InputLabel>
          <Select
            value={id_cliente}
            onChange={(e) => setId_cliente(e.target.value)}
          >
            {Clientes.map((option) => (
              <MenuItem key={option.id_cliente} value={option.id_cliente}>
                {option.correo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          sx={{
            fontSize: "14px",
            position: "absolute",
            bottom: "24px",
            right: "24px",
            width: "100px",
            height: "35px",
            background: "#080b12",
            color: "#fff",
            textTransform: "capitalize",
            ":hover": {
              background: "#0c101b",
            },
          }}
        >
          Save
        </Button>
        <Button
          sx={{
            fontSize: "14px",
            position: "absolute",
            bottom: "24px",
            right: "26%",
            width: "100px",
            height: "35px",
            background: "#080b12",
            color: "#fff",
            textTransform: "capitalize",
            ":hover": {
              background: "#0c101b",
            },
          }}
        >
          Clean
        </Button>
      </form>
    </Box>
  );
};

export default ModalData;
