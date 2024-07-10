const cloudinary = require("./cloudinary");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {  uploadToCloudinary };
