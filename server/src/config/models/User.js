import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, hashed: true },
    age: { type: Number, required: true },
    watchedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
}, { timestamps: true });
    
// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

const movieSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true, unique: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    posterUrl: { type: String, required: true },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

export { Movie };
