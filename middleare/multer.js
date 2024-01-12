const path = require('path');
const multer = require('multer');

const allowedFileTypes = [".jpg", ".jpeg", ".webp", ".png", ".mp4"];

const upload = multer({
    dest: "uploads/",
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (_req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    fileFilter: (_req, file, cb) => {
        let ext = path.extname(file.originalname);

        if (!allowedFileTypes.includes(ext)) {
            cb(new Error(`Unsupported file type! ${ext}`), false);
            return;
        }

        cb(null, true);
    },
});

module.exports = upload;
