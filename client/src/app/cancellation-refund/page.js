"use client";

export default function CancellationRefundPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        🔄 Cancellation & Refund Policy
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Your satisfaction is our priority! If you are not happy with your purchase,  
        check out our cancellation and refund policies below. 💰
      </p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-2">❌ Order Cancellation</h2>
          <p>
            - You can cancel your order **within 24 hours** of placing it.  
            - Once the order is processed or shipped, it **cannot be canceled**.  
            - To cancel, contact us at <span className="font-semibold">support@example.com</span>.  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">📦 Return & Refund Policy</h2>
          <p>
            - We accept returns **within 7 days** of delivery if the product is unused and in original condition.  
            - Refunds are processed within **5-7 business days** after receiving the returned item.  
            - Shipping charges are **non-refundable**.  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🔍 Eligibility for Refund</h2>
          <p>
            - Product must be **unused, unopened, and in original packaging**.  
            - If the item is **damaged, defective, or incorrect**, we will replace or refund it.  
            - Proof of purchase (order receipt) is required for all refunds.  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🚚 Refund Process</h2>
          <p>
            - Send an email to <span className="font-semibold">support@example.com</span> with order details.  
            - We will provide return instructions and process your refund after verification.  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">📞 Contact Us</h2>
          <p>
            For any queries regarding cancellations or refunds,  
            contact our support team at <span className="font-semibold">support@example.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
