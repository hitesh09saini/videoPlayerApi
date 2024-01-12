// subtitleRoutes.js
const express = require('express');
const router = express.Router();
const { addSubtitle, getSubtitles } = require('../controllers/subtitleController');

router.get('/:id', getSubtitles)
router.put('/:id', addSubtitle)

module.exports = router;
