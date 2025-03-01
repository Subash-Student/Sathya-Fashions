import {createSlice} from "@reduxjs/toolkit";

const sampleOrders = [
    {
        id: "1",
        name: "John Doe",
        phone: "9876543210",
        orderDate: "2025-02-15",
        deliveryDate: "2025-03-03",
        reminderDate: "2025-03-01",
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
      deliveryDate: "2025-03-28",
      reminderDate: "2025-03-01",
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
      deliveryDate: "2025-03-08",
      reminderDate: "2025-03-01",
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


const initialState = {
    orders:sampleOrders
}


const orderSlice = createSlice({
    name:"orders",
    initialState,
});



const paymentFilterSlice = createSlice({
    name:"paymentFilterOptions",
    initialState:{ filterOptions:{date: "", status: ""} },
    reducers:{
        setFilterOptions:(state,action)=>{
            state.filterOptions = action.payload;
        }
    }
})



export const { setFilterOptions } = paymentFilterSlice.actions;
export const orderReducer = orderSlice.reducer;
export const paymentFilterReducer = paymentFilterSlice.reducer





