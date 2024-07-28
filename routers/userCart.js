const express = require("express");
const {
  addToCart,
  getCartById,
  deleteProductFromCart,
} = require("../controllers/userCart");

const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart/:userId", getCartById);
router.delete("/cart/remove", deleteProductFromCart);

module.exports = router;
