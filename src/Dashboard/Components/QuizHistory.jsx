import React from "react";
import { motion } from "framer-motion";

const QuizHistory = ({ scores }) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto max-h-[90vh] overflow-y-scroll">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Quiz History
      </h2>
      <div className="space-y-6">
        {scores.map((score) => {
          const rightFluency = parseFloat(score.right_fluency);
          const wrongFluency = parseFloat(score.wrong_fluency);
          const totalAttempts = rightFluency + wrongFluency;
          const rightPercentage = totalAttempts
            ? (rightFluency / totalAttempts) * 100
            : 0;
          const wrongPercentage = totalAttempts
            ? (wrongFluency / totalAttempts) * 100
            : 0;

          return (
            <motion.div
              key={score.id}
              className="flex flex-col md:flex-row items-center justify-between p-5 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-gray-700">
                  {new Date(score.created_at).toLocaleString()}
                </h3>
                <div className="flex items-center mt-3 h-4 rounded overflow-hidden bg-gray-200">
                  <motion.div
                    className="bg-green-500 h-full"
                    style={{ width: `${rightPercentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${rightPercentage}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  <motion.div
                    className="bg-red-500 h-full"
                    style={{ width: `${wrongPercentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${wrongPercentage}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizHistory;
