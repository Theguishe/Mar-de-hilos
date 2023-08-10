import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Components/footer";
import { useParams } from "react-router-dom";
import img from "../../assets/imgs/img1.jpg";

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

  // To return the same product page ID
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/singleProduct/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("AAAAAAA", data);
        const productData = data.map((product) => ({
          id: product.id_producto,
          name: product.nombre,
          href: "#",
          imageSrc: img,
          imageAlt: "Front of men's Basic Tee in black.",
          price: `$${product.precio}`,
          quantity: product.cantidad,
          color: product.descripcion,
          rating: product.valoracion,
        }));
        setProductDetails(productData);
      })
      .catch((error) => {
        console.log("There exists an error: ", error);
      });
  }, [id]);

  
  const [sectionStates, setSectionStates] = useState([
    {
      id: 2,
      title: "Productos Recomendados",
      products: [], // Deja el arreglo de productos vacío
      currentPage: 0, // Agrega la propiedad currentPage a cada sección
    },
  ]);

  const [cartItems, setCartItems] = useState([]);

  // Obtener los datos del carrito del almacenamiento local al cargar la página
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Actualizar el almacenamiento local cuando se modifica el carrito
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (productId) => {
    setCartItems((prevCartItems) => [...prevCartItems, productId]);
  };

  const isItemInCart = (productId) => {
    return cartItems.includes(productId);
  };

  if (!productDetails) {
    return (
      <div className="text-red-600 text-2xl">
        404 <span className="text-black text-2xl">NOT FOUND</span>
      </div>
    );
  }

  const incrementQuantity = (id) => {
    setProductDetails((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: (product.quantity || 0) + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (id) => {
    setProductDetails((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max((product.quantity || 0) - 1, 0) }
          : product
      )
    );
  };

  return (
    <view>
      <view className="flex flex-wrap justify-center">
        <Box className="flex justify-center w-11/12 h-96 bg-transparent mt-24">
          {productDetails.map((product) => (
            <>
              <Box className="flex items-start basis-2/5 mr-8">
                <img
                  className="w-full h-72"
                  src={product.imageSrc}
                  alt={product.imageAlt}
                />
              </Box>
              <Box className="flex flex-col justify-between grow text-md basis-3/12">
                <h2 className="text-xl">{product.nombre}</h2>
                <Box
                  id="valoracion"
                  className="flex items-center justify-start"
                >
                  <Box className="flex items-center justify-start">
                    <div className="relative bottom-0 left-0 mt-8">
                      <RatingStars rating={product.valoracion} />
                    </div>
                  </Box>
                  <p>({product.quantity})</p>
                </Box>
                <p>
                  <span>$</span>
                  {product.precio}
                </p>
                <p className="text-black">
                  <span className="text-red-600">Envio: </span>
                  San Salvador
                </p>
                <Box className="flex">
                  <Box className="basis-1/4">
                    <p className="text-red-600">Cantidad:</p>
                  </Box>
                  <Box className="flex justify-center align-middle flex-grow-0">
                    <button
                      className="rounded-full bg-gray-400 text-white w-8 h-8 flex items-center justify-center mr-2"
                      onClick={() => decrementQuantity(product.id)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="text-lg font-bold mx-4">
                      {product.quantity || 0}
                    </span>
                    <button
                      className="rounded-full bg-gray-400 text-white w-8 h-8 flex items-center justify-center ml-2"
                      onClick={() => incrementQuantity(product.id)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </Box>
                </Box>
                <Box className="flex justify-around">
                  <button className="mt-4 text-sm font-medium text-white bg-orange-500 rounded px-3 py-2">
                    Comprar ahora
                  </button>
                  {!isItemInCart(product.id) && (
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="mt-4 text-sm font-medium text-white bg-blue-500 rounded px-3 py-2"
                    >
                      Agregar al carrito
                    </button>
                  )}
                  {isItemInCart(product.id) && (
                    <p className="mt-4 text-sm font-medium text-green-500">
                      Agregado al carrito
                    </p>
                  )}
                </Box>
                <Box>
                  <p>{product.descripcion}</p>
                </Box>
              </Box>
            </>
          ))}
        </Box>
        <Box className="flex flex-col justify-start w-11/12 box-content mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Resenias y Comentarios
          </h2>
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
          <Box className="w-screen">
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
      <Footer />
    </view>
  );
};

export default ProductPage;
