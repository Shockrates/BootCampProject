import express from "express";
import User from "../config/models/User.js";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

// router.get("/:id", getNoteById);
// router.post("/", createNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

export default router; // ES Module export
