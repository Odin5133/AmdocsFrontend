import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = ({ textToDisplay = "Updating Goals..." }) => {
  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
    <div className="h-full w-full flex items-center justify-center bg-white bg-opacity-50 z-50 rounded-xl ">
      <motion.div
        className="relative w-64 h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-50"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        <motion.div
          className="absolute inset-8 bg-white rounded-full shadow-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold text-xl">
          {textToDisplay}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
