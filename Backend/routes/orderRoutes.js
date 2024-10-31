import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { getOrders, placeOrder, verifyOrder } from '../controllers/orderController.js'

const orderRouter=express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userorders',authMiddleware,getOrders);
export default orderRouter
