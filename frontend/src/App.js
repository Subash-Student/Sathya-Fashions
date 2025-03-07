import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
          <Route path="/" element={
            <LoginRoute> 
              <LoginPage />
            </LoginRoute>
          } />
          
          <Route element={<ProtectRoute />}>
            <Route path="/dashBoard" element={<DashBoard />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
            <Route path="/orders" element={<OrderListPage />} />
            <Route path="/newOrder" element={<NewOrderPage />} />
            <Route path="/newOrder/:id" element={<NewOrderPage />} />
            <Route path="/paymentDetails" element={<PaymentDetailsPage />} />
            <Route path="/reminderOrders" element={<ReminderOrdersPage />} />
          </Route>
        </Routes>
      </>
  );
};

export default App;
