// src/pages/Register.js
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("Submitting data:", data);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data);
            console.log("Response:", response);
            if (response.data.Ack === 1) {
                navigate("/");
            } else {
                alert(response.data.Message);
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Register User</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4>Name</h4>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                    />
                    {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

                    <h4>Email</h4>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

                    <h4>Password</h4>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                        className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                    />
                    {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

                    <h4>Role</h4>
                    <select
                        {...register("role", { required: "Role is required" })}
                        className="w-full p-2 mb-6 border border-gray-300 rounded-md"
                    >
                        <option value="customer">Customer</option>
                        <option value="delivery">Delivery</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm mb-4">{errors.role.message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Register User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;