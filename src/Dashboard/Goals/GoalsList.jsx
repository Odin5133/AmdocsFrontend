import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import useClickOutside from "../Components/useClickOutside";

// import { FaRegCheckCircle } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlus, FaRegCheckCircle, FaEllipsisV } from "react-icons/fa";
import { GiGhost } from "react-icons/gi";

const GoalsList = ({
  goals,
  onSelect,
  selectedGoal,
  onAddNew,
  onDelete,
  onEdit,
}) => {
  const [menuOpen, setMenuOpen] = useState(null);

  const menuRef = useRef();
  useClickOutside(menuRef, () => setMenuOpen(null));

  const handleMenuToggle = (index, e) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handleAction = (index, action) => {
    setMenuOpen(null);
    if (action === "edit") onEdit(index);
    if (action === "delete") onDelete(index);
  };

  if (goals.length === 0) {
    return (
      <div className="h-full bg-white rounded-2xl shadow-lg p-4 relative flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <GiGhost className="text-8xl text-gray-300 mb-6 mx-auto" />
          <p className="text-gray-500 mb-8">Maybe add some new goals</p>
          <motion.button
            onClick={onAddNew}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaPlus className="text-2xl" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-2xl shadow-lg p-4 overflow-y-auto">
      {goals.map((goal, index) => (
        <motion.div
          key={goal.id}
          className={`p-4 mb-4 rounded-xl cursor-pointer transition-all ${
            selectedGoal === index
              ? "bg-blue-50 border-2 border-blue-600"
              : "hover:bg-gray-50 border-2 border-transparent"
          }`}
          onClick={() => onSelect(index)}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between">
            {/* Circular Progress */}
            <div className="relative w-12 h-12 mr-4">
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <FaRegCheckCircle className="text-3xl text-blue-600" />
              </div> */}
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                {/* {goal.progress}% */}
                <CircularProgressbar
                  value={goal.progress}
                  text={`${goal.progress}%`}
                />
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">{goal.title}</h3>
              {/* <p className="text-sm text-gray-500 mt-1">
                Current: {goal.currentModule}
              </p> */}
            </div>
            <div className="relative">
              <button
                onClick={(e) => handleMenuToggle(index, e)}
                className="p-2 hover:bg-gray-200 rounded-lg"
              >
                <FaEllipsisV className="text-gray-600" />
              </button>

              {menuOpen === index && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-8 bg-white shadow-lg rounded-lg p-2 min-w-[120px] z-10"
                >
                  <button
                    onClick={() => handleAction(index, "edit")}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                  >
                    Edit Goal
                  </button>
                  <button
                    onClick={() => handleAction(index, "delete")}
                    className="w-full text-left p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Delete
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
      <motion.button
        onClick={onAddNew}
        className="absolute bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaPlus className="text-xl" />
      </motion.button>
    </div>
  );
};

export default GoalsList;
