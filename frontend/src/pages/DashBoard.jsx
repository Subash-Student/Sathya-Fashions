import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCard";
import {  useSelector,useDispatch } from "react-redux";
import RecentOrders from "../components/RecentOrders";
import Reminders from "../components/Remainders";
import PaymentStatusChart from "../components/PaymentStatusChart";
import { fetchOrders, setFilterOptions, setOrderFilterOptions } from "../redux/orderSlice";
import { useMemo } from "react";
import {useNavigate} from "react-router-dom"


 const DashBoard = () => {
  const orders = useSelector((state)=>state.orders.orders);
   const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  } else if (order.paymentStatus === "Advance") {
    sum += (order.totalAmount - order.advanceAmount);
  }
  return sum;
}, 0); 



const recentOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.order_id) - new Date(a.order_id));
}, [orders]); 

 
const handleNavigation = (type,status)=>{
  if(type === "orders"){
     dispatch(setOrderFilterOptions({
      date: "",
      status: status,
      paymentStatus: "",
      sort: "", 
    }));
    navigate("/orders");
  }else{
    dispatch(setFilterOptions({date: "", status: status,sort:""}));
    navigate("/paymentDetails")
  }
}


  return (
    <>
      <Navbar />
      <SummaryCards handleNavigation={handleNavigation} pendingOrders={pendingOrder.length} reminderOrders={reminderOrders.length} completedOrders={completedOrders.length} pendingAmount={pendingAmount} />
      <Reminders orders={orders} />
      <RecentOrders orders={recentOrders}handleNavigation={handleNavigation}/>
     <PaymentStatusChart orders={orders} handleNavigation={handleNavigation}/>
    </>
  );
};

export default DashBoard;
