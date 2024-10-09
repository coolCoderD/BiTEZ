
import fs from 'fs';
import foodModel from '../models/foodModel.js';
import uploadImage from '../config/cloudinary.js';


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
        image: cldRes.url 
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
const removeFood=async (req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}