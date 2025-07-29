const express = require("express");
const {
  createPaymentOrder,
  handlePaymentVerify,
} = require("../controllers/paymentController.js");

const router = express.Router();

router.post("/create-order", createPaymentOrder);
router.post("/verify", handlePaymentVerify);

module.exports = router;
