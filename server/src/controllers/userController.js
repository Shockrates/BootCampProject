import User from "../config/models/User.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function loginUser (req,res) {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.json({ message: 'Login successful', user: userWithoutPassword, token });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export async function registerUser (req,res) {
const { username, email, password, age } = req.body;

  try {
    if (!username || !email || !password || !age) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'User with that username already exists' });
    }

    const newUser = await User.create({ username, email, password , age});
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ err });
  }
}

export async function getUser (req,res) {
        try {
        const user = await User.findById(req.params.id).select("-password");//excluded password for safety reasons

        if(!user) return res.status(404).json({message:"User not found"});
        
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getUser controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};
