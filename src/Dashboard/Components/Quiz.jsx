import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo, FiBook, FiStar, FiClock } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingAnimation from "./LoadingAnimation";
import { useNavigate } from "react-router-dom";

const Quiz = ({ questions = [], submitId, goal_id, typeOf, module }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [quizCompleteTime, setQuizCompleteTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // useEffect(() => {
  //   console.log(questions);
  // });

  const handleAnswerSelect = (answer) => {
    if (!isTransitioning) {
      setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answer });
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    setQuestionTimes([...questionTimes, timeTaken]);

    timeoutRef.current = setTimeout(() => {
      setShowFeedback(false);
      setIsTransitioning(false);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setQuestionStartTime(Date.now());
      } else {
        setQuizCompleted(true);
      }
    }, 10);
  };

  const getButtonColor = (choice) => {
    if (!showFeedback) return "";

    const correctAnswer = questions[currentQuestion].correct_answer;
    const userAnswer = selectedAnswers[currentQuestion];

    if (choice === correctAnswer) {
      return "bg-green-500 border-green-500 text-white";
    }
    if (choice === userAnswer && userAnswer !== correctAnswer) {
      return "bg-red-500 border-red-500 text-white";
    }
    return "";
  };

  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let correctTime = 0;
    let wrongTime = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct_answer) {
        correct++;
        correctTime += questionTimes[index];
      } else {
        wrong++;
        wrongTime += questionTimes[index];
      }
    });
    return { correct, wrong, correctTime, wrongTime };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    setQuizCompleteTime(timeElapsed);
  }, [quizCompleted]);

  const handleSubmitQuiz = async (correct, wrong, correctTime, wrongTime) => {
    setIsLoading(true);
    //calculate right fluency
    const right_fluency =
      correctTime === 0
        ? 0
        : Math.round(
            (correct * quizCompleteTime) / (correctTime * questions.length)
          );

    const wrong_fluency =
      wrongTime === 0
        ? 0
        : Math.round(
            (wrong * quizCompleteTime) / (wrongTime * questions.length)
          );

    console.log(right_fluency, wrong_fluency);
    let formdata = new FormData();
    formdata.append("right_fluency", right_fluency);
    formdata.append("wrong_fluency", wrong_fluency);
    formdata.append("test_id", submitId);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/scores/",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      // setTimeout(10000);
      //add some time
      if (typeOf === "A")
        axios
          .post(
            "http://127.0.0.1:8000/api/learning-modules/",
            {
              goal_id: goal_id,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("access")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
            navigate("/dashboard/goals");
            //add redirect here for goals
          });
      else {
        axios
          .patch(
            `http://127.0.0.1:8000/api/learning-modules/${module}/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("access")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
            navigate("/dashboard/goals");
            //add redirect here for goals
          });
      }

      // const timeoutId = setTimeout(() => {
      //   setIsLoading(false); // Stop loading animation
      // }, 10000);

      // return () => clearTimeout(timeoutId);
    }
  };

  if (quizCompleted) {
    const { correct, wrong, correctTime, wrongTime } = calculateResults();
    return (
      <div className="md:w-full md:h-full my-6 md:mt-0 px-6 md:px-12 md:max-h-[90vh] md:overflow-y-scroll">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="font-bold text-3xl text-gray-800 mb-6">
              Quiz Results
            </h2>

            {/* Score Cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="p-4 bg-green-50 rounded-xl border border-green-200"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-green-600 font-semibold">
                  Correct Answers
                </h3>
                <p className="text-4xl font-bold text-green-700">{correct}</p>
              </motion.div>

              <motion.div
                className="p-4 bg-red-50 rounded-xl border border-red-200"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-red-600 font-semibold">
                  Improvement Needed
                </h3>
                <p className="text-4xl font-bold text-red-700">{wrong}</p>
              </motion.div>
            </div>

            {/* Time Analysis */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="text-blue-600 font-semibold mb-4">
                Time Analysis
              </h3>
              <div className="space-y-3">
                {questionTimes.map((time, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-16 text-gray-600">Q{index + 1}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-purple-600 h-3 rounded-full transition-all"
                        style={{ width: `${(time / quizCompleteTime) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-4 text-gray-700 w-16">
                      {formatTime(time)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-blue-200">
                <p className="text-blue-600 font-semibold">
                  Total Time:{" "}
                  <span className="text-gray-700">
                    {formatTime(quizCompleteTime)}
                  </span>
                </p>
              </div>
            </div>

            {/* Update Goals Button */}
            <motion.button
              onClick={async () => {
                await handleSubmitQuiz(correct, wrong, correctTime, wrongTime);
              }}
              whileHover={{ scale: 1.05 }}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
                     hover:bg-indigo-700 transition-colors"
            >
              Update Learning Goals
            </motion.button>
          </motion.div>
        )}
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 h-[85vh] overflow-y-scroll">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span>{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex items-center">
            <FiStar className="mr-2" />
            <span>{currentQ.difficulty_tier}</span>
          </div>
        </div>
        <div className="w-40 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Metadata */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          <FiBook className="mr-2" />
          {currentQ.skill_tested}
        </div>
        <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
          <FiInfo className="mr-2" />
          {currentQ.question_type}
        </div>
      </div>

      {/* Question and Options */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {currentQ.question}
        </h2>

        <div className="space-y-4">
          {currentQ.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              initial={{ scale: 1 }}
              animate={showFeedback ? { scale: 1.02 } : {}}
              className={`w-full p-4 text-left rounded-lg border transition-all
      ${
        selectedAnswers[currentQuestion] === option
          ? option === currentQ.correct_answer
            ? "bg-green-100 border-green-500"
            : "bg-red-100 border-red-500"
          : showFeedback && option === currentQ.correct_answer
          ? "bg-green-100 border-green-500"
          : "border-gray-200 hover:border-blue-300"
      }
      ${showFeedback ? "cursor-default" : "hover:bg-gray-50"}`}
              disabled={showFeedback}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Diagnostic Insight */}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion] || isTransitioning}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
        >
          {currentQuestion === questions.length - 1
            ? "Finish"
            : "Next Question"}
        </button>
        <AnimatePresence>
          {
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg"
            >
              <div className="flex items-center text-yellow-700 mb-2">
                <FiInfo className="mr-2" />
                <span className="font-semibold">Objective</span>
              </div>
              <p className="text-gray-700">{currentQ.diagnostic_insight}</p>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Quiz;
