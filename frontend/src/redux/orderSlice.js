import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { hideLoader, showLoader } from "./loaderSlice";


export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token, { dispatch, rejectWithValue }) => {
    try {
     
      const response = await axios.get("https://sathya-fashions-backend.vercel.app/order/orders", {
        headers: { token },
        withCredentials: true,
      });
      if(response.status === 200){
      
               
      }
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    } 
  }
);

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
    initialState:{ filterOptions:{date: "", status: "",sort:"Latest"} },
    reducers:{
        setFilterOptions:(state,action)=>{
            state.filterOptions = action.payload;
        }
    }
})
const ordersFilterSlice = createSlice({
    name:"ordersFilterOptions",
    initialState:{ filterOptions:{
      date: "",
      status: "",
      paymentStatus: "",
      sort: "Latest", 
    } },
    reducers:{
        setOrderFilterOptions:(state,action)=>{
            state.filterOptions = action.payload;
        }
    }
})


export const {setOrderFilterOptions} = ordersFilterSlice.actions;
export const { setFilterOptions } = paymentFilterSlice.actions;
export const orderReducer = orderSlice.reducer;
export const paymentFilterReducer = paymentFilterSlice.reducer
export const ordersFilterReducer = ordersFilterSlice.reducer;




