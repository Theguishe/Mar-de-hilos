import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import "../pages/style/gstyle.css";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FilledInput, InputAdornment } from "@mui/material";

const ModalData = () => {
  // INSERT PROCESS
  const [nombre_producto, setNombreProducto] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [id_tipoproducto, setID_tipoproducto] = useState("");
  const [id_usuario, setID_usuario] = useState("");
  const [id_categoria, setID_categoria] = useState("");
  const [TiposProductos, setTiposProductos] = useState([]);
  const [Usuarios, setUsuarios] = useState([]);
  const [Categorias, setCategorias] = useState([]);

  const handleNameChange = (e) => {
    setNombreProducto(e.target.value);
  };

  const handleImageChange = (e) => {
    setImagen(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrecio(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setCantidad(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/tipoP")
      .then((respone) => respone.json())
      .then((data) => setTiposProductos(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/usuarios")
      .then((response) => response.json())
      .then((data) => setUsuarios(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/categorias")
      .then((response) => response.json())
      .then((data) => setCategorias(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre_producto: nombre_producto,
      imagen: imagen,
      descripcion: descripcion,
      precio: precio,
      cantidad: cantidad,
      id_tipoproducto: id_tipoproducto,
      id_usuario: id_usuario,
      id_categoria: id_categoria,
    };

    const res = await fetch("http://localhost:5000/cproducts", {
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
      <form
        onSubmit={handleSubmit}
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "70%",
            marginRight: "100px",
          }}
        >
          <TextField
            type="text"
            label="Enter the name of product"
            variant="filled"
            value={nombre_producto}
            onChange={handleNameChange}
            sx={{
              fontSize: "15px",
              minWidth: "50%",
              marginRight: "12px",
              marginBottom: "20px",
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

          <FormControl sx={{ minWidth: "47.5%" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">precio</InputLabel>
            <FilledInput
              className="precio-input"
              type="number"
              id="filled-adornment-amount"
              value={precio}
              onChange={handlePriceChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>

          <TextField
            className="register-inputs"
            id="product-cantidad"
            label="Enter the cantidad"
            variant="filled"
            type="number"
            value={cantidad}
            onChange={handleQuantityChange}
            sx={{
              fontSize: "15px",
              minWidth: "40%",
              marginRight: "12px",
              marginBottom: "20px",
            }}
          />

          <FormControl
            variant="filled"
            sx={{ width: "57.5%", fontSize: "15px" }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              categoria
            </InputLabel>
            <Select
              value={id_categoria}
              onChange={(e) => setID_categoria(e.target.value)}
            >
              {Categorias.map((option) => (
                <MenuItem key={option.id_categoria} value={option.id_categoria}>
                  {option.categoria}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            variant="filled"
            sx={{ width: "45%", fontSize: "15px", marginRight: "12px" }}
          >
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: "white" }}
            >
              Product Type
            </InputLabel>
            <Select
              value={id_tipoproducto}
              onChange={(e) => setID_tipoproducto(e.target.value)}
            >
              {TiposProductos.map((option) => (
                <MenuItem
                  key={option.id_tipoproducto}
                  value={option.id_tipoproducto}
                >
                  {option.tipo_producto}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            variant="filled"
            sx={{ width: "52.5%", fontSize: "15px", marginBottom: "30px" }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Select User
            </InputLabel>
            <Select
              value={id_usuario}
              onChange={(e) => setID_usuario(e.target.value)}
            >
              {Usuarios.map((option) => (
                <MenuItem key={option.id_usuario} value={option.id_usuario}>
                  {option.nombre_usuario}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            variant="filled"
            label="Write a Description"
            multiline
            rows={4}
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              fontSize: "15px",
              minWidth: "100%",
              marginRight: "12px",
              marginBottom: "15px",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          {/* {imageUrls.map((imageSrc) => (
            <img
              src={imageSrc}
              alt="product"
              style={{
                width: "200px",
                height: "200px",
                marginBottom: "30px",
              }}
            />
          ))} */}
          <label htmlFor="">
            Select image
            <input
              name="imagen"
              label="Upload an image"
              type="file"
              accept="image/*"
              value={imagen}
              onChange={handleImageChange}
            />
          </label>
          <Button></Button>
        </Box>

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
        {/* {loading ? <CircularProgress color="inherit" size={24} /> : "Save"} */}
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
