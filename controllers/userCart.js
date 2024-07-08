const UserCart = require("../models/userCart");

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await UserCart.findOne({ userId });
    if (!cart) {
      cart = new UserCart({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (existingProductIndex > -1) {
      cart.products[existingProductIndex].quantity += 1;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCartById = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log("Received userId:", userId); // Debug log

    const userCart = await UserCart.findOne({ userId }).populate(
      "products.productId"
    );
    if (!userCart) {
      console.log("Cart not found for userId:", userId); // Debug log
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(userCart);
  } catch (error) {
    console.error("Error fetching cart by userId:", error); // Debug log
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userCart = await UserCart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    userCart.products = userCart.products.filter(
      (product) => product.productId.toString() !== productId
    );

    await userCart.save();
    res.json(userCart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addToCart, getCartById, removeProductFromCart };
