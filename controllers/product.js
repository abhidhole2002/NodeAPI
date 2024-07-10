const Product = require("../models/products");
const { uploadToCloudinary } = require("../utils/uploadImage");

const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const { filename } = req.file;

  try {
    const result = await uploadToCloudinary(req.file.path);
    const data = {
      name,
      description,
      price,
      category,
      stock,
      imageUrl: result.url,
    };

    const product = await Product.create(data);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

module.exports = { createProduct, getAllProducts };
