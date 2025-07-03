"use client";

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        📜 Terms & Conditions
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Welcome to our website! Please read these terms carefully before using our services. ✅
      </p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-2">🛒 Use of Our Website</h2>
          <p>
            - By accessing our website, you agree to follow these terms. 🚀  
            - You must be at least 18 years old to make purchases. 🎂  
            - Any misuse of our website may lead to account suspension. 🚫  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">📦 Orders & Payments</h2>
          <p>
            - All prices are listed in [currency] and include applicable taxes. 💰  
            - Orders are confirmed only after full payment is received. 🏦  
            - We reserve the right to cancel any order due to stock unavailability. ❌  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🚚 Shipping & Delivery</h2>
          <p>
            - Orders are shipped within [X] business days. 📅  
            - We are not responsible for delays caused by courier services. 📦  
            - Ensure your delivery address is correct to avoid issues. 📍  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🔄 Returns & Refunds</h2>
          <p>
            - Products can be returned within [X] days of delivery. 🔄  
            - Items must be unused and in original packaging. 📦  
            - Refunds will be processed after inspection of the returned product. 💳  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🔒 Privacy & Security</h2>
          <p>
            - We respect your privacy and protect your data. 🔐  
            - Your payment details are encrypted and secure. ✅  
            - Read our <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a> for more details. 📜  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">⚖️ Legal Disclaimer</h2>
          <p>
            - We are not responsible for any misuse of our products. ❗  
            - Consult a doctor before using any supplements. 🏋️‍♂️  
            - Any disputes will be resolved as per [Your Country] laws. ⚖️  
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">📞 Contact Us</h2>
          <p>
            If you have any questions about these terms, reach out to us at  
            <span className="font-semibold"> support@example.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
