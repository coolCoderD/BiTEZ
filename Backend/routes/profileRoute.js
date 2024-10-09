import express from 'express'
import { authMiddleware } from '../middleware/auth.js';
import { likedFoodItems } from '../controllers/profileController.js';

const profileRouter=express.Router();

profileRouter.post("/liked",authMiddleware,likedFoodItems);
profileRouter.get("/",(req,res)=>{
    res.send("Profile")
})

export default profileRouter;

