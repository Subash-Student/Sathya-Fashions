import React from "react";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCard";
import {  useSelector } from "react-redux";
import RecentOrders from "../components/RecentOrders";
import Reminders from "../components/Remainders";
import PaymentStatusChart from "../components/PaymentStatusChart";


const DashBoard = () => {
  const orders = useSelector((state)=>state.orders.orders)
  return (
    <>
      <Navbar />
      <SummaryCards totalOrders={120} pendingOrders={30} completedOrders={90} pendingAmount={15000} />
      <Reminders orders={orders} />
      <RecentOrders orders={orders}/>
     <PaymentStatusChart orders={orders}/>
    </>
  );
};

export default DashBoard;
