const express = require("express");
const router = express.Router();
const {
  createPaymentOrder,
  handlePaymentVerify,
} = require("../controllers/paymentController");

const isAuthenticated = require("../middleware/authMiddleware");

// Allow order creation for logged-in users; verification can be public (signature verified)
router.post("/order", isAuthenticated, createPaymentOrder);
router.post("/verify", handlePaymentVerify);

module.exports = router;
