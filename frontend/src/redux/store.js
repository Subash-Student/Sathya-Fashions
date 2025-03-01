import { configureStore } from "@reduxjs/toolkit";
import  { orderReducer,paymentFilterReducer } from "./orderSlice";

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    paymentFilterOptions:paymentFilterReducer
  },
});

export default store;
