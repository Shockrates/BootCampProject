import express from "express";
import User from "../config/models/User.js";

const router = express.Router();

// router.post("/register", (req, res) => {
//   User.create(req.body)
//     .then(user1 => res.json(user1))
//     .catch(err => res.json(err));
// });

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {//if user exists
        if (user.password === String(password).trim()) {
          res.json("Success");
        }
        else {
          res.json("The password was incorrect")
        }
      }
      else {
        res.json("No record existed for this email")
      }

    }
    )
});

router.post("/register", (req, res) => {
  const { username, email, password, age } = req.body;

  // Έλεγχος όλων των πεδίων
  if (!username || !email || !password || !age) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Δημιουργία χρήστη
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});



// router.get("/:id", getNoteById);
// router.post("/", createNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

export default router; // ES Module export
