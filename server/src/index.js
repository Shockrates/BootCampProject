require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { connectDB } = require('./config/db');


const app = express();
//const port = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies


// Test route
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server with Express!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});