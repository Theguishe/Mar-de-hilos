import * as React from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";

const ModalData = () => {

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
      <Modal>
        <Box
        sx={{
          background: "#141b2d",
          color: "#fff",
          position: "absolute",
          right: "0",
          left: "0",
          margin: "auto",
          top: "0",
          bottom: "0",
          width: "60vw",
          height: "70vh",
          borderRadius: "12px",
          padding: "25px",
          boxShadow:
            "rgba(255, 255, 255, 0) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0) 0px 20px 40px -30px",
        }}
      >
        <div
          sx={{
            width: "100%",
            color: "#fff",
            fontSize: "16px",
            textAlign: "left",
            marginBottom: "30px",
            backgroundColor: "#000",
          }}
        >
          <h1>Register a client</h1>
        </div>
        {/* We charge the inputs we are gonna use to insert data */}
      </Box>
      <Box
        sx={{
          background: "transparent",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <form style={{ marginTop: "30px" }}>
          <TextField
            className="register-inputs"
            id="user-email"
            label="Enter the email"
            placeholder="example@gmail.com"
            variant="filled"
            sx={{
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
            sx={{
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
            sx={{
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
            sx={{
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
            sx={{
              width: "60%",
              marginRight: "12px",
              marginBottom: "15px",
            }}
          />
          <FormControl variant="filled" sx={{ width: "38.5%" }}>
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

          <Button
            sx={{
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
      </Modal>
  );
};

export default ModalData;
