const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const videoRoutes = require('./routes/videoRoutes');
const subtitleRoutes = require('./routes/subtitleRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const clientURL = process.env.CLIENT_URL;

console.log(clientURL);

// CORS middleware setup
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/videos', videoRoutes);
app.use('/subtitles', subtitleRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Hello, the server is running!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB is connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
