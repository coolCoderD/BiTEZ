import express from 'express';
import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';

// const likedFoodItems = async (req, res) => { 
//     try {
//         // Find the user by their ID from the request body
//         let userData = await userModel.findOne({ _id: req.body.userId });

//         // Check if the user exists
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Extract the food item ID from the request body
//         let foodId = req.body.itemId;

//         // Check if the food item exists
//         let foodExists = await foodModel.findOne({ _id: foodId });
//         if (!foodExists) {
//             return res.status(404).json({ success: false, message: "Item not found" });
//         }

//         if (!userData.likedFood) {
//             userData.likedFood = [];
//         }

//         // Update the liked food list
//         if (userData.likedFood.includes(foodId)) {
//             // If the item is already liked, remove it (unlike)
//             userData.likedFood = userData.likedFood.filter(item => item !== foodId);
//         } else {
//             // If the item is not liked, add it to the list
//             userData.likedFood.push(foodId);
//         }

//         // Save the updated user data
//         await userData.save();

//         // Respond with the updated liked food list
//         res.json({ success: true, likedFood: userData.likedFood });
//     } catch (error) {
//         console.error("Error in likedFoodItems:", error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

const addToLikedFood = async (req, res) => {
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

        // Initialize likedFoods array if it doesn't exist
        if (!userData.likedFoods) {
            userData.likedFoods = [];
        }

        // Add the food item to the likedFoods array only if it's not already present
        if (!userData.likedFoods.includes(foodId)) {
            userData.likedFoods.push(foodId);

            // Save the updated user document
            await userData.save(); // Save the updated user document to the database

            return res.json({ success: true, message: "Item added to liked foods", likedFoods: userData.likedFoods });
        }

        // If the food is already in the liked list, return a message
        else{
            userData.likedFoods = userData.likedFoods.filter(item => item.toString() !== foodId.toString());
            await userData.save();
            return res.json({ success: true, message: "Item removed from liked food", likedFoods: userData.likedFoods });
        }
    } catch (error) {
        console.error("Error in addToLikedFood:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};




const getLikedFoods = async (req, res) => {
    try {
      // Check if userId is provided
      if (!req.body.userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      // Find user by ID
      const user = await userModel.findOne({ _id: req.body.userId });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Get liked foods
      const likedFoods = user.likedFoods;
      return res.json({ success: true, likedFoods });
    } catch (error) {
      console.error("Error fetching liked foods:", error);
      return res.status(500).json({ success: false, message: "An error occurred while fetching liked foods" });
    }
  };
  

export { addToLikedFood,getLikedFoods };
