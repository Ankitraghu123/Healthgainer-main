const {
  createOrder,
  verifyPayment,
} = require("../services/razorpayService.js");

exports.createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await createOrder({ amount });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.handlePaymentVerify = (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  const isValid = verifyPayment({ order_id, payment_id, signature });

  if (isValid) {
    res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};
