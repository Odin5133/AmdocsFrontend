import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { FiAlertCircle, FiBookOpen, FiExternalLink } from "react-icons/fi";

function CourseRecommendation() {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState({
    goals: true,
    recommendations: false,
  });
  const [error, setError] = useState(null);

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
    <div className="min-h-screen p-8 max-w-4xl mx-auto h-[90vh] overflow-y-auto">
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
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedGoal(goal.id)}
              >
                <input
                  type="radio"
                  id={`goal-${goal.id}`}
                  name="goal"
                  checked={selectedGoal === goal.id}
                  onChange={() => {}}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label
                  htmlFor={`goal-${goal.id}`}
                  className="ml-3 block text-gray-700"
                >
                  <span className="font-medium">{goal.title}</span>
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={!selectedGoal || loading.recommendations}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading.recommendations
              ? "Fetching Recommendations..."
              : "Get Recommendations"}
          </button>
        </form>
      </motion.div>

      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Recommended Courses
          </h2>
          <div className="space-y-4">
            {recommendations.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {course.course_title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {course.course_provider}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCourseClick(course.course_url)}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                    title="Open course"
                  >
                    <FiExternalLink className="mr-2" />
                    Visit Course
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
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
  );
}

export default CourseRecommendation;
