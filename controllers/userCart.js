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
    const userCart = await UserCart.findOne({ userId }).populate(
      "products.productId"
    );
    if (!userCart) {
      return res.status(404).json({
        message: "not cart",
      });
    }

    const simplifiedProducts = userCart.products.map((product) => {
      return {
        productId: product.productId._id,
        name: product.productId.name,
        description: product.productId.description,
        price: product.productId.price,
        category: product.productId.category,
        imageUrl: product.productId.imageUrl,
        createdAt: product.productId.createdAt,
        quantity: product.quantity,
      };
    });

    // Construct the response object
    const response = {
      _id: userCart._id,
      userId: userCart.userId,
      products: simplifiedProducts,
      createdAt: userCart.createdAt,
      __v: userCart.__v,
    };

    // res.json(userCart);
    res.json(response);
  } catch (error) {
    console.error("Error fetching cart by userId:", error); // Debug log
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const deleteProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userId and productId are required" });
    }

    const userCart = await UserCart.findOne({ userId: userId.toString() });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log(userCart);

    const updatedProducts = userCart.products.filter(
      (product) => product.productId._id.toString() !== productId.toString()
    );

    userCart.products = updatedProducts;
    await userCart.save();

    res.status(200).json({ message: "Product deleted successfully from cart" });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { addToCart, getCartById, deleteProductFromCart };
