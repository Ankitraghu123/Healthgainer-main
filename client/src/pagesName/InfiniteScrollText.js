"use client";

import { motion } from "framer-motion";

<<<<<<< HEAD
const InfiniteScrollLine = () => {
  return (
    <div className="w-full h-[5px] py-1 bg-white flex items-center overflow-hidden relative">
      {/* Scrolling Line with Varying Width */}
      <motion.div
        className="absolute h-[5px] bg-primary rounded-full"
        animate={{
          x: ["-100%", "100%"],
          width: ["0%", "50%", "100%", "50%", "0%"], // Dynamic width changes
          opacity: [0, 1, 1, 1, 0], // Fades in and out
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "linear",
          times: [0, 0.25, 0.5, 0.75, 1], // Controls when width changes
        }}
      />
    </div>
  );
};
=======
const InfiniteScrollLine = () => (
  <div className="relative w-full h-[5px] bg-white overflow-hidden">
    <motion.div
      className="absolute h-[5px] bg-primary rounded-full"
      animate={{
        x: ["-100%", "100%"],
        width: ["0%", "50%", "100%", "50%", "0%"],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
  </div>
);
>>>>>>> completed

export default InfiniteScrollLine;
