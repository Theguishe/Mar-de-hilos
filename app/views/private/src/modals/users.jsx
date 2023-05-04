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
const [nombre_usuario, setNombreUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [dui, setDui] = useState("");
  const [fecha_nacimiento, setFechaNac] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [id_nivelusuario, setId_nivelUsuario] = useState("");
  const [id_estadousuario, setId_estadoUsuario] = useState("");
  const [NivelesUsuarios, setNivelesUsuarios] = useState([]);
  const [EstadosUsuarios, setEstadoUsuario] = useState([]);

  // Event handlers that will help to get users answer on the inputs
  const handleNameChange = (e) => {
    setNombreUsuario(e.target.value);
  };

  const handleContrasenia = (e) => {
    setContrasenia(e.target.value);
  };

  const handleDui = (e) => {
    setDui(e.target.value);
  };

  const handleTelefono = (e) => {
    setTelefono(e.target.value);
  };

  const handleFechaNac = (e) => {
    setFechaNac(e.target.value);
  };

  const handleCorreo = (e) => {
    setCorreo(e.target.value);
  };

  const handleDireccion = (e) => {
    setDireccion(e.target.value);
  };

  // Functions that allow us to populate the lists

  // Populating NivelesUsuarios list with it API
  useEffect(() => {
    fetch("http://localhost:5000/userL")
      .then((response) => response.json())
      .then((data) => setNivelesUsuarios(data));
  }, []);

  // Populating EstadoUsuario list with it API
  useEffect(() => {
    fetch("http://localhost:5000/userStatus")
      .then((response) => response.json())
      .then((data) => setEstadoUsuario(data));
  }, []);

  // Event handlers submit the data to database
  const handleSubmit = async (e) => {
    e.preventDefault();

    // We compare table fields with user's reponse
    const formData = {
      nombre_usuario: nombre_usuario,
      contrasenia: contrasenia,
      dui: dui,
      fecha_nacimiento: fecha_nacimiento,
      telefono: telefono,
      correo: correo,
      direccion: direccion,
      id_nivelusuario: id_nivelusuario,
      id_estadousuario: id_estadousuario,
    };

    // Api to insert our Data using POST
    const res = await fetch("http://localhost:5000/Cusers", {
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
          label="Enter the username"
          variant="filled"
          value={nombre_usuario}
          onChange={handleNameChange}
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
          id="user-email"
          label="Enter the user email"
          placeholder="example@gmail.com"
          variant="filled"
          value={correo}
          onChange={handleCorreo}
          sx={{
            fontSize: "15px",
            width: "48%",
            marginRight: "12px",
            marginBottom: "15px",
          }}
        />

        <FormControl variant="filled" sx={{ width: "50%", fontSize: "15px" }}>
          <InputLabel id="demo-simple-select-filled-label">
            User level
          </InputLabel>
          <Select
            value={id_nivelusuario}
            onChange={(e) => setId_nivelUsuario(e.target.value)}
          >
            {NivelesUsuarios.map((option) => (
              <MenuItem key={option.id_nivelusuario} value={option.id_nivelusuario}>
                {option.nivel_usuario}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
            width: "48%",
            marginRight: "12px",
            marginBottom: "15px",
          }}
        />

        <FormControl variant="filled" sx={{ width: "50%", fontSize: "15px" }}>
          <InputLabel id="demo-simple-select-filled-label">
            User status
          </InputLabel>
          <Select
            value={id_estadousuario}
            onChange={(e) => setId_estadoUsuario(e.target.value)}
          >
            {EstadosUsuarios.map((option) => (
              <MenuItem key={option.id_estadousuario} value={option.id_estadousuario}>
                {option.estado_usuario}
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
