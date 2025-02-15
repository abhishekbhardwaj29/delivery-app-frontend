import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Pages/Login";
import DeliveryDashboard from "./components/Pages/DeliveryDashboard";
import Orders from "./components/Pages/Order";
import Register from "./components/Pages/Register";
import Menubar from "./components/menuBar/Menu";
import OrderForm from "./components/Pages/OrderForm";
import HistoryOrder from "./components/Pages/HistoryOrder";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Menubar />}>
          <Route path="/dashboard" element={<DeliveryDashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/historyOrder" element={<HistoryOrder />} />
          <Route path="/order-form" element={<OrderForm />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;