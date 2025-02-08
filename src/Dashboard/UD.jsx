import React, { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import axios from "axios";
import Cookies from "js-cookie";
import { FiAlertTriangle, FiLock, FiMonitor } from "react-icons/fi";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

function UD() {
  const [test_id, setTest_id] = useState(useParams().quiz_id);
  const [goal_id, setGoal_id] = useState(useParams().goal_id);
  const [typeOf, setTypeOf] = useState(useParams().type_of);
  const [module, setModule] = useState(useParams().module_id);
  const [questions, setQuestions] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [submitId, setSubmitId] = useState(-1);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    if (testStarted) {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          alert("Test terminated due to tab change!");
          setTestStarted(false);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () =>
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
    }
  }, [testStarted]);

  const toCamelCase = (str) => {
    return str.replace(/([-_][a-z])/gi, (match) =>
      match.toUpperCase().replace("-", "").replace("_", "")
    );
  };

  const keysToCamelCase = (obj) => {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) {
      return obj.map((v) => keysToCamelCase(v));
    } else if (typeof obj === "object") {
      return Object.keys(obj).reduce((result, key) => {
        const camelCaseKey = toCamelCase(key);
        result[camelCaseKey] = keysToCamelCase(obj[key]);
        return result;
      }, {});
    }
    return obj;
  };

  useEffect(() => {
    axios
      .get(`https://amdocs-backend.onrender.com/api/tests/${test_id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // res.data.data.questions && setQuestions(res.data.data.questions);

        const data = keysToCamelCase(res.data);
        data.id && setSubmitId(data.id);
        // if questions correct answer==1 or a map it to the first option

        const normalizedQuestions =
          data.data.questions &&
          data.data.questions.map((q) => {
            let { correctAnswer, options } = q;

            if (typeof correctAnswer === "string") {
              if (correctAnswer >= "a" && correctAnswer <= "d") {
                correctAnswer = correctAnswer.charCodeAt(0) - 97; // Convert 'a' to 0, 'b' to 1, etc.
              } else if (correctAnswer >= "A" && correctAnswer <= "D") {
                correctAnswer = correctAnswer.charCodeAt(0) - 65; // Convert 'A' to 0, 'B' to 1, etc.
              }
            } else if (
              typeof correctAnswer === "number" &&
              correctAnswer >= 1 &&
              correctAnswer <= 4
            ) {
              correctAnswer -= 1; // Convert 1-based index to 0-based
            }

            console.log(correctAnswer);

            // Ensure correct_answer is a valid index
            if (correctAnswer >= 0 && correctAnswer < options.length) {
              correctAnswer = options[correctAnswer];
            }

            return { ...q, correctAnswer };
          });
        setQuestions(normalizedQuestions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(questions);
    // if questions correct answer==1 or a map it to the first option
  }, [questions]);

  return (
    <div className="md:h-full min-h-[87vh] w-full rounded-xl flex items-center justify-center bg-gray-50">
      {!testStarted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-4 "
        >
          <div className="text-center mb-8">
            <FiLock className="text-4xl text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Integrity Assurance Protocol
            </h1>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start p-4 bg-red-50 rounded-lg">
              <FiAlertTriangle className="text-red-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">
                  Strict Prohibitions
                </h3>
                <p className="text-gray-700">
                  Any attempt to switch tabs, use secondary monitors, or access
                  external resources will result in immediate test termination.
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-blue-50 rounded-lg">
              <FiMonitor className="text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">
                  System Monitoring
                </h3>
                <p className="text-gray-700">
                  Our integrity system actively monitors: Tab changes,
                  application switching, and unauthorized device usage.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setTestStarted(true)}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold
                     hover:bg-green-700 transition-colors shadow-md"
          >
            Start Assessment
          </button>
        </motion.div>
      ) : (
        <Quiz
          questions={questions}
          submitId={test_id}
          goal_id={goal_id}
          typeOf={typeOf}
          module={module}
        />
      )}
    </div>
  );
}

export default UD;
