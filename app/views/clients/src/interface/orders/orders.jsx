import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the database
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders'); // Replace with your API endpoint
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-6">My Orders</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.product}</td>
              <td className="py-2 px-4 border-b">{order.quantity}</td>
              <td className="py-2 px-4 border-b">{order.total}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;