import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { memoryStorage } from "multer";

// Token creation function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.json({
                success: false,
                message: "Password must contain at least 8 characters, including an uppercase letter, a number, and a symbol."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const getUser= async (req,res)=>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        res.json({success:true,userData})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
    
    }
export { loginUser, registerUser,getUser };
