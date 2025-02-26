import React from "react";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCard";
import RecentOrders from "../components/RecentOrders";
import Reminders from "../components/Remainders";
import PaymentStatusChart from "../components/PaymentStatusChart";

const sampleOrders = [
    {
        id: "1",
        name: "John Doe",
        phone: "9876543210",
        orderDate: "2025-02-15",
        deliveryDate: "2025-02-28",
        dressPhoto: "/images/dress1.jpg",
        voiceNote: "/audio/voice1.mp3",
        modelBlouseGiven: true,
        paymentStatus: "Pending",
        withLining: true,
        amount: "1500",
        orderStatus: "Pending",
        reminderDays: 3,
      advanceAmount:500,

    },
    {
      name: "Priya",
      phone: "9123456789",
      orderDate: "2024-02-18",
      deliveryDate: "2025-02-28",
      paymentStatus: "Paid",
      orderStatus: "Completed",
      dressPhoto: "/images/dress1.jpg",
        voiceNote: "/audio/voice1.mp3",
      amount: 2500,
      withLining: false,
      modelBlouseGiven: true,
      advanceAmount:500,

    },
    {
      name: "Sneha",
      phone: "9988776655",
      orderDate: "2024-02-15",
      deliveryDate: "2024-02-28",
      paymentStatus: "Advance",
      dressPhoto: "/images/dress1.jpg",
      voiceNote: "/audio/voice1.mp3",
      orderStatus: "Pending",
      amount: 1800,
      advanceAmount:500,
      withLining: true,
      modelBlouseGiven: false,
    },
  ];


const DashBoard = () => {
  return (
    <>
      <Navbar />
      <SummaryCards totalOrders={120} pendingOrders={30} completedOrders={90} pendingAmount={15000} />
      <Reminders orders={sampleOrders} />
      <RecentOrders orders={sampleOrders}/>
     <PaymentStatusChart orders={sampleOrders}/>
    </>
  );
};

export default DashBoard;
