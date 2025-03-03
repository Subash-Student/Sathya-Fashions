import express from "express";
import { logIn } from "../controller/userController.js";





const userRouter = express.Router();


userRouter.post("/login",logIn);


export default userRouter;