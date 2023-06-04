import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the database
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/pedidosC"); // Replace with your API endpoint
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="mt-24 flex flex-wrap justify-center">
        <div>
          <h1 className="text-3xl font-bold mb-6 w-full">My Orders</h1>
        </div>
        <div className="w-11/12">
          <table className="w-full border border-gray-300 mb-4">
            <thead className="bg-gray-400">
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 text-center">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-4 px-4 border-b">{order.ID}</td>
                  <td className="py-4 px-4 border-b">
                    <Link>{order.Image}</Link>
                  </td>
                  <td className="py-4 px-4 border-b">{order.Quantity}</td>
                  <td className="py-4 px-4 border-b">
                    ${order.Quantity * order.precio}
                  </td>
                  <td className="py-4 px-4 border-b">{order.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
