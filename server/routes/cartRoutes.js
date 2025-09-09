const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const isAuthenticated = require("../middleware/authMiddleware");

// ✅ Get user's cart (guest or logged-in)
router.get("/", cartController.getCart);

// ✅ Add item to cart (guest or logged-in)
router.post("/add", cartController.addToCart);

// ✅ Remove item from cart (guest or logged-in)
router.post("/remove", cartController.removeFromCart);

// ✅ Update item quantity in cart (guest or logged-in)
router.post("/update", cartController.updateCartItemQuantity);

module.exports = router;
