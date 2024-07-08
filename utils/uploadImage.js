const cloudinary = require("./cloudinary");
const User = require("../models/user");

const uploadImageToCloudinary = (req, res) => {
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    if (err) {
      return res.status(500).json({
        messgage: err,
      });
    }

    try {
      const { id } = req.params;
      const user = await User.findOne(id);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      if (user.profileImage) {
        return res.status(400).json({
          message: "User already has a profile image",
        });
      }

      user.profileImage = result.url;
      user = await user.save();
      res.json({
        message: "Image uploaded and profileImage added successfully",
        imageUrl: user.profileImage,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  });
};

module.exports = uploadImageToCloudinary;
