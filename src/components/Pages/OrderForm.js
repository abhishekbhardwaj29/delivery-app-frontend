// src/pages/OrderForm.js
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let userId = localStorage.getItem('Id')
    let Data = {
        ...data,
        customerId : userId
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, Data,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      if(response.data.Ack === 1){
          navigate("/orders");
      }else{
        alert(response.data.Message);
      }
     
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Place an Order</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Product ID</label>
            <input
              type="text"
              {...register("product", { required: "Product is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.productId && <span className="text-red-500 text-sm">{errors.productId.message}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: "Quantity is required", min: 1 })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity.message}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Delivery Location</label>
            <input
              type="text"
              {...register("location", { required: "Delivery Location is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;