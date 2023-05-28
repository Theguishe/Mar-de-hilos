import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";


const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
        rating: 4, // Rating from 1 to 5
    },
    {
        id: 2,
        name: 'Casual Shirt',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
        imageAlt: "Front of men's Casual Shirt in white.",
        price: '$45',
        color: 'White',
        rating: 1, // Rating from 1 to 5
    },
    {
        id: 3,
        name: 'Slim Fit Jeans',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
        imageAlt: "Front of men's Slim Fit Jeans in blue.",
        price: '$65',
        color: 'Blue',
        rating: 3, // Rating from 1 to 5
    },
    {
        id: 4,
        name: 'Sports Shoes',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
        imageAlt: "Front of men's Sports Shoes in black and gray.",
        price: '$80',
        color: 'Black/Gray',
    },
    // Agrega más productos aquí...
];
function RatingStars({ rating }) {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <div className="flex items-center">
            {stars.map((star) => (
                <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                />
            ))}
        </div>
    );
}

function Producto() {
    const [cartItems, setCartItems] = useState([]);

    // Obtener los datos del carrito del almacenamiento local al cargar la página
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    // Actualizar el almacenamiento local cuando se modifica el carrito
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (productId) => {
        setCartItems((prevCartItems) => [...prevCartItems, productId]);
    };

    const isItemInCart = (productId) => {
        return cartItems.includes(productId);
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
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
                                            <span aria-hidden="true" className="inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                            <RatingStars rating={product.rating} />
                            {!isItemInCart(product.id) && (
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    className="mt-4 text-sm font-medium text-white bg-blue-500 rounded px-3 py-2"
                                >
                                    Agregar al carrito
                                </button>
                            )}
                            {isItemInCart(product.id) && (
                                <p className="mt-4 text-sm font-medium text-green-500">Agregado al carrito</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Producto;