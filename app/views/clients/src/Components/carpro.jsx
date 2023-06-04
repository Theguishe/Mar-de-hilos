import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import img from "../assets/imgs/img1.jpg";
import img1 from "../assets/Azl.jpg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box } from "@mui/material";

function RatingStars({ rating }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

const Filtrers = () => {

  return (
    <Box className="relative left-0">

      {/* Filtro por categoria */}
      <div className="">
        <h3>Categories</h3>
      </div>

      {/* Filtro por precio */}
      <div>
        <h3>Price</h3>
      </div>

      {/* Filtro por fabricacion de productos */}
      <div>
        <h3>Product date</h3>
      </div>
    </Box>
  );
}

function Carpro(product) {
  const [productData, setProductData] = useState([]);
  const [productNewData, setProductNewData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/productCard")
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/newProduct")
      .then((response) => response.json())
      .then((data) => {
        setProductNewData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const sections = [
      {
        id: 1,
        title: "Products",
        products: productData.map((product) => ({
          id: product.id_producto,
          name: product.nombre,
          href: "#",
          imageSrc: img,
          imageAlt: "Front of men's Basic Tee in black.",
          price: `$${product.precio}`,
          color: product.descripcion,
          rating: product.valoracion,
        })),
        currentPage: 0, // Agrega la propiedad currentPage a cada sección
      },
      {
        id: 2,
        title: "Nuevo",
        products: productData.map((product) => ({
          id: product.id_producto,
          name: product.nombre,
          href: "#",
          imageSrc: img1,
          imageAlt: "Front of men's Basic Tee in black.",
          price: `$${product.precio}`,
          color: product.descripcion,
          rating: product.valoracion,
        })),
        currentPage: 0, // Agrega la propiedad currentPage a cada sección
      },
      // More sections...
    ];
    setSectionStates(sections);
  }, [productData, productNewData]);

  const [sectionStates, setSectionStates] = useState([]);

  const [productsPerPage, setProductsPerPage] = useState(2);

  const handlePrevPage = (sectionId) => {
    setSectionStates((prevSectionStates) => {
      return prevSectionStates.map((section) => {
        if (section.id === sectionId) {
          const newCurrentPage = section.currentPage - 1;
          return {
            ...section,
            currentPage: newCurrentPage >= 0 ? newCurrentPage : 0,
          };
        }
        return section;
      });
    });
  };

  const handleNextPage = (sectionId) => {
    setSectionStates((prevSectionStates) => {
      return prevSectionStates.map((section) => {
        if (section.id === sectionId) {
          const newCurrentPage = section.currentPage + 1;
          const totalPages = Math.ceil(
            section.products.length / productsPerPage
          );
          return {
            ...section,
            currentPage:
              newCurrentPage < totalPages
                ? newCurrentPage
                : section.currentPage,
          };
        }
        return section;
      });
    });
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setProductsPerPage(4);
    } else if (screenWidth >= 768) {
      setProductsPerPage(3);
    } else {
      setProductsPerPage(2);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const { id, nombre, imagen, descripcion, precio, valoracion } = product;

  return (
    <div className="bg-white">
      {sectionStates.map((section) => (
        <div
          key={section.id}
          className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
        >
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {section.title}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {section.products
              .slice(
                section.currentPage * productsPerPage,
                (section.currentPage + 1) * productsPerPage
              )
              .map((product) => (
                <Link to={`/Products/${product.id}`}>
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.price}
                      </p>
                    </div>
                    <div className="relative bottom-0 left-0 mt-8">
                      <RatingStars rating={product.rating} />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePrevPage(section.id)}
              disabled={section.currentPage === 0}
              className="px-3 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded disabled:bg-gray-400"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={() => handleNextPage(section.id)}
              disabled={
                section.currentPage ===
                Math.ceil(section.products.length / productsPerPage) - 1
              }
              className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded disabled:bg-gray-400"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Carpro;
