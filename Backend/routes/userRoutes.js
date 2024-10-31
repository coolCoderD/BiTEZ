import express from "express";
import {registerUser,loginUser, getUser} from "../controllers/userControllers.js"
import { authMiddleware } from "../middleware/auth.js";

const userRouter=express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get('/get',authMiddleware,getUser);
export default userRouter