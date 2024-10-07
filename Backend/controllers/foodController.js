
import fs from 'fs';
import foodModel from '../models/foodModel.js';


// add food item
const addFood=async (req,res)=>{
    let image_filename=`${req.file.filename}`
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try{
        const newFood=await food.save();
        res.json({success:true,message:"Food Added"})
    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}

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
        fs.unlinkSync(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}