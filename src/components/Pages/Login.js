// src/pages/Login.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("loginData :", data)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data);
            if (response.data.Ack === 1) {
                localStorage.setItem("token", response.data.Data.token);
                localStorage.setItem("Id", response.data.Data.user.Id)
                localStorage.setItem("Role", response.data.Data.user.Role)

                if (response.data.Data.user.Role === "customer") {
                    navigate("/orders");
                } else {
                    navigate("/dashboard");
                }
            } else {
                alert("Login failed. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "Invalid credentials");
            } else {
                alert("Network error. Please try again later.");
            }
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4>Email</h4>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>}

                    <h4>Password</h4>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                        className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                    />
                    {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <div className="flex items-center justify-center mt-3">
                    <Link to="/Register" className="text-blue-500">
                        Register User
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;