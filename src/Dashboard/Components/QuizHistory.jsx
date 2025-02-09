import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const QuizHistory = ({ scores }) => {
  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl shadow-2xl mx-auto max-h-[90vh] overflow-y-auto">
      <motion.h2
        className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Quiz History
      </motion.h2>

      <div className="space-y-6">
        {scores.map((score, index) => {
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
              className="group relative p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 backdrop-blur-sm md:w-[62vw]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Date and Stats */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg font-semibold text-slate-300">
                    {new Date(score.created_at).toLocaleString()}
                  </h3>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <FiCheckCircle className="text-xl" />
                      <span className="font-medium">
                        {Math.round(rightPercentage)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-rose-400">
                      <FiXCircle className="text-xl" />
                      <span className="font-medium">
                        {Math.round(wrongPercentage)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full md:w-64">
                  <div className="h-3 rounded-full overflow-hidden bg-slate-700">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      style={{ width: `${rightPercentage}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${rightPercentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <motion.div
                      className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
                      style={{ width: `${wrongPercentage}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${wrongPercentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>

                  {/* <div className="mt-2 flex justify-between text-sm font-medium text-slate-400">
                    <span>{Math.round(rightFluency)} Correct</span>
                    <span>{Math.round(wrongFluency)} Incorrect</span>
                  </div> */}
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
