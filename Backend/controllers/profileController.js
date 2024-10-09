import express from 'express';
import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';

const likedFoodItems = async (req, res) => { 
    try {
        // Find the user by their ID from the request body
        let userData = await userModel.findOne({ _id: req.body.userId });

        // Check if the user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Extract the food item ID from the request body
        let foodId = req.body.itemId;

        // Check if the food item exists
        let foodExists = await foodModel.findOne({ _id: foodId });
        if (!foodExists) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        if (!userData.likedFood) {
            userData.likedFood = [];
        }

        // Update the liked food list
        if (userData.likedFood.includes(foodId)) {
            // If the item is already liked, remove it (unlike)
            userData.likedFood = userData.likedFood.filter(item => item !== foodId);
        } else {
            // If the item is not liked, add it to the list
            userData.likedFood.push(foodId);
        }

        // Save the updated user data
        await userData.save();

        // Respond with the updated liked food list
        res.json({ success: true, likedFood: userData.likedFood });
    } catch (error) {
        console.error("Error in likedFoodItems:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { likedFoodItems };
