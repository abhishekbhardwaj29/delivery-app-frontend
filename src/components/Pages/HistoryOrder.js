import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryOrder = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("Id"); 

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/history/${userId}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.data.Ack === 1){
            setOrders(response.data.Data);
        }
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };
    fetchOrderHistory();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
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

export default HistoryOrder;