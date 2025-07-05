'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaTwitter,
  FaHome,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '@/redux/slices/cartSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {items} = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, user?._id]);


  const navLinks = [
    { label: 'Home', href: '/', icon: <FaHome className="text-green-500" /> },
    { label: 'Product', href: '/product' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Media & Reports', href: '/media' },
    { label: 'Get Distributorship', href: '/distributorform' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="w-full bg-black text-white font-sans shadow-md py-2">
      {/* 🔝 Top Row: Social Icons + Call */}
      <div className="flex justify-end items-center px-4 py-2">
        <div className="flex items-center space-x-3 text-xl">
          <FaFacebookF className="hover:text-green-500 cursor-pointer" />
          <FaPinterestP className="hover:text-green-500 cursor-pointer" />
          <FaInstagram className="hover:text-green-500 cursor-pointer" />
          <FaTwitter className="hover:text-green-500 cursor-pointer" />
          <span className="text-sm sm:text-xl">
            CALL US NOW: <strong>+917400674000</strong>
          </span>
        </div>
      </div>

      {/* 🔰 Middle Row: Logo + Line + Hamburger */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Link href="/">
            <img src="/logos.png" alt="Logo" className="h-10 md:h-28 w-auto" />
          </Link>
        </div>

        <div className="flex-grow h-px bg-white" />

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={26} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* 🔻 Desktop Nav */}
      <div className="px-4 pb-3 hidden md:flex items-center justify-start ms-40">
        <div className="flex text-lg flex-col md:flex-row md:items-center md:space-x-16 space-y-2 md:space-y-0">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-white font-semibold hover:text-green-500 transition-colors duration-200"
            >
              {link.icon && link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart and Login/User Info */}
        <div className="ml-6 flex items-center space-x-4">
          <div className="relative me-5 ms-5 bg-primary px-4 py-2 border-0 rounded-lg">
            <Link href="/cart">
              <FaShoppingCart
                size={24}
                className="text-white hover:text-green-500 cursor-pointer"
              />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
  {items.length}
</span>

            </Link>
          </div>
          {user ? (
            <div className="text-white ms-6 font-semibold capitalize">
              Hi, {user.firstName|| "User"}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white bg-primary px-4 py-2 border-0 rounded-lg ms-6 hover:text-green-500 transition-colors duration-200"
            >
              <FaUser size={22} />
            </Link>
          )}
        </div>
      </div>

      {/* 📱 Mobile Nav */}
      {isOpen && (
        <div className="px-4 py-3 md:hidden border-t border-white">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-white font-semibold hover:text-green-500 transition-colors duration-200"
              >
                {link.icon && link.icon}
                {link.label}
              </Link>
            ))}

            {/* Cart and Login/User Info (Mobile) */}
            <div className="flex items-center space-x-4 pt-2">
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <div className="relative bg-primary px-4 py-2 border-0 rounded-lg">
                  <FaShoppingCart
                    size={24}
                    className="text-white hover:text-green-500 cursor-pointer"
                  />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 ms-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </div>
              </Link>
              {user ? (
                <div className="text-white font-semibold ms-2">
                  Hi, {user.name?.split(" ")[0] || "User"}
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-white bg-primary hover:text-green-500 transition-colors duration-200 p-2 rounded-lg"
                >
                  <FaUser size={22} />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
