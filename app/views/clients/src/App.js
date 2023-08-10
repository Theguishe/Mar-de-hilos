import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "./interface/home/home";
import Carrito from "./interface/carrito/carrito";
import Navbar from "./Components/navbar";
import Favorito from "./interface/favoritos";
import ProductPage from "./interface/product";
import CarlItem from "./Components/carItem";
import Footer from "./Components/footer";
import Login from "./interface/login_signup/login";
import CarItem from "./Components/carItem";
import SignUpPage from "./interface/login_signup/signup";
import OrdersPage from "./interface/orders/orders";

function App() {
  return (
    <div>
      <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<SignUpPage />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/Favoritos" element={<Favorito />} />
          <Route path="/Carrito" element={<CarItem />} />
          <Route path="/Products/:id" element={<ProductPage />} />
          <Route path="/Orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
