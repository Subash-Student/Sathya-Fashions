import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import DashBoard from "./pages/DashBoard";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import NewOrderPage from "./pages/NewOrderPage";
import OrderListPage from "./pages/OrderListPage";
import PaymentDetailsPage from "./pages/PaymentDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProtectRoute from "./utils/ProtectRoute";
import LoginRoute from "./utils/LoginRoute";
import Loader from "./components/Loader"; // Import the Loader component
import ReminderOrdersPage from "./pages/ReminderOrdersPage";


const App = () => {
  return (
    <>
      <ToastContainer />
      <Loader />
      <Routes>
        {/* Login route should be protected if the user is already logged in */}
        <Route path="/" element={<LoginRoute><LoginPage /></LoginRoute>} />

        {/* Protected routes that require authentication */}
        <Route path="/dashBoard" element={<ProtectRoute><DashBoard /></ProtectRoute>} />
        <Route path="/order/:id" element={<ProtectRoute><OrderDetailsPage /></ProtectRoute>} />
        <Route path="/orders" element={<ProtectRoute><OrderListPage /></ProtectRoute>} />
        <Route path="/newOrder" element={<ProtectRoute><NewOrderPage /></ProtectRoute>} />
        <Route path="/newOrder/:id" element={<ProtectRoute><NewOrderPage /></ProtectRoute>} />
        <Route path="/paymentDetails" element={<ProtectRoute><PaymentDetailsPage /></ProtectRoute>} />
        <Route path="/reminderOrders" element={<ProtectRoute><ReminderOrdersPage /></ProtectRoute>} />
      </Routes>
    </>
  );
};

export default App;
