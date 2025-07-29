import React from "react";
import axios from "axios";

const CheckoutButton = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // 1️⃣ Order create karo
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: 500, // Rupees me
      }
    );

    // 2️⃣ Razorpay options
    const options = {
      key: "rzp_test_WQVXFCfsMttRU1", // apna TEST key_id yahan daalna
      amount: data.amount,
      currency: data.currency,
      name: "Demo Store",
      description: "Test Payment",
      order_id: data.id, // Jo tumne backend se liya
      handler: async function (response) {
        // 3️⃣ Payment hone ke baad verify karo
        const verifyRes = await axios.post(
          "http://localhost:5000/api/payment/verify",
          {
            order_id: data.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }
        );

        console.log("Verify Response:", verifyRes.data);
        alert(verifyRes.data.message);
      },
      prefill: {
        name: "Sourabh Badgaiya",
        email: "sourabh@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <button
      onClick={handlePayment}
      className='bg-blue-600 text-white px-4 py-2 rounded'
    >
      Pay ₹500 Now
    </button>
  );
};

export default CheckoutButton;
