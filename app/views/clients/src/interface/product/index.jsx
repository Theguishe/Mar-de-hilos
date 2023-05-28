// import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Navbar from "../../Components/navbar";

const ProductPage = () => {
  const productData = {
    id: "",
    nombre: "",
    imagen: "",
    descripcion: "",
    precio: "",
    cantidad: "",
    cliente: null,
    tipo_producto: "",
    categoria: "",
  };

  return (
    <view>
      <Navbar />
      <view className="flex flex-wrap justify-center">
        <Box className="flex justify-center w-11/12 h-96 bg-transparent">
          <Box className="flex items-start basis-2/5 mr-8">
            <img
              className="w-full h-72"
              src="https://d22fxaf9t8d39k.cloudfront.net/1b1586d9c0ea6dd45ef6f4837ca222ebf2f1d79d968c51c3c4323a53a7335d08132190.jpeg"
              alt="img"
            />
          </Box>
          <Box className="flex flex-col justify-between grow text-sm basis-3/12">
            <h2 className="text-xl">Articulo de compra generico</h2>
            <Box id="valoracion" className="">
              <Box className="flex justify-start"></Box>
              <p>(500)</p>
            </Box>
            <p>
              <span>$</span>30.00
            </p>
            <p className="text-black">
              <span className="text-red-600">Envio: </span>Direccion de envio
              predeterminada por la empresa (San Salvador)
            </p>
            <Box className="flex">
              <Box className="basis-1/4">
                <p className="text-red-600">Cantidad:</p>
              </Box>
              <Box className="flex justify-center align-middle flex-grow-0">
                <button className="bg-gray-400 w-6 h-6 rounded-xl"></button>
                <p className="mx-4">1</p>
                <button className="bg-gray-400 w-6 h-6 rounded-xl"></button>
              </Box>
            </Box>
            <Box className="flex justify-around">
              <button className="bg-orange-500 w-40 h-8 text-white rounded-xl">
                Comprar ahora
              </button>
              <button className="bg-blue-500 w-40 h-8 text-white rounded-xl">
                Agregar al carrito
              </button>
            </Box>
            <Box>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
                accusamus voluptatem necessitatibus blanditiis, repellendus
                architecto aliquid obcaecati deleniti laborum ut, delectus
                nostrum sunt exercitationem id corporis porro maiores recusandae
                nihil!
              </p>
            </Box>
          </Box>
        </Box>
        <Box className="flex flex-col justify-start w-11/12 box-content mt-12">
          <h2 className="text-xl">Resenias y Comentarios</h2>
          <Box className="flex flex-col mt-8">
            <Box>
              <p>
                <strong>valoraciones</strong>
              </p>
            </Box>
            <Box className="flex">
              <Box className="basis-3/4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores voluptas doloribus, minima impedit dolorum tempora
                  voluptatem. Officia, accusamus aperiam voluptas exercitationem
                  rem praesentium neque vel aliquid a culpa sapiente ratione.
                </p>
              </Box>
              <Box className="basis-1/4">
                <img
                  className="w-24 h-24"
                  src="https://d22fxaf9t8d39k.cloudfront.net/1b1586d9c0ea6dd45ef6f4837ca222ebf2f1d79d968c51c3c4323a53a7335d08132190.jpeg"
                  alt="img"
                />
              </Box>
            </Box>
            <Box className="flex ">
              <Box className="w-6 h-6 bg-gray-400 rounded-full"></Box>
              <p className="mx-4">
                <a href="#">@username</a>
              </p>
              <p className="text-sm">dd/mm/yyyy</p>
            </Box>
          </Box>
        </Box>
        <Box className="flex justify-start w-11/12 box-content mt-12">
          <h2 className="text-xl">Productos Recomendados</h2>
        </Box>
      </view>
    </view>
  );
};

export default ProductPage;
