import { motion } from "framer-motion";
import React from "react";
import { FaPlus } from "react-icons/fa";

const GoalsPillList = ({ goals, onSelect, selectedGoal, onAddNew }) => {
  return (
    <div className="flex overflow-x-auto space-x-4 p-4 bg-white rounded-2xl shadow-lg">
      {goals.map((goal, index) => (
        <motion.div
          key={goal.id}
          className={`flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-all ${
            selectedGoal === index
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => onSelect(index)}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="font-semibold">{goal.title}</span>
        </motion.div>
      ))}
      <motion.div
        className="flex-shrink-0 px-4 py-2 rounded-full cursor-pointer bg-blue-600 text-white transition-all"
        onClick={onAddNew}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: goals.length * 0.1 }}
      >
        <FaPlus className="text-xl" />
      </motion.div>
    </div>
  );
};

export default GoalsPillList;
