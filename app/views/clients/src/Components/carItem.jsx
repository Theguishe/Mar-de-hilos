import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { sum } from "pdf-lib";

const carrito = [
  {
    id: 1,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
  },
  {
    id: 2,
    name: "Casual Shirt",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
    imageAlt: "Front of men's Casual Shirt in white.",
    price: "$45",
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
    imageAlt: "Front of men's Slim Fit Jeans in blue.",
    price: "$65",
  },
  {
    id: 4,
    name: "Sports Shoes",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
    imageAlt: "Front of men's Sports Shoes in black and gray.",
    price: "$80",
  },
  // Agrega más productos aquí...
];

const CarItem = () => {
  const [products, setProducts] = useState(carrito);
  const [cartData, setCartData] = useState([]);

  // Obtenemos los datos de la base para cargar la pagina de carrito
  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((response) => response.json())
      .then((data) => {
        setCartData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Funcion para crear el pdf general del carrito
  const generatePDF = async () => {
    try {
      const response = await fetch("http://localhost:5000/cartFactura");
      const data = await response.json();

      const subTotal = await fetch("http://localhost:5000/cartSubTotal");
      const subTotalData = await subTotal.json();

      //Crear un nuevo doc PDF
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.setTextColor("#000");
      doc.text("FACTURA", 15, 10);

      const mainHeader = (data) => {
        doc.setFontSize(8);
        doc.setTextColor(170, 170, 170);
        doc.text("Fecha de compra: " + new Date().toLocaleDateString(), 20, 20);

        const currentTime = new Date().toLocaleTimeString();
        doc.setTextColor("#444");
        doc.setFontSize(8);
        doc.text("Hora de compra: " + currentTime, 20, 25);

        // Footer
        const pageNumber = data.pageNumber;
        doc.setFontSize(12);
        doc.setTextColor("#444");
        doc.text("Página " + pageNumber, 100, 280);
      };

      //Definimos la posicion inicial de la tabla
      let y = 40;

      // Headers de la tabla
      const headers = [
        "Nombre del Producto",
        "Precio",
        "Descripcion",
        "Cantidad",
        ""
      ];

      const tableHeight = function (data) {
        return 100; // Ajusta la altura de la tabla según tus necesidades
      };

      // Crear la tabla con jsPDF-AutoTable
      doc.autoTable({
        head: [headers],
        body: data.map((row) => Object.values(row)),
        startY: y,
        didDrawPage: mainHeader,
        tableHeight: tableHeight(120),
        headStyles: {
          textColor: [255, 255, 255],
          fontSize: 12,
          fontStyle: "bold",
          textAlign: "center",
          fillColor: "#000",
          halign: 'center',
        },
        styles: { fontSize: 10 },
      });

      let subtotalNumber = subTotalData.map((row) => Object.values(row));
      doc.setFontSize(10);
      doc.text("Subtotal: $" + subtotalNumber, 150, 145);

      doc.setFontSize(10);
      doc.text("IVA: 13%", 150, 150);


      // Logica para obtener el total
      let iva = subtotalNumber * 0.13;
      const TOTAL_PRODUCTO = Number(subtotalNumber) + iva;
      doc.setFontSize(12);
      doc.text("Total: $" + TOTAL_PRODUCTO.toFixed(2), 150, 160);

      // Guardamos el pdf y lo mostramos en una pestaña nueva
      doc.save("factura.pdf");
    } catch (error) {
      console.log("Error al generar la factura", error);
    }
  };

  const incrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: (product.quantity || 0) + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max((product.quantity || 0) - 1, 0) }
          : product
      )
    );
  };

  return (
    <div className="bg-white rounded-md">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Carrito
        </h2>
        <div className="mt-6 grid gap-6">
          {cartData.map((item) => (
            <div
              key={item.ID}
              className="bg-white rounded-md overflow-hidden group opacity-90 hover:opacity-100 border border-gray-600"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex">
                  <img
                    src={item.img}
                    alt={item.imageAlt}
                    style={{
                      height: "200px",
                      width: "200px",
                      objectFit: "cover",
                      objectPosition: "center",
                      border: "1px solid #000",
                    }}
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.nombre_producto}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900">
                        <span>$</span>
                        {(
                          item.precio_producto * item.cantidad_producto
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex items-center justify-center flex-col mr-2">
                        <span className="text-sm text-gray-500">Cantidad</span>
                        <div className="flex items-center">
                          <button
                            className="rounded-full bg-gray-400 text-white w-8 h-8 flex items-center justify-center mr-2"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                          <span className="text-lg font-bold">
                            {item.cantidad_producto || 0}
                          </span>
                          <button
                            className="rounded-full bg-gray-400 text-white w-8 h-8 flex items-center justify-center ml-2"
                            onClick={() => decrementQuantity(item.id)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mr-8 mt-4 flex flex-col">
                  <button className="mt-4 text-sm font-medium text-white bg-green-500 rounded px-5 py-3">
                    Comprar ahora
                  </button>
                  <button className="mt-4 text-sm font-medium text-white bg-red-500 rounded px-5 py-3">
                    Eliminar del carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <div className="flex justify-end mr-16 mb-12">
          <button
            className="mt-4 text-md font-medium text-white bg-green-500 rounded px-20 py-5"
            onClick={generatePDF}
          >
            COMPRAR CARRITO
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CarItem;
