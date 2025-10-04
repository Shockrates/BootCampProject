import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

//an kanei request sto parakatw anoigei to notesRoutes kai xtypaei ekeines tis routes
app.use("/", userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server with Express!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});