const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const apiRoutes = require('./routes/api');

const app = express();
app.use(express.json());

// server running test
app.get('/',(req,res)=>{
    res.send(`<h1>Server Running Successfully</h1>`)
})


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Use API Routes
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
