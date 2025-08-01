"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createReq } from "@/redux/slices/reqCallbackSlice";

export default function CallbackForm() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 5000); // Show form after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;

    if (!name || !email || !phone) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    dispatch(createReq(formData))
      .unwrap()
      .then(() => {
        setSubmitted(true);
        toast.success("Your request has been submitted!");
        setFormData({ name: "", email: "", phone: "" });
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!showForm) return null;

  return (
    <motion.div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className='bg-black p-8 rounded-xl shadow-2xl w-full max-w-md relative text-white border border-gray-700'>
        {/* Close Button */}
        <button
          className='absolute top-3 right-3 text-gray-400 hover:text-white'
          onClick={() => setShowForm(false)}
        >
          <X className='w-6 h-6' />
        </button>

        {/* Form Heading */}
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Request a Callback 📲
        </h2>

        {/* Success Message */}
        {submitted ? (
          <p className='text-center text-green-400 font-semibold'>
            Thank you! We'll contact you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-5'>
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-3 bg-black text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition'
            />
            <input
              type='email'
              name='email'
              placeholder='Your Email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-3 bg-black text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition'
            />
            <input
              type='tel'
              name='phone'
              placeholder='Your Phone'
              value={formData.phone}
              onChange={handleChange}
              className='w-full p-3 bg-black text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition'
            />
            <button
              type='submit'
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-primary hover:bg-blue-700"
              } text-white`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
