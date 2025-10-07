import Movie from "../config/models/Movie.js";   



// Controller function to get all movies
export async function getAllMovies (req,res) {
        try {
        const movies = await Movie.find().limit(36);

        if(!movies) return res.status(404).json({message:"Movie not found"});  
                
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error in getUser controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};


// Controller function to search movies by title
export async function searchMovies (req,res) {
    try{
        const searchTerm = req.query.searchTerm;

        const searchRegex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive        

        const movies = await Movie.find({ title: { $regex: searchRegex } }).limit(6);

        if(!movies) return res.status(404).json({message:"Movie not found"});

        res.status(200).json(movies);
    } catch (error) {
        console.error("Error in searchMovies controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};
