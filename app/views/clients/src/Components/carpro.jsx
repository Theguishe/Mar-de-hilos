import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import img from '../assets/imgs/img1.jpg';

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

function Carpro() {
  const [productData, setProductData] = useState([]);

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
        products: [
          {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc:
              "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
          },
          {
            id: 2,
            name: "Basic Tee",
            href: "#",
            imageSrc: "",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
          },
          {
            id: 3,
            name: "Basic Tee",
            href: "#",
            imageSrc:
              "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
          },
          {
            id: 4,
            name: "Basic Tee",
            href: "#",
            imageSrc: "",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
          },
          {
            id: 5,
            name: "Basic Tee",
            href: "#",
            imageSrc:
              "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
          },
          {
            id: 6,
            name: "Basic Tee",
            href: "#",
            imageSrc: "",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
          },
          // Products data...
        ],
        currentPage: 0, // Agrega la propiedad currentPage a cada sección
      },
      // More sections...
    ];
    setSectionStates(sections);
  }, [productData]);

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
