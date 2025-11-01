import express from "express";
import User from "../config/models/User.js";
import Movie from "../config/models/Movie.js";
import WatchedMovie from "../config/models/WatchedMovie.js"
import { getUser, updateUser } from "../controllers/userController.js";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);

// router.put("/:id", updateMovies);


// router.get("/:id", getNoteById);
// router.post("/", createNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

//ROUTES FOR TESTING PURPOSES (TO BE DELETED OR BETTER IMPLEMENTED BY BACKEND, ¨οπως νομίζεται καλύτερα :) )
router.get("/usertest", async (req, res) => {
    try {
        const users = await Movie.find();
        if (!users) return res.status(404).json({ message: "User not found" });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
);

router.get("/reviewsTest", async (req, res) => {
    try {
        const watchedMovies = (await WatchedMovie.find()
            //TESTING CODE, MODIFY AS YOU SEE FIT
            .populate({ path: 'movieId', select: 'title poster_url genre' })
            .populate({ path: 'userId', select: 'username email age' })
            //END OF TESTING CODE
            .sort({ createdAt: -1 })); //-1 will sort in desc. order (newest first)
        res.status(200).json(watchedMovies);
    }
    catch (error) {
        console.error("Error in getAllWatchedMovies controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

// //END OF TESTING CODE


export default router; // ES Module export