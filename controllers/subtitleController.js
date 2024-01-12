// subtitleController.js
const Subtitle = require('../models/Subtitle');

const addSubtitle = async (req, res) => {
  try {
    const { timestamps } = req.body;
    const { id } = req.params;
    if(!timestamps){
      return res.status(404).json({ success: false, message: 'Subtitle is required!' });
    }

    console.log('Subtitle ID:', id);
    const result = await Subtitle.findById(id);

    // Check if the subtitle with the specified ID exists
    if (!result) {
      return res.status(404).json({ success: false, message: 'Subtitle not found' });
    }
    if (!Array.isArray(timestamps)) {
      return res.status(400).json({ success: false, message: 'Invalid timestamps format' });
    }

    result.timestamps = [...result.timestamps, ...timestamps];

    // Save the updated document
    await result.save();

    // Send a success response with the updated result
    res.json({ success: true, result });
  } catch (error) {
    // Handle other potential errors
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


const getSubtitles = async (req, res) => {
  try {
    const { id } = req.params;
    const subtitles = await Subtitle.findById(id);
    
    if (!subtitles) {
      return res.status(404).json({ success: false, message: 'Subtitles not found' });
    }

    res.json({ success: true, subtitles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


module.exports = { addSubtitle, getSubtitles };
