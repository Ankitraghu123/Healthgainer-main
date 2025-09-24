"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "@/redux/slices/contactSlice";
import { toast } from "react-toastify";
<<<<<<< HEAD
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaLinkedinIn, FaPinterestP,    } from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6"
import { SiPicsart } from "react-icons/si";
=======
import Link from "next/link";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
>>>>>>> completed

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

<<<<<<< HEAD
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
=======
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
>>>>>>> completed

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields!");
      return;
    }
<<<<<<< HEAD

=======
>>>>>>> completed
    try {
      await dispatch(createContact(formData)).unwrap();
      setSubmitted(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
<<<<<<< HEAD
    } catch (error) {
=======
    } catch {
>>>>>>> completed
      toast.error("Failed to send message. Try again!");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
<<<<<<< HEAD
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
              <li>
              <a href="/" className="hover:text-primary transition-colors">
              Home
              </a>
            </li>
          <li>
              <a href="/about" className="hover:text-primary transition-colors">
                About Us
              </a>
            </li>


            <li>
              <a href="/media" className="hover:text-primary transition-colors">
                Media & Reports
              </a>
            </li>
            <li>
              <a href="/product" className="hover:text-primary transition-colors">
               Product
              </a>
            </li>
            <li>
              <a href="/distributorform" className="hover:text-primary transition-colors">
               Get Distributorship
              </a>
            </li>
             <li>
              <a href="/contact" className="hover:text-primary transition-colors">
              Contact
              </a>
            </li>
          </ul>

     <div className="mt-6">
  <h4 className="text-xl font-semibold mb-3">Follow Us</h4>
  <div className="flex gap-3">
    <a
      href="https://www.facebook.com/ipharmasciences"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:animate-none animate-bounce p-2 rounded-full bg-blue-600 transition-colors"
      aria-label="Facebook"
    >
      <FaFacebook className="text-2xl text-white" />
    </a>

    <a
      href="https://www.instagram.com/pharmascienceayurveda/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:animate-none animate-bounce p-2 rounded-full bg-pink-600 transition-colors"
      aria-label="Instagram"
    >
      <FaInstagram className="text-2xl text-white" />
    </a>

    <a
      href="https://www.youtube.com/channel/UC8115BwcRUKPG7B2uQyriTQ"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:animate-none animate-bounce p-2 rounded-full bg-red-600 transition-colors"
      aria-label="YouTube"
    >
      <FaYoutube className="text-2xl text-white" />
    </a>

    <a
      href="https://x.com/Pharmascience_"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:animate-none animate-bounce p-2 rounded-full bg-blue-400 transition-colors"
      aria-label="Twitter"
    >
      <FaXTwitter className="text-2xl text-white" />
    </a>

    <a
      href="https://in.pinterest.com/pharma_science/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:animate-none animate-bounce p-2 rounded-full bg-pink-600 transition-colors"
      aria-label="Pinterest"
    >
      <FaPinterestP className="text-2xl text-white" />
    </a>

    <a
      href="https://in.linkedin.com/company/pharma-science"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:animate-none animate-bounce p-2 rounded-full bg-blue-700 transition-colors"
      aria-label="LinkedIn"
    >
      <FaLinkedinIn className="text-2xl text-white" />
    </a>
  </div>
</div>

=======
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-4">
        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/media" className="hover:text-primary transition-colors">
                Media & Reports
              </Link>
            </li>
            <li>
              <Link href="/product" className="hover:text-primary transition-colors">
                Product
              </Link>
            </li>
            <li>
              <Link
                href="/distributorform"
                className="hover:text-primary transition-colors"
              >
                Get Distributorship
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* Social Media */}
          <div className="mt-6">
            <h4 className="text-xl font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/ipharmasciences"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-blue-600 animate-bounce hover:animate-none"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/pharmascienceayurveda/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-pink-600 animate-bounce hover:animate-none"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://www.youtube.com/channel/UC8115BwcRUKPG7B2uQyriTQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 rounded-full bg-red-600 animate-bounce hover:animate-none"
              >
                <FaYoutube className="text-2xl" />
              </a>
              <a
                href="https://x.com/Pharmascience_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 rounded-full bg-blue-400 animate-bounce hover:animate-none"
              >
                <FaXTwitter className="text-2xl" />
              </a>
              <a
                href="https://in.pinterest.com/pharma_science/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="p-2 rounded-full bg-pink-600 animate-bounce hover:animate-none"
              >
                <FaPinterestP className="text-2xl" />
              </a>
              <a
                href="https://in.linkedin.com/company/pharma-science"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full bg-blue-700 animate-bounce hover:animate-none"
              >
                <FaLinkedinIn className="text-2xl" />
              </a>
            </div>
          </div>
>>>>>>> completed
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Contact Us</h3>
          <div className="space-y-2 text-sm text-gray-400">
<<<<<<< HEAD
            <p>Open Office Hours: - 10:00 AM   6:30 PM</p>
            <p className="mt-2 flex items-center gap-2">
              <span className="font-bold text-white">Phone: +9174006-74000 </span>
               <span className="font-bold text-white">95221-95222</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-white">Email:</span> teamhealthgainer@gmail.com
            </p>
          <p className="flex items-center gap-2">
  <span className="font-bold text-white">Address:</span>
<a
  href="https://www.google.com/maps/search/?api=1&query=Bhopal+M.P.+Nagar+Zone+2"
  target="_blank"
  rel="noopener noreferrer"
>
  
  <p> 5/11 Pharma Science The Indian Ayurveda </p>
</a>

</p>

=======
            <p>Open Office Hours: - 10:00 AM – 6:30 PM</p>
            <p className="mt-2">
              <span className="font-bold text-white">Phone:</span> +9174006-74000 /
              95221-95222
            </p>
            <p>
              <span className="font-bold text-white">Email:</span>{" "}
              teamhealthgainer@gmail.com
            </p>
            <p>
              <span className="font-bold text-white">Address:</span>{" "}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Pharmascience+Bhopal+M.P.+Nagar+Zone+2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                5/11 Pharmascience Amer complex, in front of PNB Bank, M.P. Nagar
                Zone 2, Bhopal
              </a>
            </p>
>>>>>>> completed
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Payment Methods</h3>
          <p className="text-sm text-gray-400 mb-4">
            We accept all major payment methods for your convenience.
          </p>
          <div className="flex flex-wrap gap-2">
<<<<<<< HEAD
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
=======
            {[
              { src: "payment-method-img-1.png", alt: "Mastercard" },
              { src: "payment-method-img-2.png", alt: "PayPal" },
              { src: "payment-method-img-3.png", alt: "Visa" },
              { src: "payment-method-img-4.png", alt: "American Express" },
            ].map((img, i) => (
              <img
                key={i}
                src={`https://themebuz.com/html/vigo/demo/vigo-red/img/${img.src}`}
                alt={img.alt}
                width={48}
                height={32}
                className="bg-white p-1 rounded object-contain"
              />
            ))}
>>>>>>> completed
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
<<<<<<< HEAD
              <p className="text-gray-400">We have received your message and will contact you soon.</p>
=======
              <p className="text-gray-400">
                We have received your message and will contact you soon.
              </p>
>>>>>>> completed
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
<<<<<<< HEAD
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Send Your Message</h3>
=======
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Send Your Message
            </h3>
>>>>>>> completed
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Your Name"
<<<<<<< HEAD
                  className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
=======
                  className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-1 focus:ring-primary"
>>>>>>> completed
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Your E-mail"
<<<<<<< HEAD
                  className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
=======
                  className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-1 focus:ring-primary"
>>>>>>> completed
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                placeholder="Your Message"
<<<<<<< HEAD
                className="p-2 h-24 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
=======
                className="p-2 h-24 bg-gray-800 border border-gray-700 rounded-md focus:ring-1 focus:ring-primary"
>>>>>>> completed
                onChange={handleChange}
                required
              />
              <button
                type="submit"
<<<<<<< HEAD
                className="bg-primary text-white py-2 rounded-md hover:bg-red-600 transition-colors font-medium"
=======
                className="bg-primary text-white py-2 rounded-md font-medium hover:bg-red-600 transition-colors"
>>>>>>> completed
              >
                Send Message
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
<<<<<<< HEAD
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
          <a href="/Shipping-Policy" className="hover:text-gray-300 transition-colors">
            Shipping Policy
          </a>
          <a href="/faq" className="hover:text-gray-300 transition-colors">
            FAQ
          </a>
         
        </div>
        <p>Copyright © {new Date().getFullYear()} Pharma Science The Indian Ayurveda</p>
      </div>
      

    </footer>
  );
}
=======
      <div className="max-w-6xl mx-auto mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="hover:text-gray-300 transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/cancellation-refund"
            className="hover:text-gray-300 transition-colors"
          >
            Cancellation & Refund Policy
          </Link>
          <Link
            href="/Shipping-Policy"
            className="hover:text-gray-300 transition-colors"
          >
            Shipping Policy
          </Link>
          <Link href="/faq" className="hover:text-gray-300 transition-colors">
            FAQ
          </Link>
        </div>
        <p>
          Copyright © {new Date().getFullYear()} YourCompany. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
>>>>>>> completed
