import User from "../config/models/User.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function getUser (req,res) {
        try {
        const user = await User.findById(req.params.id).select("-password");//excluded password for safety reasons

        if(!user) return res.status(404).json({message:"User not found"});
        
        res.status(200).json({user});
    } catch (error) {
        console.error("Error in getUser controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export async function getProtectedData (req, res){
    res.status(200).json({message: 'Protected route accessed successfully!'});
};
