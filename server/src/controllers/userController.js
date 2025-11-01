import User from "../config/models/User.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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


export async function updateUser (req,res) {
    try {

        // Extract user ID from params and updated data from body
        const { id } = req.params;
        const { username, email, subscription, password, oldPassword } = req.body;

        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Find user by id
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message:"User not found"});

        // Update username if provided
        if(username) user.username = username;

        // Update email if provided and not already taken
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
            user.email = email;
        }
            
        // Update password if provided
        if(password) {
            if (!oldPassword) { // Ensure old password is provided
                return res.status(400).json({ message: "Old password is required to set a new password" });
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(403).json({ message: "Old password is incorrect" });
            }
            // Hash new password & update
            const salt = await bcrypt.genSalt(10);
            user.password =  await bcrypt.hash(password, salt);
        }

        // Update subscription if provided and valid
        if (subscription && ["free","gold", "platinum"].includes(subscription)){
            user.subscription = subscription;

            // Update subscription expiration date
            if (subscription === "free"){
                user.subExpiresAt = null;
            }else {
                const durationDays = 30;
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + durationDays);
                user.subExpiresAt=expirationDate;
            }
        }

        // Save updated user
        await user.save();

        const { password: _, ...userWithoutPass } = user.toObject(); // Exclude password from response
        
        res.status(200).json({message:"User updated successfully", user: userWithoutPass});
    }
    catch (error) {
        console.error("Error in updateUser controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function getProtectedData (req, res){
    res.status(200).json({message: 'Protected route accessed successfully!'});
};
