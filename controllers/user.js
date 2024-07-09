const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  hashedPassword,
  generateToken,
  comparePassword,
} = require("../services/auth");

const userPost = async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: `User already exists with email: ${email}` });
    }

    const hashedPassworde = await hashedPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassworde,
      address,
      phone,
    });

    const token = generateToken(newUser);
    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        phone: newUser.phone,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ errorrr: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({}, { password: 0, __v: 0 });
    res.json(allUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, { password: 0, __v: 0 });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ errorrr: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ msg: "Login successful", user: user._id });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { filename } = req.file;
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { profileImage: filename },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    console.log(filename);
    console.log(user);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

module.exports = {
  userPost,
  getAllUser,
  getUserById,
  deleteUserById,
  loginUser,
  uploadImage,
};
