const Cart = require("../models/cartModel");
const Product = require("../models/Product");
const { v4: uuidv4 } = require("uuid");

// exports.addToCart = async (req, res) => {
//   try {
//     const { userId, productId, variantId, quantity } = req.body;

//     // Check if product exists
//     const product = await Product.findById(productId);
//     if (!product)
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });

//     // Find selected variant
//     const variant = product.variants.find(
//       (v) => v._id.toString() === variantId
//     );

//     // Calculate discounted price and subtotal
//     const price = variant.mrp - (variant.mrp * variant.discount) / 100;
//     const subtotal = price * quantity;

//     // Find user's cart
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     // Check if product is already in cart
//     const itemIndex = cart.items.findIndex(
//       (item) => item.variantId.toString() === variantId
//     );

//     if (itemIndex > -1) {
//       // If item exists, update quantity
//       cart.items[itemIndex].quantity += quantity;
//       cart.items[itemIndex].subtotal =
//         cart.items[itemIndex].price * cart.items[itemIndex].quantity;
//     } else {
//       // Add new item
//       cart.items.push({
//         productId,
//         variantId,
//         name: product.name,
//         weight: variant.weight,
//         price,
//         mrp: variant.mrp,
//         discount: variant.discount,
//         quantity,
//         subtotal,
//         images: variant.images,
//       });
//     }

//     await cart.save();
//     res
//       .status(200)
//       .json({ success: true, message: "Item added to cart", cart });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

exports.addToCart = async (req, res) => {
  try {
    let { userId, productId, variantId, quantity } = req.body;

    // Agar user login nahi hai to sessionId check karo
    let sessionId = req.cookies?.sessionId;
    if (!userId) {
      if (!sessionId) {
        sessionId = uuidv4();
        // Cookie set karo 7 din ke liye
        res.cookie("sessionId", sessionId, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
        });
      }
    }

    // Product dhoondo
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let variant = null;
    let price, subtotal;

    if (variantId) {
      variant = product.variants.find((v) => v._id.toString() === variantId);
      if (!variant) {
        return res
          .status(404)
          .json({ success: false, message: "Variant not found" });
      }
      price = variant.mrp - (variant.mrp * variant.discount) / 100;
      subtotal = price * quantity;
    } else {
      price = product.mrp - (product.mrp * product.discount) / 100;
      subtotal = price * quantity;
    }

    // Cart dhoondo userId ya sessionId ke basis pe
    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      cart = new Cart({
        userId: userId || null,
        sessionId: userId ? null : sessionId,
        items: [],
      });
    }

    // Check agar same product already hai cart me
    const itemIndex = cart.items.findIndex((item) => {
      if (variantId) {
        return item.variantId?.toString() === variantId;
      } else {
        return item.productId.toString() === productId && !item.variantId;
      }
    });

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].subtotal =
        cart.items[itemIndex].price * cart.items[itemIndex].quantity;
    } else {
      cart.items.push({
        productId,
        variantId: variantId || null,
        name: product.name,
        weight: variant ? variant.weight : product.weight,
        price,
        mrp: variant ? variant.mrp : product.mrp,
        discount: variant ? variant.discount : product.discount,
        quantity,
        subtotal,
        images: variant ? variant.images : product.images,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const id = req.id;
  const userId = id;
  try {
    const { variantId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    // Filter out the removed item
    cart.items = cart.items.filter(
      (item) => item.variantId.toString() !== variantId
    );

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  const id = req.id;
  const userId = id;
  try {
    const { variantId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.variantId.toString() === variantId
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });

    item.quantity = quantity;
    item.subtotal = item.price * quantity;

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.getCart = async (req, res) => {
  try {
    const id = req.id;
    const userId = id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
