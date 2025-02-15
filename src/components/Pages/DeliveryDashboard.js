import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const DeliveryDashboard = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/pending`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
      });
      if(response.data.Ack === 1){
        setPendingOrders(response.data.Data);
      }
    };
    fetchPendingOrders();

    const socket = io(`${process.env.REACT_APP_API_URL}`);

    socket.on("orderStatusUpdated", (data) => {
      setPendingOrders((prev) =>
        prev.map((order) =>
          order.id === data.id ? { ...order, status: data.status } : order
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/orders/${orderId}/status`, { status },{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
      });
  
      setPendingOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };
  


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Orders</h1>
      <div className="space-y-4">
        {pendingOrders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Product ID: {order.product}</p>
            <p className="text-gray-600">Quantity: {order.quantity}</p>
            <p className="text-gray-600">Location: {order.location}</p>
            <p className="text-gray-600">
              Status: <span className="font-semibold">{order.status}</span>
            </p>
            <div className="mt-4 space-x-2">
              {order.status === "Pending" && (
                <button
                  onClick={() => handleUpdateStatus(order.id, "Accepted")}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Accept Order
                </button>
              )}
              {order.status === "Accepted" && (
                <button
                  onClick={() => handleUpdateStatus(order.id, "Out for Delivery")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                 Out for Delivery
                </button>
              )}
              {order.status === "Out for Delivery" && (
                <button
                  onClick={() => handleUpdateStatus(order.id, "Delivered")}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                >
                  Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDashboard;