import express from "express";
import User from "../config/models/User.js";

const router = express.Router();

// router.post("/register", (req, res) => {
//   User.create(req.body)
//     .then(user1 => res.json(user1))
//     .catch(err => res.json(err));
// });

router.post("/login", async (req, res) => {
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
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post("/register", async  (req, res) => {
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
    res.status(500).json({ message: 'Server error' });
  }
});

// router.get("/:id", getNoteById);
// router.post("/", createNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

export default router; // ES Module export
