"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "@/redux/slices/contactSlice";
import { toast } from "react-toastify";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin,    } from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6"
import { SiPicsart } from "react-icons/si";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      await dispatch(createContact(formData)).unwrap();
      setSubmitted(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Try again!");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">About</h3>
          <ul className="space-y-2 text-sm text-gray-400">
          <li>
              <a href="/about-us" className="hover:text-primary transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-primary transition-colors">
                Deal of the Day
              </a>
            </li>

            <li>
              <a href="/media-awards" className="hover:text-primary transition-colors">
                Media & Awards
              </a>
            </li>
            <li>
              <a href="/certificates" className="hover:text-primary transition-colors">
                Certification
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-primary transition-colors">
                Lab Reports
              </a>
            </li>
          </ul>

          <div className="mt-6">
            <h4 className="text-xl font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="hover:animate-none animate-bounce p-2 rounded-full bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="#"
                className="hover:animate-none animate-bounce p-2 rounded-full bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="#"
                className="hover:animate-none animate-bounce p-2 rounded-full bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="text-2xl" />
              </a>
              <a
                href="#"
                className="hover:animate-none animate-bounce p-2 rounded-full bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter  className="text-2xl" />
              </a>
              <a
                href="#"
                className="hover:animate-none animate-bounce p-2 rounded-full bg-purple-500 transition-colors"
                aria-label="Picsart"
              >
                <SiPicsart className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Contact Us</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Open Office Hours: Mon - Fri: 9:00 - 6:00, Sunday: 9:00 - 4:00</p>
            <p className="mt-2 flex items-center gap-2">
              <span className="font-bold text-white">Phone: +9174006-74000 </span>
               <span className="font-bold text-white">95221-95222</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-white">Email:</span> teamhealthgainer@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-white">Address:</span> 5/11 Pharmascience Amer complex in front of PNB Bank M.P. Nagar zone 2 Bhopal
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Payment Methods</h3>
          <p className="text-sm text-gray-400 mb-4">
            We accept all major payment methods for your convenience.
          </p>
          <div className="flex flex-wrap gap-2">
            <img
              src="https://themebuz.com/html/vigo/demo/vigo-red/img/payment-method-img-1.png"
              alt="Mastercard"
              className="w-12 h-8 object-contain bg-white p-1 rounded"
            />
            <img
              src="https://themebuz.com/html/vigo/demo/vigo-red/img/payment-method-img-2.png"
              alt="PayPal"
              className="w-12 h-8 object-contain bg-white p-1 rounded"
            />
            <img
              src="https://themebuz.com/html/vigo/demo/vigo-red/img/payment-method-img-3.png"
              alt="Visa"
              className="w-12 h-8 object-contain bg-white p-1 rounded"
            />
            <img
              src="https://themebuz.com/html/vigo/demo/vigo-red/img/payment-method-img-4.png"
              alt="American Express"
              className="w-12 h-8 object-contain bg-white p-1 rounded"
            />
          </div>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="flex flex-col justify-center">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-primary mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
              <p className="text-gray-400">We have received your message and will contact you soon.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-primary hover:underline"
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Send Your Message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Your Name"
                  className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Your E-mail"
                  className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                placeholder="Your Message"
                className="p-2 h-24 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="bg-primary text-white py-2 rounded-md hover:bg-red-600 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <a href="/privacy-policy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms-and-conditions" className="hover:text-gray-300 transition-colors">
            Terms & Conditions
          </a>
          <a href="/cancellation-refund" className="hover:text-gray-300 transition-colors">
            Cancellation & Refund Policy
          </a>
          <a href="/shipping-policy" className="hover:text-gray-300 transition-colors">
            Shipping Policy
          </a>
          <a href="/faq" className="hover:text-gray-300 transition-colors">
            FAQ
          </a>
        </div>
        <p>Copyright © {new Date().getFullYear()} YourCompany. All Rights Reserved.</p>
      </div>
    </footer>
  );
}