import Movie from "../config/models/Movie.js";



// Controller function to get all movies
export async function getAllMovies(req, res) {
    try {
        const movies = await Movie.find().limit(37);

        if (!movies) return res.status(404).json({ message: "Movies not found" });

        res.status(200).json({movies});
    } catch (error) {
        console.error("Error in getAllMovies controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Controller function to search movies by title
export async function searchMovies(req, res) {
    try {
        const searchTerm = req.query.searchTerm;

        const searchRegex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive        

        const movies = await Movie.find({ title: { $regex: searchRegex } });

        if (!movies) return res.status(404).json({ message: "Movie not found" });

        res.status(200).json({movies});
    } catch (error) {
        console.error("Error in searchMovies controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller function to get movie by id
export async function getMovie(req, res) {
    try {
        const id = req.query.id;

        // const searchRegex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive        

        const movie = await Movie.findById(id);

        if (!movie) return res.status(404).json({ message: "Movie not found" });

        res.status(200).json({movie});
    } catch (error) {
        console.error("Error in searchMovies controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
