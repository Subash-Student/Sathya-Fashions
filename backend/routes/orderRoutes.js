import express from "express";
import { deleteOrder, getOrder, getOrderDetails, newOrder, updatePaymentAndOrderStatus } from "../controller/orderController.js";
import authMiddleware from "../middleware/auth.js";




const orderRouter = express.Router();


orderRouter.post("/new-order",authMiddleware,newOrder);
orderRouter.get("/orders",authMiddleware,getOrder);
orderRouter.get("/order-details/:id",authMiddleware,getOrderDetails);
orderRouter.delete("/delete/:id",authMiddleware,deleteOrder);
orderRouter.post("/update-status",authMiddleware,updatePaymentAndOrderStatus);

export default orderRouter;