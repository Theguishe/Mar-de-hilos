// Imports to be used for frontend development

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const ModalData = () => {
// INSERT PROCESS

// We define the variables to be used based on the table
const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [dui, setDui] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [id_estadocliente, setId_estadocliente] = useState("");
  const [estadosClientes, setEstadosClientes] = useState([]);

  // Populating EstadoCliente list with it API
  useEffect(() => {
    fetch("http://localhost:5000/clienteS")
      .then((respone) => respone.json())
      .then((data) => setEstadosClientes(data));
  }, []);

  // Event handlers that will help to get users answer on the inputs
  const handleCorreo = (e) => {
    setCorreo(e.target.value);
  }

  const handleContrasenia = (e) => {
    setContrasenia(e.target.value);
  }

  const handleDui = (e) => {
    setDui(e.target.value);
  }

  const handleDireccion = (e) => {
    setDireccion(e.target.value);
  }

  const handleTelefono = (e) => {
    setTelefono(e.target.value);
  }

  const handleFechaNac = (e) => {
    setFecha_nacimiento(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // We compare table fields with user's reponse

    const formData = {
      correo: correo,
      contrasenia: contrasenia,
      dui: dui,
      direccion: direccion,
      telefono: telefono,
      fecha_nacimiento: fecha_nacimiento,
      id_estadocliente: id_estadocliente,
    };

    // Api to insert our Data using POST
    const res = await fetch("http://localhost:5000/Cclients", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
  };


  // We return here all elements
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
          label="Enter the email"
          placeholder="example@gmail.com"
          variant="filled"
          value={correo}
          onChange={handleCorreo}
          sx={{
            fontSize: "15px",
            width: "60%",
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
          type="password"
          label="Enter the password"
          variant="filled"
          value={contrasenia}
          onChange={handleContrasenia}
          sx={{
            width: "38.5%",
            marginBottom: "15px",
          }}
        />
        <TextField
          className="register-inputs"
          id="user-dui"
          label="Enter the DUI"
          placeholder="xxxxxxxx-x"
          variant="filled"
          value={dui}
          onChange={handleDui}
          sx={{
            fontSize: "15px",
            width: "28.5%",
            marginRight: "12px",
            marginBottom: "30px",
          }}
        />
        <TextField
          className="register-inputs"
          id="user-phone"
          label="Enter the phone-number"
          placeholder="xxxx-xxxx"
          variant="filled"
          value={telefono}
          onChange={handleTelefono}
          sx={{
            fontSize: "20px",
            width: "30%",
            marginRight: "12px",
            marginBottom: "15px",
          }}
        />
        <TextField
          className="register-inputs"
          id="user-date"
          label="Enter the user-birthdate"
          placeholder="yyyy-mm-dd"
          variant="filled"
          value={fecha_nacimiento}
          onChange={handleFechaNac}
          sx={{
            fontSize: "15px",
            width: "38.5%",
            marginBottom: "15px",
          }}
        />
        <TextField
          className="register-inputs"
          id="user-address"
          label="Enter the address"
          multiline
          rows={5}
          variant="filled"
          value={direccion}
          onChange={handleDireccion}
          sx={{
            fontSize: "15px",
            width: "60%",
            marginRight: "12px",
            marginBottom: "15px",
          }}
        />
        <FormControl variant="filled" sx={{ width: "38.5%", fontSize: "15px" }}>
          <InputLabel id="demo-simple-select-filled-label">Client status</InputLabel>
          <Select
              value={id_estadocliente}
              onChange={(e) => setId_estadocliente(e.target.value)}
            >
              {estadosClientes.map((option) => (
                <MenuItem key={option.id_estadocliente} value={option.id_estadocliente}>
                  {option.estado_cliente}
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
            right: "15%",
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
