import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });

    const line_items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.json({ success: false, message: "Error placing order. Please try again." });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const { success, orderId } = req.body;
    const order = await orderModel.findById(orderId);

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: "true",
      });
      res.json({ success: true, message: "Order paid successfully" }); 
    } else {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: "false",
      });
      res.json({ success: false, message: "Order cancelled successfully" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.json({ success: false, message: "Error verifying order. Please try again." });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.json({ success: false, message: "Error getting orders. Please try again." });
  }
};

export { placeOrder,verifyOrder,getOrders };
