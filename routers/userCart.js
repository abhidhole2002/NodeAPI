const express = require("express");
const { addToCart, getCartById } = require("../controllers/userCart");

const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart/:userId", getCartById);

module.exports = router;
