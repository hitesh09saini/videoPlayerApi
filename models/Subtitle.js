// Subtitle.js
const mongoose = require('mongoose');

const subtitleSchema = new mongoose.Schema({
  timestamps: [{
    time: String,
    text: String,
  },
  ],
});

const Subtitle = mongoose.model('Subtitle', subtitleSchema);

module.exports = Subtitle;
