const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

//app.use('/api', authRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch((err) => console.error('MongoDB connection error:', err));
