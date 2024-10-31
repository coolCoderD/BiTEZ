
import fs from 'fs';
import foodModel from '../models/foodModel.js';
import cloudinaryService from '../config/cloudinary.js';

const { uploadImage, deleteImage } = cloudinaryService;



// add food item
const addFood = async (req, res) => {
    try {
      // Convert the file buffer to base64
      if (!req.file) {
        throw new Error("No file uploaded or incorrect field name.");
        
      }
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  
      const cldRes = await uploadImage(dataURI);
  
  
      const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: cldRes.url ,
        publicId: cldRes.public_id,
      });
  
      const newFood = await food.save();

      res.json({ success: true, message: "Food Added", food: newFood });
  
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error", error: err.message });
    }
  };
  

//all food list
const listFood=async (req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json(foods);
    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    
    }

}

//remove food item
const removeFood = async (req, res) => {
  try {
    // Find the food item by ID
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Delete the image from Cloudinary using the stored public_id
    if (food.publicId) {
      await deleteImage(food.publicId);
    }

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error removing food item and image" });
  }
};


export {addFood,listFood,removeFood}