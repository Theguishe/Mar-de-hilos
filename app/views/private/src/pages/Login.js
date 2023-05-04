import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import { useNavigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material/";
import Button from "@mui/material/Button";
import { tokens } from "../themes";

import "./style/login.css";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  tokens(theme.palette.mode);

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const users = [{ username: "EamP", password: "contra123" }];
  const handleSubmit = (e) => {
    e.preventDefault();
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      localStorage.setItem("autheticated", true);
      navigate("/dashboard");
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      className="container"
    >
      <Box className="login-title-container">
        <span className="login-title">Log in to Mar de hilos</span>
      </Box>
      <Box className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            className="input-user"
            id="filled-basic"
            label="Username"
            variant="filled"
            name="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            sx={{
              width: "100%",
              marginBottom: "40px",
              borderRadius: "5px",
              input: {
                fontSize: "15px",
                color: "#fff",
                borderBottom: "1px solid #fff",
                "&:focus": {
                  borderBottom: "1px solid #fff",
                  background: "#080b12",
                },
              },
              label: {
                color: "#fff",
                fontSize: "15px"
              },
            }}
          />
          <FormControl
            variant="filled"
            fullWidth
            sx={{
              width: "100%",
              marginBottom: "40px",
              borderRadius: "5px",
              fontSize: "15px",
              input: {
                color: "#fff",
                "&:focus": {
                  background: "#080b12",
                }
              },
              label: {
                color: "#fff",
                fontSize: "15px"
              },
            }}
          >
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              sx={{
                borderBottom: "1px solid #fff",
                "&:focus": {
                  borderBottom: "1px solid #fff",
                }
              }}
              name="Password"
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => setpassword(e.target.value)}
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              fullWidth
              sx={{
                height: "45px",
                marginTop: "5%",
                background: "#238636",
                color: "#fff",
              }}
            >
              LogIn
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
