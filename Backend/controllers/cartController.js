import userModel from "../models/userModel.js";

//add items to user cart
const addToCart =async(req,res)=>{
    try {
        
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
//update the cart in database 
        await userModel.findByIdAndUpdate(req.body.userId ,{cartData});
        res.json({success:true,message:"Added to cart"})

    } catch (error) {
console.log(error);
res.json({success:false,message:"error"})
        
    }
}

//remove items from user cart 
const removeFromCart = async (req,res)=>{

    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
    
    
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"removed from cart "})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
   
}


// fetch user cart data 
const getCart = async (req, res) => {
    try {
      // Check if userId is provided
      if (!req.body.userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      // Find user by ID
      const userData = await userModel.findOne({ _id: req.body.userId });
  
      // Check if user exists
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Get cart data
      const cartData = userData.cartData;
      return res.json({ success: true, cartData });
    } catch (error) {
      console.error("Error fetching cart data:", error);
      return res.status(500).json({ success: false, message: "An error occurred while fetching cart data" });
    }
  };
  

export {addToCart,removeFromCart,getCart}