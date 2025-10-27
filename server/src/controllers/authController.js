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
const { username, email, password, confirmPass, age } = req.body;

  try {
    if (!username || !email || !password || !confirmPass || !age) {           //added confirmation password field 
      return res.status(400).json({ message: 'All fields are required' });
    }

    //add in the req.body the acceptTerms 
    // if(!acceptTerms){ //added accept terms field 
    //   return res.status(400).json({ message: 'Need to accept terms' });
    // }
    
    if (password !== confirmPass) {
      return res.status(400).json({ message: 'Passwords do not match' });   //added confirmation password check
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
