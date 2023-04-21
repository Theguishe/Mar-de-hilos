import * as React from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const ModalData = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
      
      <form style={{ marginTop: "30px" }}>
        <TextField
          className="register-inputs"
          id="user-email"
          label="Enter the email"
          placeholder="example@gmail.com"
          variant="filled"
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
          sx={{
            fontSize: "15px",
            width: "60%",
            marginRight: "12px",
            marginBottom: "15px",
          }}
        />
        <FormControl variant="filled" sx={{ width: "38.5%", fontSize: "15px" }}>
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
