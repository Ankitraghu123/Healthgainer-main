"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import ScrollToTopButton from "@/components/ScrollToTopButton";
<<<<<<< HEAD
=======
import { useState, useEffect } from "react";
>>>>>>> completed

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
<<<<<<< HEAD
  const isAdminRoute = pathname.startsWith("/admin");
=======
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    setIsAdminRoute(pathname.startsWith("/admin"));
  }, [pathname]);
>>>>>>> completed

  return (
    <html lang='en' className='scroll-smooth'>
      <body
<<<<<<< HEAD
        cz-shortcut-listen='true'
=======
>>>>>>> completed
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <Providers>
          {!isAdminRoute && <Navbar />}
          <main>
<<<<<<< HEAD
            {!isAdminRoute && <div className=''></div>}
=======
>>>>>>> completed
            <ToastContainer />
            <ScrollToTopButton />
            {children}
          </main>
          {!isAdminRoute && <Footer />}
        </Providers>
      </body>
    </html>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> completed
