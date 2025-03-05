import { configureStore } from "@reduxjs/toolkit";
import  { orderReducer,ordersFilterReducer,paymentFilterReducer } from "./orderSlice";
import { tokenReducer } from "./tokenSlice";


export const store = configureStore({
  reducer: {
    orders: orderReducer,
    paymentFilterOptions:paymentFilterReducer,
    token:tokenReducer,
    ordersFilterOptions:ordersFilterReducer
  },
});

export default store;
