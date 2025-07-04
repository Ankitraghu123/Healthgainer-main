"use client";
import { GalleryHorizontal, Medal, SparkleIcon, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiBarChart2,
  FiChevronDown,
  FiChevronUp,
  FiPlusCircle,
  FiShoppingBag,
  FiSettings,
} from "react-icons/fi";
import { MdNoDrinks } from "react-icons/md";

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState({
    products: false,
    settings: false,
  });

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const mainMenu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome size={18} /> },
    { name: "Orders", path: "/admin/orders", icon: <FiPackage size={18} /> },
    {
      name: "Enquiry",
      path: "/admin/contact-queries",
      icon: <FiBarChart2 size={18} />,
    },
    { name: "Users", path: "/admin/users", icon: <FiUsers size={18} /> },
    {
      name: "Header Slider",
      path: "/admin/header-slider",
      icon: <GalleryHorizontal  size={16} />,
    },
    { name: "Benefits", path: "/admin/benefits", icon: <SparkleIcon size={18} /> },
    { name: "Supplements", path: "/admin/supplements", icon: <MdNoDrinks size={18} /> },
    { name: "Video-carousel", path: "/admin/video-carousel", icon: <Video size={18} /> },
    // { name: "Testimonials", path: "/admin/testimonials", icon: <Medal size={18} /> },
  ];

  const productMenu = [
    {
      name: "Create Product",
      path: "/admin/create-product",
      icon: <FiPlusCircle size={16} />,
    },

    {
      name: "View Products",
      path: "/admin/products",
      icon: <FiShoppingBag size={16} />,
    },

    {
      name: "Add Tab",
      path: "/admin/tab/add-tab",
      icon: <FiPlusCircle size={16} />,
    },
    {
      name: "View Tabs",
      path: "/admin/tab/view-tabs",
      icon: <FiShoppingBag size={16} />,
    },
  ];

  // const settingsMenu = [
  //   { name: "General Settings", path: "/admin/settings/general", icon: <FiSettings size={16} /> },
  //   { name: "Theme Settings", path: "/admin/settings/theme", icon: <FiSettings size={16} /> },
  // ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg z-40 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className='h-full flex flex-col p-4 overflow-y-auto'>
          <h2 className='text-xl font-bold mb-8 p-2 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white'>
            Admin Panel
          </h2>

          <nav className='flex-1 space-y-1'>
            {/* Main Menu Items */}
            {mainMenu.map((item) => (
              <Link
                href={item.path}
                key={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  pathname === item.path
                    ? "bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                onClick={onClose}
              >
                <span className='mr-3'>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Products Dropdown */}
            <div className='mt-2'>
              <button
                onClick={() => toggleMenu("products")}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                  productMenu.some((item) => pathname === item.path)
                    ? "bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className='flex items-center'>
                  <FiShoppingBag size={18} className='mr-3' />
                  <span>Products</span>
                </div>
                {expandedMenus.products ? (
                  <FiChevronUp size={18} />
                ) : (
                  <FiChevronDown size={18} />
                )}
              </button>

              {expandedMenus.products && (
                <div className='ml-8 mt-1 space-y-1'>
                  {productMenu.map((item) => (
                    <Link
                      href={item.path}
                      key={item.path}
                      className={`flex items-center p-2 rounded-lg transition-colors ${
                        pathname === item.path
                          ? "bg-blue-50 text-blue-600 dark:bg-gray-600 dark:text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={onClose}
                    >
                      <span className='mr-2'>{item.icon}</span>
                      <span className='text-sm'>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Settings Dropdown */}
            {/* <div className="mt-2">
              <button
                onClick={() => toggleMenu('settings')}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                  settingsMenu.some(item => pathname === item.path)
                    ? "bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <FiSettings size={18} className="mr-3" />
                  <span>Settings</span>
                </div>
                {expandedMenus.settings ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
              </button>

              {expandedMenus.settings && (
                <div className="ml-8 mt-1 space-y-1">
                  {settingsMenu.map((item) => (
                    <Link
                      href={item.path}
                      key={item.path}
                      className={`flex items-center p-2 rounded-lg transition-colors ${
                        pathname === item.path
                          ? "bg-blue-50 text-blue-600 dark:bg-gray-600 dark:text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={onClose}
                    >
                      <span className="mr-2">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div> */}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
