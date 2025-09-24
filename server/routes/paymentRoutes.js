const express = require("express");
const router = express.Router();
const {
  createPaymentOrder,
  handlePaymentVerify,
} = require("../controllers/paymentController");

const isAuthenticated = require("../middleware/authMiddleware");

<<<<<<< HEAD
// Allow order creation for logged-in users; verification can be public (signature verified)
router.post("/order", isAuthenticated, createPaymentOrder);
router.post("/verify", handlePaymentVerify);
=======
router.post("/order", isAuthenticated, createPaymentOrder);
router.post("/verify", isAuthenticated, handlePaymentVerify);
>>>>>>> completed

module.exports = router;
