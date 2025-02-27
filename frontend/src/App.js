import React from 'react'
import {Routes, Route} from "react-router-dom"
import DashBoard from './pages/DashBoard'
import OrderDetailsPage from './pages/OrderDetailsPage'
import Orders from './pages/Orders'
import PaymentDetails from './pages/PaymentDetails'
import NewOrderPage from './pages/NewOrderPage'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DashBoard />}/>
      <Route path="/order/:id" element={<OrderDetailsPage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/newOrder" element={<NewOrderPage />} />
      <Route path="/paymentDetails" element={<PaymentDetails />} />
    </Routes>
  )
}

export default App