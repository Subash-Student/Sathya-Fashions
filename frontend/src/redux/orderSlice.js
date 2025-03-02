import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (token) => {
  const response = await axios.get("http://localhost:5000/order/orders",{
    headers:{token},
    withCredentials:true
  });
  return response.data.orders; 
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], 
    status: "idle", 
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; 
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; 
      });
  },
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





