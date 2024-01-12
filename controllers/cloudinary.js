const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

const cloudinaryURL = async (localFilePath) => {
    try {
        console.log(localFilePath);
        if (!localFilePath) return null;

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: 'video',
        });

        // Always attempt to delete the local file, even if the upload fails
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Handle the error and ensure the local file is deleted
        fs.unlinkSync(localFilePath);
        console.error(error);
        return null;
    }
};

const deleteCloudinaryUrl = async (publicId) => {
    await cloudinary.uploader.destroy(publicId);
};

module.exports = { cloudinaryURL, deleteCloudinaryUrl };
