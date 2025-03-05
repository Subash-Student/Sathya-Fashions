import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import NewOrderPage from "./pages/NewOrderPage";
import OrderListPage from "./pages/OrderListPage";
import PaymentDetailsPage from "./pages/PaymentDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProtectRoute from "./utils/ProtectRoute";
import { ToastContainer } from "react-toastify";
import LoginRoute from "./utils/LoginRoute";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={
       <LoginRoute> 
         <LoginPage />
       </LoginRoute>
       
      } />
        
        {/* Wrap protected routes inside ProtectRoute */}
        <Route element={<ProtectRoute />}>
          <Route path="/dashBoard" element={<DashBoard />} />
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="/newOrder" element={<NewOrderPage />} />
          <Route path="/paymentDetails" element={<PaymentDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
