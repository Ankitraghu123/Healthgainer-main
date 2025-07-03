"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FullScreenVideo = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      className="w-full h-[30vh]  md:h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Video Background */}
      <video
        className={`md:w-full md:h-full md:object-cover absolute top-0 left-0 ${
          isMobile ? 'object-center' : 'object-cover'
        }`}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      >
        <source src="/hg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Content Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            Health Gainer Experience
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
            Discover the power of our revolutionary formula
          </p>
        </motion.div>
      </div> */}
    </motion.div>
  );
};

export default FullScreenVideo;