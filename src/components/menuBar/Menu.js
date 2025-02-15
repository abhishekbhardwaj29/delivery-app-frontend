// src/components/Sidebar.js
import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const Menubar = () => {
    const location = useLocation();
    let Role = localStorage.getItem("Role");


    return (
        <div className="flex h-screen">
            <nav className="bg-blue-600 text-white w-64 p-4">
                <div className="text-xl font-bold mb-6"> Delivery Tracking</div>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/dashboard"
                            className={`flex items-center p-2 rounded-lg hover:bg-blue-700 ${location.pathname === "/dashboard" ? "bg-blue-800" : ""
                                }`}
                        >
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    {Role === "customer" && (
                        <li>
                            <Link
                                to="/orders"
                                className={`flex items-center p-2 rounded-lg hover:bg-blue-700 ${location.pathname === "/orders" ? "bg-blue-800" : ""
                                    }`}
                            >
                                <span>Orders</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            to="/historyOrder"
                            className={`flex items-center p-2 rounded-lg hover:bg-blue-700 ${location.pathname === "/historyOrder" ? "bg-blue-800" : ""
                                }`}
                        >
                            <span>Order History</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className={`flex items-center p-2 rounded-lg hover:bg-blue-700 ${location.pathname === "/" ? "bg-blue-800" : ""
                                }`}
                        >
                            <span onClick={() => { localStorage.clear() }}>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Menubar;