import { Input } from "@mui/material";
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [names, setNames] = useState("");
  const [lastnames, setLastNames] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dui, setDui] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");

  // To confirm the password
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const HandleSignUp = async (e) => {
    e.preventDefault();

    // We compare table fields with user's reponse
    const formData = {
        nombres: names,
        apellidos: lastnames,
        correo: email,
        contrasenia: password,
        dui: dui,
        direccion: address,
        telefono: phone,
        fecha_nacimiento: date,
      };

      if(password !== confirmPassword) {
        console.log("password doesn't match");
        return;
      }
  
      // Api to insert our Data using POST
      const res = await fetch("http://localhost:5000/Cclients", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
      console.log(data);

      navigate("/Login");

    // Validate form data (e.g., check if passwords match, email format is correct)

    // Send sign-up request to the server

    // Handle server response (e.g., show success message, redirect to login page)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={HandleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Names
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setNames(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastnames"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              LastNames
            </label>
            <input
              type="text"
              id="lastnames"
              onChange={(e) => setLastNames(e.target.value)}
              name="lastnames"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dui"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              DUI
            </label>
            <input
              type="text"
              id="dui"
              name="dui"
              onChange={(e) => setDui(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Address
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              BirthDate
            </label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/Login">
            <p className="text-blue-500 hover:text-blue-600">Log in</p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
