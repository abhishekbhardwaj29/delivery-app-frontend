import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
const navigate = useNavigate();
let userId = localStorage.getItem("Id")


useEffect(() => {
  const fetchOrders = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/customer/${userId}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
    });
    if(response.data.Ack === 1){
      setOrders(response.data.Data);
    }
  };
  fetchOrders();

  const socket = io(`${process.env.REACT_APP_API_URL}`); 

  socket.on("orderStatusUpdated", (data) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === data.orderId ? { ...order, status: data.status } : order
      )
    );
  });

  return () => socket.disconnect();
}, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <button
          onClick={() => navigate("/order-form")} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Order
        </button>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Product ID: {order.product}</p>
            <p className="text-gray-600">Quantity: {order.quantity}</p>
            <p className="text-gray-600">Location: {order.location}</p>
            <p className="text-gray-600">
              Status: <span className="font-semibold">{order.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;