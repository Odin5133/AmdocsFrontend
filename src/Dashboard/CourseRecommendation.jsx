import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { FiAlertCircle, FiBookOpen, FiExternalLink } from "react-icons/fi";
import { SiUdemy } from "react-icons/si";
import { FaYoutube, FaBookOpen } from "react-icons/fa";
import { SiCoursera, SiPackt } from "react-icons/si";

function CourseRecommendation() {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState({
    goals: true,
    recommendations: false,
  });
  const [error, setError] = useState(null);
  const providerColors = {
    Udemy: "from-purple-600 to-purple-400",
    Coursera: "from-blue-600 to-blue-400",
    Packt: "from-green-600 to-green-400",
    YouTube: "from-red-600 to-red-400",
    Default: "from-gray-600 to-gray-400",
  };

  const providerIcons = {
    Udemy: <SiUdemy className="text-2xl text-white" />,
    Coursera: <SiCoursera className="text-2xl text-white" />,
    Packt: <SiPackt className="text-2xl text-white" />,
    YouTube: <FaYoutube className="text-2xl text-white" />,
    Default: <FaBookOpen className="text-2xl text-white" />,
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/goals/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        });
        setGoals(response.data.results);
      } catch (error) {
        setError("Failed to fetch goals. Please try again later.");
      } finally {
        setLoading((prev) => ({ ...prev, goals: false }));
      }
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    console.log(selectedGoal);
  }, [selectedGoal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGoal) return;

    setLoading((prev) => ({ ...prev, recommendations: true }));
    setError(null);

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/recommendations/",
        {
          params: { goal_id: selectedGoal },
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        }
      );
      setRecommendations(response.data.course_list);
      console.log(response.data);
    } catch (error) {
      setError("Failed to fetch recommendations. Please try again.");
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, recommendations: false }));
    }
  };

  const handleCourseClick = (url) => {
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      setError("Could not open course link. Please check the URL.");
    }
  };

  if (loading.goals) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-md text-center">
          <FiAlertCircle className="text-red-600 text-4xl mx-auto mb-4" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-blue-50 p-6 rounded-lg max-w-md text-center">
          <FiBookOpen className="text-blue-600 text-4xl mx-auto mb-4" />
          <p className="text-gray-700 font-medium">
            No learning goals found. Please create a goal first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[90vh] overflow-y-scroll">
      <div className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Course Recommendations
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">
                Select a Learning Goal
              </label>
              <div className="grid gap-4 max-h-[20rem] overflow-y-auto">
                {goals.map((goal) => (
                  <motion.div
                    key={goal.id}
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl cursor-pointer border-2 border-transparent hover:border-purple-200 transition-all max-w-60%"
                    onClick={() => setSelectedGoal(goal.id)}
                  >
                    <div className="flex items-center">
                      <motion.div
                        animate={{ scale: selectedGoal === goal.id ? 1 : 0.5 }}
                        className={`h-5 w-5 rounded-full mr-3 ${
                          selectedGoal === goal.id
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {goal.title}
                        </h3>
                        {/* <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {goal.description}
                        </p> */}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={!selectedGoal || loading.recommendations}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading.recommendations ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🔍 Searching Best Courses...
                </motion.span>
              ) : (
                "🚀 Get Personalized Recommendations"
              )}
            </motion.button>
          </form>
        </motion.div>

        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-1"
          >
            {recommendations.map((course, index) => {
              const colors =
                providerColors[course.course_provider] ||
                providerColors.Default;
              const icon =
                providerIcons[course.course_provider] || providerIcons.Default;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r opacity-25 blur transition-all duration-300 group-hover:opacity-40" />
                  <div className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r ${colors}`}
                      >
                        {icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {course.course_title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${colors
                              .replace("from-", "text-")
                              .replace("to-", "")} bg-opacity-20`}
                          >
                            {course.course_provider}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCourseClick(course.course_url)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <FiExternalLink className="text-xl" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {recommendations.length === 0 &&
          !loading.recommendations &&
          selectedGoal && (
            <div className="bg-yellow-50 p-6 rounded-xl text-center">
              <FiAlertCircle className="text-yellow-600 text-4xl mx-auto mb-4" />
              <p className="text-gray-700 font-medium">
                No recommendations found for this goal.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

export default CourseRecommendation;
