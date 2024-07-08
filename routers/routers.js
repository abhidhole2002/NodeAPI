const express = require("express");
const {
  userPost,
  getAllUser,
  getUserById,
  deleteUserById,
  loginUser,
  uploadImage,
} = require("../controllers/user");
const upload = require("../multer/multer");

const router = express.Router();

router.post("/user", userPost);
router.post("/login", loginUser);
router.get("/users", getAllUser);
router.get("/user/:id", getUserById);
router.delete("/user/:id", deleteUserById);
router.post("/uploadImage/:id", upload.single("profileImage"), uploadImage);

module.exports = router;
