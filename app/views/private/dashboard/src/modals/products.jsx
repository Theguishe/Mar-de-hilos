import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const ModalData = () => {
  const [age, setAge] = React.useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImagesUrls] = useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImagesUrls = [];
    images.forEach((image) => newImagesUrls.push(URL.createObjectURL(image)));
    setImagesUrls(newImagesUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

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
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "60%",
            marginRight: "100px",
          }}
        >
          <TextField
            className="register-inputs"
            id="product-name"
            label="Enter the name of product"
            variant="filled"
            sx={{
              fontSize: "15px",
              minWidth: "100%",
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
            sx={{
              minWidth: "100%",
              marginBottom: "15px",
            }}
          />
          <TextField
            className="register-inputs"
            id="user-dui"
            label="Enter the DUI"
            placeholder="xxxxxxxx-x"
            variant="filled"
            sx={{
              fontSize: "15px",
              minWidth: "40%",
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
            sx={{
              fontSize: "20px",
              minWidth: "57.5%",
            }}
          />
          <TextField
            className="register-inputs"
            id="user-date"
            label="Enter the user-birthdate"
            placeholder="yyyy-mm-dd"
            variant="filled"
            sx={{
              fontSize: "15px",
              minWidth: "100%",
              marginBottom: "15px",
            }}
          />
          <TextField
            className="register-inputs"
            id="user-address"
            label="Enter the address"
            multiline
            rows={4}
            variant="filled"
            sx={{
              fontSize: "15px",
              minWidth: "100%",
              marginRight: "12px",
              marginBottom: "15px",
            }}
          />
          <FormControl
            variant="filled"
            sx={{ width: "100%", fontSize: "15px" }}
          >
            <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Active</MenuItem>
              <MenuItem value={20}>Inactive</MenuItem>
              <MenuItem value={30}>Visitor</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {imageUrls.map((imageSrc) => (
            <img
              src={imageSrc}
              alt="product"
              style={{
                width: "200px",
                height: "200px",
                marginBottom: "30px"
              }}
            />
          ))}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
            style={{
              background: "#080b12",
              width: "60%",
              minHeight: "40px",
              border: "1px solid #30363D",
              borderRadius: "12px",
              
            }}
          />
          <Button></Button>
        </Box>

        <Button
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
