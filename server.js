const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const videoRoutes = require('./routes/videoRoutes');
const subtitleRoutes = require('./routes/subtitleRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: "Hello server is running!" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB is connected');
}).catch((err) => {
  console.log('Monngo Error: ' + err);
})

app.use('/videos', videoRoutes);
app.use('/subtitles', subtitleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
