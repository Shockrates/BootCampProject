import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true, unique: true },
    runtime: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: String, required: true },
    genre: [{ type: String, required: true }],
    description: { type: String, required: true },
    poster_url: { type: String, required: true },
}, { timestamps: true });

movieSchema.virtual('avgRating', {
    ref: 'WatchedMovie',                 // Reference the WatchedMovie model
    localField: '_id',                   // _id of the Movie
    foreignField: 'movieId',             // Field in WatchedMovie that references the Movie
    justOne: false,                      
    options: {                     
    select: 'rating'
    }
});

// Enable virtuals in JSON output
movieSchema.set('toJSON', { virtuals: true });


const Movie = mongoose.model('Movie', movieSchema);

export default Movie ;
