
const express = require('express');
const router = express.Router();
const upload  = require('../middleare/multer.js')
const { uploadVideo, getVideos, getbyId} = require('../controllers/videoController');

router.post('/', upload.single('video'), uploadVideo);
router.get('/',getVideos);
router.get('/:id', getbyId)

module.exports = router;
