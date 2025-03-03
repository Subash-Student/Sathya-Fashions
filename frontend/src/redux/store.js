import { configureStore } from "@reduxjs/toolkit";
import  { orderReducer,paymentFilterReducer } from "./orderSlice";
import { tokenReducer } from "./tokenSlice";


export const store = configureStore({
  reducer: {
    orders: orderReducer,
    paymentFilterOptions:paymentFilterReducer,
    token:tokenReducer
  },
});

export default store;
