const Cart = require("../models/cartModel");
const Product = require("../models/Product");
<<<<<<< HEAD

// exports.addToCart = async (req, res) => {
//   const id = req.id;
//   const userId = id;
//   console.log(userId, "userId");

//   try {
//     const { productId, variantId, quantity } = req.body;
=======
const { v4: uuidv4 } = require("uuid");

// exports.addToCart = async (req, res) => {
//   try {
//     const { userId, productId, variantId, quantity } = req.body;
>>>>>>> completed

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
<<<<<<< HEAD
//     if (!variant)
//       return res
//         .status(404)
//         .json({ success: false, message: "Variant not found" });
=======
>>>>>>> completed

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
<<<<<<< HEAD
  // Support guest carts via sessionId cookie; authenticated via req.id
  const userId = String(req.id || req.sessionId);
  try {
    const { productId, variantId, quantity } = req.body;

    // Check if product exists
=======
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
>>>>>>> completed
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

<<<<<<< HEAD
    let price, mrp, discount, weight, images;

    if (variantId) {
      // Variant diya gaya hai
      const variant = product.variants.find(
        (v) => v._id.toString() === variantId
      );

=======
    let variant = null;
    let price, subtotal;

    if (variantId) {
      variant = product.variants.find((v) => v._id.toString() === variantId);
>>>>>>> completed
      if (!variant) {
        return res
          .status(404)
          .json({ success: false, message: "Variant not found" });
      }
<<<<<<< HEAD

      price = variant.mrp - (variant.mrp * variant.discount) / 100;
      mrp = variant.mrp;
      discount = variant.discount;
      weight = variant.weight;
      images = variant.images;
    } else {
      // Variant optional hai → base product use karo
      price = product.mrp - (product.mrp * product.discount) / 100;
      mrp = product.mrp;
      discount = product.discount || 0;
      weight = product.weight || null;
      images = product.images || [];
    }

    const subtotal = price * quantity;

    // Find user's cart
    let cart = await Cart.findOne({ userId: String(userId) });
    if (!cart) {
      cart = new Cart({ userId: String(userId), items: [] });
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        ((!variantId && !item.variantId) ||
          (variantId && item.variantId?.toString() === variantId))
    );

    if (itemIndex > -1) {
      // Update quantity if already exists
=======
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
>>>>>>> completed
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].subtotal =
        cart.items[itemIndex].price * cart.items[itemIndex].quantity;
    } else {
<<<<<<< HEAD
      // Add new item
      cart.items.push({
        productId,
        variantId: variantId || null, // optional rakha
        name: product.name,
        weight,
        price,
        mrp,
        discount,
        quantity,
        subtotal,
        images,
=======
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
>>>>>>> completed
      });
    }

    await cart.save();
<<<<<<< HEAD
    res
      .status(200)
      .json({ success: true, message: "Item added to cart", cart });
=======

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
>>>>>>> completed
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

<<<<<<< HEAD
// exports.removeFromCart = async (req, res) => {
//   const id = req.id;
//   const userId = id;
//   try {
//     const { variantId } = req.body;

//     let cart = await Cart.findOne({ userId });
//     if (!cart)
//       return res
//         .status(404)
//         .json({ success: false, message: "Cart not found" });

//     // Filter out the removed item
//     cart.items = cart.items.filter(
//       (item) => item.variantId.toString() !== variantId
//     );

//     await cart.save();
//     res
//       .status(200)
//       .json({ success: true, message: "Item removed from cart", cart });
//   } catch (error) {
//     console.error("Error removing from cart:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// exports.updateCartItemQuantity = async (req, res) => {
//   const id = req.id;
//   const userId = id;
//   try {
//     const { variantId, quantity } = req.body;

//     let cart = await Cart.findOne({ userId });
//     if (!cart)
//       return res
//         .status(404)
//         .json({ success: false, message: "Cart not found" });

//     const item = cart.items.find(
//       (item) => item.variantId.toString() === variantId
//     );
//     if (!item)
//       return res
//         .status(404)
//         .json({ success: false, message: "Item not found in cart" });

//     item.quantity = quantity;
//     item.subtotal = item.price * quantity;

//     await cart.save();
//     res
//       .status(200)
//       .json({ success: true, message: "Cart updated successfully", cart });
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

exports.removeFromCart = async (req, res) => {
  const userId = String(req.id || req.sessionId); // allow guest carts
  try {
    const { itemId } = req.body;

    let cart = await Cart.findOne({ userId: String(userId) });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // ✅ Remove specific item by its unique _id (itemId)
    const itemExists = cart.items.some(
      (item) => item._id.toString() === itemId
    );

    if (!itemExists) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    // Recalculate totals
    cart.totalItems = cart.items.length;
    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
=======
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
>>>>>>> completed
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
<<<<<<< HEAD
  const userId = String(req.id || req.sessionId); // allow guest carts
  const { itemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: String(userId) });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // find item by itemId
    const item = cart.items.id(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    // quantity update
    item.quantity = quantity;
    item.subtotal = item.price * quantity;

    // cart totals update
    cart.totalAmount = cart.items.reduce((acc, i) => acc + i.subtotal, 0);
    cart.totalItems = cart.items.length;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
=======
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
>>>>>>> completed
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
<<<<<<< HEAD

exports.getCart = async (req, res) => {
  try {
    const id = String(req.id || req.sessionId);
    const userId = id;
    const cart = await Cart.findOne({ userId: String(userId) }).populate("items.productId");
=======
exports.getCart = async (req, res) => {
  try {
    const id = req.id;
    const userId = id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
>>>>>>> completed

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
