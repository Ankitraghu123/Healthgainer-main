import React, { useState } from 'react';
import { FaFacebookF, FaPinterestP, FaInstagram, FaTwitter, FaHome, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/', icon: <FaHome className="text-green-500" /> },
    { label: 'Product', href: '/product' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Media & Reports', href: '/media' },
    { label: 'Get Distributorship', href: '/distributor' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="w-full bg-black text-white font-sans shadow-md">
      {/* Top Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Right Side: Social Icons + Call */}
        <div className="hidden md:flex items-center space-x-4">
          <FaFacebookF className="cursor-pointer hover:text-green-500" />
          <FaPinterestP className="cursor-pointer hover:text-green-500" />
          <FaInstagram className="cursor-pointer hover:text-green-500" />
          <FaTwitter className="cursor-pointer hover:text-green-500" />
          <span className="ml-4 text-sm">CALL US NOW: <strong className="text-white">+917400674000</strong></span>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className={`md:flex items-center justify-between px-4 py-3 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-white font-semibold hover:text-green-500 transition-colors duration-200"
            >
              {link.icon && link.icon}
              {link.label}
            </a>
          ))}
        </div>

        {/* Cart */}
        <div className="mt-3 md:mt-0 flex justify-end">
          <div className="relative">
            <FaShoppingCart size={24} className="text-white hover:text-green-500 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
