import express from "express";
import { deleteOrder, getOrder, getOrderDetails, newOrder, updatePaymentAndOrderStatus } from "../controller/orderController.js";
import authMiddleware from "../middleware/auth.js";
import multer from "multer"



const orderRouter = express.Router();


orderRouter.post("/new-order",multer().fields([
{name:"image",maxCount:1},
{name:"audio",maxCount:1}]
),authMiddleware,newOrder);
orderRouter.get("/orders",authMiddleware,getOrder);
orderRouter.get("/order-details/:id",authMiddleware,getOrderDetails);
orderRouter.delete("/delete/:id",authMiddleware,deleteOrder);
orderRouter.post("/update-status",multer().none(),authMiddleware,updatePaymentAndOrderStatus);

export default orderRouter;