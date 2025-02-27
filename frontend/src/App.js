import React from 'react'
import {Routes, Route} from "react-router-dom"
import DashBoard from './pages/DashBoard'
import OrderDetailsPage from './pages/OrderDetailsPage'
import PaymentDetails from './pages/PaymentDetailsPage'
import NewOrderPage from './pages/NewOrderPage'
import OrderListPage from './pages/OrderListPage'
import PaymentDetailsPage from './pages/PaymentDetailsPage'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DashBoard />}/>
      <Route path="/order/:id" element={<OrderDetailsPage />} />
      <Route path="/orders" element={<OrderListPage />} />
      <Route path="/newOrder" element={<NewOrderPage />} />
      <Route path="/paymentDetails" element={<PaymentDetailsPage />} />
    </Routes>
  )
}

export default App