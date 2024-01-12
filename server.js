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


app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming form data

app.use('/videos', videoRoutes);
app.use('/subtitles', subtitleRoutes);

app.use(cors({
  origin: clientURL,
}));

app.get('/', (req, res) => {
  res.json({ success: true, message: "Hello server is running!" });
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB is connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
