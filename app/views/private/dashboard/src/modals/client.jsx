import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ModalData = () => {
  return (
    <Box
      sx={{
        background: "#222",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        sx={{
          width: "100%",
          color: "#fff",
          fontSize: "16px",
          textAlign: "left",
          marginBottom: "30px",
        }}
      >
        <h1>Register a client</h1>
      </div>
      <form>
        <TextField
          className="register-inputs"
          id="user-email"
          label="Enter the email"
          placeholder="example@gmail.com"
          variant="filled"
          sx={{
            width: "50%",
          }}
        />
        <TextField
          className="register-inputs"
          id="user-password"
          label="Enter the email"
          placeholder="example@gmail.com"
          variant="filled"
          sx={{
            width: "50%",
          }}
        />
        <TextField
          className="register-inputs"
          id="user-dui"
          label="Enter the email"
          placeholder="example@gmail.com"
          variant="filled"
          sx={{
            width: "50%",
          }}
        />
        <TextField
          className="register-inputs"
          id="user-address"
          label="Enter the email"
          placeholder="example@gmail.com"
          variant="filled"
          sx={{
            width: "50%",
          }}
        />
        <TextField
          className="register-inputs"
          id="user-phone"
          label="Enter the email"
          placeholder="example@gmail.com"
          variant="filled"
          sx={{
            width: "50%",
          }}
        />
        <TextField
          className="register-inputs"
          id="user-date"
          label="Enter the email"
          placeholder="example@gmail.com"
          variant="filled"
          sx={{
            width: "50%",
          }}
        />
        <TextField
          className="register-inputs"
          id="client-status"
          label="Enter the email"
          placeholder="example@gmail.com"
          variant="filled"
          sx={{
            width: "50%",
          }}
        />
      </form>
    </Box>
  );
};

export default ModalData;
