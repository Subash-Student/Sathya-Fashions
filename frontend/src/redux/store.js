import { configureStore } from "@reduxjs/toolkit";
import  { orderReducer,ordersFilterReducer,paymentFilterReducer } from "./orderSlice";
import { tokenReducer } from "./tokenSlice";
import loaderReducer from "./loaderSlice";


export const store = configureStore({
  reducer: {
    orders: orderReducer,
    paymentFilterOptions:paymentFilterReducer,
    token:tokenReducer,
    ordersFilterOptions:ordersFilterReducer,
    loader: loaderReducer,
  },
});

export default store;
