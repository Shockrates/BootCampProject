import express from "express";
import User from "../config/models/User.js";
import Movie from "../config/models/Movie.js";
import { getUser} from "../controllers/userController.js";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user/:id", getUser);
// router.put("/:id", updateMovies);


// router.get("/:id", getNoteById);
// router.post("/", createNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

//ROUTES FOR TESTING PURPOSES (TO BE DELETED OR BETTER IMPLEMENTED BY BACKEND, ¨οπως νομίζεται καλύτερα :) )
router.get("/usertest", async(req,res) => {
        try {
            const users = await User.find().limit(36);

            if(!users) return res.status(404).json({message:"User not found"});
            
            res.status(200).json(users);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({message:"Internal server error"});
        }
    }
);

// //END OF TESTING CODE


export default router; // ES Module export