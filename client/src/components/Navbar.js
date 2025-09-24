'use client';

<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> completed
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
<<<<<<< HEAD
  const { user } = useSelector((state) => state.auth);
  const {items} = useSelector((state) => state.cart);
  const dispatch = useDispatch()
=======
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

>>>>>>> completed
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, user?._id]);

<<<<<<< HEAD

=======
>>>>>>> completed
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
<<<<<<< HEAD
  <div className="flex items-center space-x-3 text-xl">
    <a
      href="https://www.facebook.com/ipharmasciences"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
    >
      <FaFacebookF className="hover:text-green-500 cursor-pointer" />
    </a>

    <a
      href="https://in.pinterest.com/pharma_science/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pinterest"
    >
      <FaPinterestP className="hover:text-green-500 cursor-pointer" />
    </a>

    <a
      href="https://www.instagram.com/pharmascienceayurveda/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <FaInstagram className="hover:text-green-500 cursor-pointer" />
    </a>

    <a
      href="https://x.com/Pharmascience_"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
    >
      <FaTwitter className="hover:text-green-500 cursor-pointer" />
    </a>

    <span className="text-sm sm:text-xl">
      CALL US NOW: <strong>+91 74006 74000</strong>
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
=======
        <div className="flex items-center space-x-3 text-xl">
          <a
            href="https://www.facebook.com/ipharmasciences"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className="hover:text-green-500 cursor-pointer" />
          </a>
          <a
            href="https://in.pinterest.com/pharma_science/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
          >
            <FaPinterestP className="hover:text-green-500 cursor-pointer" />
          </a>
          <a
            href="https://www.instagram.com/pharmascienceayurveda/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="hover:text-green-500 cursor-pointer" />
          </a>
          <a
            href="https://x.com/Pharmascience_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="hover:text-green-500 cursor-pointer" />
          </a>
          <span className="text-sm sm:text-xl">
            CALL US NOW: <strong>+91 74006 74000</strong>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/">
          <img src="/logos.png" alt="Logo" className="h-10 md:h-28 w-auto" />
        </Link>
>>>>>>> completed

        <div className="flex-grow h-px bg-white" />

        <div className="md:hidden">
<<<<<<< HEAD
          <button onClick={() => setIsOpen(!isOpen)}>
=======
          <button onClick={() => setIsOpen((prev) => !prev)}>
>>>>>>> completed
            {isOpen ? <FaTimes size={26} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* 🔻 Desktop Nav */}
=======
>>>>>>> completed
      <div className="px-4 pb-3 hidden md:flex items-center justify-start ms-40">
        <div className="flex text-lg flex-col md:flex-row md:items-center md:space-x-16 space-y-2 md:space-y-0">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-white font-semibold hover:text-green-500 transition-colors duration-200"
            >
<<<<<<< HEAD
              {link.icon && link.icon}
=======
              {link.icon}
>>>>>>> completed
              {link.label}
            </Link>
          ))}
        </div>

<<<<<<< HEAD
        {/* Cart and Login/User Info */}
=======
>>>>>>> completed
        <div className="ml-6 flex items-center space-x-4">
          <div className="relative me-5 ms-5 bg-primary px-4 py-2 border-0 rounded-lg">
            <Link href="/cart">
              <FaShoppingCart
                size={24}
                className="text-white hover:text-green-500 cursor-pointer"
              />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
<<<<<<< HEAD
  {items.length}
</span>

=======
                {items.length}
              </span>
>>>>>>> completed
            </Link>
          </div>
          {user ? (
            <Link href="/user" className="flex items-center">
              <div className="text-white ms-6 font-semibold capitalize">
<<<<<<< HEAD
                Hi, {user.firstName || "User"}
=======
                Hi, {user.firstName || 'User'}
>>>>>>> completed
              </div>
            </Link>
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

<<<<<<< HEAD
      {/* 📱 Mobile Nav */}
=======
>>>>>>> completed
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
<<<<<<< HEAD
                {link.icon && link.icon}
=======
                {link.icon}
>>>>>>> completed
                {link.label}
              </Link>
            ))}

<<<<<<< HEAD
            {/* Cart and Login/User Info (Mobile) */}
=======
>>>>>>> completed
            <div className="flex items-center space-x-4 pt-2">
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <div className="relative bg-primary px-4 py-2 border-0 rounded-lg">
                  <FaShoppingCart
                    size={24}
                    className="text-white hover:text-green-500 cursor-pointer"
                  />
<<<<<<< HEAD
                  <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 ms-5 h-5 flex items-center justify-center">
                    0
=======
                  <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
>>>>>>> completed
                  </span>
                </div>
              </Link>
              {user ? (
                <div className="text-white font-semibold ms-2">
<<<<<<< HEAD
                  Hi, {user.name?.split(" ")[0] || "User"}
=======
                  Hi, {user.firstName || 'User'}
>>>>>>> completed
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
