// Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  filename: String,
  secure_url: String,
  public_id: String,
  timestamps: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subtitle' 
  }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
