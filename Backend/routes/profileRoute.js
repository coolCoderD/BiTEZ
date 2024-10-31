import express from 'express'
import { authMiddleware } from '../middleware/auth.js';
import { addToLikedFood, getLikedFoods } from '../controllers/profileController.js';

const profileRouter=express.Router();

profileRouter.post("/liked",authMiddleware,addToLikedFood);
profileRouter.get("/getLiked",authMiddleware,getLikedFoods);

export default profileRouter;

