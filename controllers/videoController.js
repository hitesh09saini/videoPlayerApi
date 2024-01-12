const Video = require('../models/Video');
const { cloudinaryURL} = require('./cloudinary');
const Subtitle  = require('../models/Subtitle')

const uploadVideo = async (req, res) => {
  try {
   
    const { filename } = req.body;
    console.log(filename+" "+req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      });
    }
  
    const result = await cloudinaryURL(req.file.path);
    
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Cloudinary Error"
      });
    }

    const subtitle = await Subtitle.create({});

    const video = await Video.create({
      filename,
      secure_url: result.secure_url,
      public_id: result.public_id,
      timestamps: subtitle._id
    });

    await video.save();
    console.log('success');

    res.json({ success: true, video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getVideos = async (req, res) => {
  try {
    const result = await Video.find();

    if (!result || result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Data does not exist in the Database"
      });
    }

    res.status(200).json({
      success: true,
      message: "All videos retrieved successfully!",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

const getbyId = async (req, res)=>{
  try {
    const{id} = req.params;
    const result = await Video.findById(id)
    if (!result || result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Data does not exist in the Database"
      });
    }

    res.status(200).json({
      success: true,
      message: "Video fetch successfully!",
      result,
    });
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = { uploadVideo, getVideos , getbyId};
