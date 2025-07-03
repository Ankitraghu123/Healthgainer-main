"use client";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        🔒 Privacy Policy
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Your privacy is important to us. This policy explains how we collect,
        use, and protect your information. 🛡️
      </p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Information We Collect</h2>
          <p>
            We collect personal information like name, email, and payment
            details when you make a purchase. We also collect data through
            cookies to improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">⚡ How We Use Your Information</h2>
          <p>
            Your data helps us process orders, provide customer support, and
            send promotional offers (if opted in). We do not sell your
            information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🛑 Data Protection & Security</h2>
          <p>
            We implement security measures to protect your personal data from
            unauthorized access, alteration, or loss.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🌍 Third-Party Services</h2>
          <p>
            We may use third-party payment gateways and analytics services that
            have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">📅 Changes to Privacy Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be
            posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">📞 Contact Us</h2>
          <p>
            If you have any questions about our privacy policy, feel free to
            contact us at <span className="font-semibold">support@example.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
