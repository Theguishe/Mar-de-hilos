import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Navbar from "../../Components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const sections = [
  {
    id: 1,
    title: "Productos Recomendados",
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
        rating: 4, // Rating from 1 to 5
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
];

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

  const [sectionStates, setSectionStates] = useState(sections);
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
    <view>
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
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Resenias y Comentarios</h2>
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
                <a href="index">@username</a>
              </p>
              <p className="text-sm">dd/mm/yyyy</p>
            </Box>
          </Box>
        </Box>
        <Box className="flex justify-center w-full box-content mt-12">
          <Box className='w-screen'>
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
                        <RatingStars rating={product.rating} />
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
          </Box>
        </Box>
      </view>
    </view>
  );
};

export default ProductPage;
