import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCard";
import {  useSelector,useDispatch } from "react-redux";
import RecentOrders from "../components/RecentOrders";
import Reminders from "../components/Remainders";
import PaymentStatusChart from "../components/PaymentStatusChart";
import { fetchOrders } from "../redux/orderSlice";



const DashBoard = () => {
  const orders = useSelector((state)=>state.orders.orders);
   const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();
 
  useEffect(()=>{
        dispatch(fetchOrders(token));
  },[])
 console.log(orders)


 const pendingOrder = orders.filter(order=>{
   return order.orderStatus === "Pending";
 })



 const reminderOrders = orders.filter(order=>{
   return new Date(order.reminderDate).toISOString().split('T')[0] == new Date().toISOString().split('T')[0];
 })


 const completedOrders = orders.filter(order=>{
   return order.orderStatus === "Completed";
 })


 const pendingAmount = orders.reduce((sum, order) => {
  if (order.paymentStatus === "Pending") {
    sum += order.totalAmount;
  } else if (order.paymentStatus == "Advance") {
    sum += (order.totalAmount - order.advanceAmount);
  }
  return sum;
}, 0); 


console.log(pendingAmount)

  return (
    <>
      <Navbar />
      <SummaryCards pendingOrders={pendingOrder.length} reminderOrders={reminderOrders.length} completedOrders={completedOrders.length} pendingAmount={pendingAmount} />
      <Reminders orders={orders} />
      <RecentOrders orders={orders}/>
     <PaymentStatusChart orders={orders}/>
    </>
  );
};

export default DashBoard;
