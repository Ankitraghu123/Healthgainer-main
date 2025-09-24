import React, { useState } from 'react';
import { FaFacebookF, FaPinterestP, FaInstagram, FaTwitter, FaHome, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD

  const navLinks = [
    { label: 'Home', href: '/', icon: <FaHome className="text-green-500" /> },
=======
  const navLinks = React.useMemo(() => [
    { label: 'Home', href: '/', icon: <FaHome /> },
>>>>>>> completed
    { label: 'Product', href: '/product' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Media & Reports', href: '/media' },
    { label: 'Get Distributorship', href: '/distributor' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
<<<<<<< HEAD
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
=======
  ], []);

  const toggleMenu = React.useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const SocialIcons = React.useMemo(() => (
    <>
      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
        <FaFacebookF />
      </a>
      <a href="#" className="text-gray-600 hover:text-red-600 transition-colors duration-200">
        <FaPinterestP />
      </a>
      <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
        <FaInstagram />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
        <FaTwitter />
      </a>
    </>
  ), []);

  return (
    <header className="bg-white shadow-md">
      <div className="bg-gray-100 py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-10 w-auto"
              loading="lazy"
              width={120}
              height={40}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              {SocialIcons}
            </div>
            <span className="text-gray-700 font-medium whitespace-nowrap">
              CALL US NOW: +917400674000
>>>>>>> completed
            </span>
          </div>
        </div>
      </div>
<<<<<<< HEAD
    </div>
  );
};

export default Navbar;
=======

      <nav className="bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">

            <div className="hidden md:flex space-x-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {link.icon && React.cloneElement(link.icon, { className: "mr-1" })}
                  {link.label}
                </a>
              ))}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-700 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>

            <div className="flex items-center">
              <div className="relative">
                <FaShoppingCart className="text-gray-700 text-xl" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </div>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden bg-white py-2 border-t">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    {link.icon && React.cloneElement(link.icon, { className: "mr-2" })}
                    {link.label}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Navbar);
>>>>>>> completed
