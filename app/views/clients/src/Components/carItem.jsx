import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const carrito = [
    {
        id: 1,
        name: 'Basic Tee',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
    },
    {
        id: 2,
        name: 'Casual Shirt',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
        imageAlt: "Front of men's Casual Shirt in white.",
        price: '$45',
    },
    {
        id: 3,
        name: 'Slim Fit Jeans',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
        imageAlt: "Front of men's Slim Fit Jeans in blue.",
        price: '$65',
    },
    {
        id: 4,
        name: 'Sports Shoes',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
        imageAlt: "Front of men's Sports Shoes in black and gray.",
        price: '$80',
    },
    // Agrega más productos aquí...
];

const CarItem = () => {
    const [products, setProducts] = useState(carrito);

    const incrementQuantity = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, quantity: (product.quantity || 0) + 1 } : product
            )
        );
    };

    const decrementQuantity = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, quantity: Math.max((product.quantity || 0) - 1, 0) } : product
            )
        );
    };

    return (
        <div className="bg-white rounded-md">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Carrito</h2>
                <div className="mt-6 grid gap-6">
                    {products.map((item) => (
                        <div key={item.id} className="bg-white rounded-md overflow-hidden group hover:opacity-75 border border-gray-600">
                            <div className="flex flex-col sm:flex-row">
                                <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    style={{ height: '200px', width: '200px', objectFit: 'cover', objectPosition: 'center' }}
                                />
                                <div className="p-4 flex flex-col justify-between ">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                        <p className="text-2xl font-bold text-gray-900">{item.price}</p>
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
                                                <span className="text-lg font-bold">{item.quantity || 0}</span>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarItem;