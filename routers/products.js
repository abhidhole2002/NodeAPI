const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/product");
const upload = require("../multer/multer");
const router = express.Router();

router.post("/addproduct", upload.single("image"), createProduct);
router.get("/products", getAllProducts);

module.exports = router;
