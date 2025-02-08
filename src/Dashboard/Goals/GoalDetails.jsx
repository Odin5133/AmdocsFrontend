import { motion, AnimatePresence } from "framer-motion";
import { GiAchievement } from "react-icons/gi";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import LoadingAnimation from "../Components/LoadingAnimation";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PracticeSection from "../Components/PracticeSection";

const GoalDetails = ({ goal, goalDetail, selectedGoal, moduleId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false);
  const navigate = useNavigate();

  const handleTest = (info) => {
    setIsLoading(true);
    axios
      .post(
        "http://127.0.0.1:8000/api/tests/",
        {
          goal_id: goal.id,
          module_info: info,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        navigate(
          `/dashboard/quiz/${res.data.data.id}/${goal.id}/B/${moduleId}`
        );
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="h-full bg-white rounded-2xl shadow-lg p-6 flex flex-col">
      {isLoading && <LoadingAnimation textToDisplay="Starting Quiz" />}
      {!isLoading && (
        <div className="h-[30vh] bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <GiAchievement className="text-white text-8xl" />
          </motion.div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Modules</h2>

        {/* Topics List */}
        <div className="space-y-4">
          {goalDetail.roadmap.topics.map((topic, index) => {
            const cleanTitle = topic
              .replace(/^\d+\.\s*/, "")
              .replace(/\s*\(\d+\s+weeks?\)$/i, "");

            return (
              <motion.div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800 max-w-2/3">
                    {cleanTitle}
                  </h3>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => handleTest(cleanTitle)}
                  >
                    Start Test
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Weekly Breakdown Section */}
        <motion.div
          className="border rounded-lg overflow-hidden"
          initial={false}
          animate={{ borderRadius: isBreakdownExpanded ? "0.5rem" : "2rem" }}
        >
          <button
            className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            onClick={() => setIsBreakdownExpanded(!isBreakdownExpanded)}
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Learning Timeline
            </h3>
            <motion.div
              animate={{ rotate: isBreakdownExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="text-gray-600 text-xl" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isBreakdownExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-4"
              >
                <div className="relative pl-6 border-l-2 border-blue-200 space-y-8">
                  {goalDetail.roadmap.weekly_breakdown.map((entry, index) => {
                    const [header, ...content] = entry.split(": ");
                    return (
                      <motion.div
                        key={index}
                        className="relative pb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[31px] top-1 border-2 border-white" />
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {header}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {content.join(": ")}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {/* Practice Section */}
        {goalDetail.practice && (
          <PracticeSection practice={goalDetail.practice} />
        )}
      </div>
    </div>
  );
};

export default GoalDetails;
