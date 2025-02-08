import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GoalDetails from "./GoalDetails";
import GoalsList from "./GoalsList";
import ProgressCalendar from "./ProgressCalendar";
import axios from "axios";
import Cookies from "js-cookie";
import NewGoalModal from "../Components/NewGoalModal";
import EditGoalModal from "../Components/EditGoalModal";
import DeleteConfirmationModal from "../Components/DeleteConfirmationModal";
import GoalsPillList from "./GoalsPillList";
import { GiGhost, GiDirectionSigns } from "react-icons/gi";
import toast from "react-hot-toast";
import LoadingAnimation from "../Components/LoadingAnimation";
import { useNavigate } from "react-router-dom";

const GoalsSection = () => {
  const [selectedGoal, setSelectedGoal] = useState(-1);
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [deletingGoalIndex, setDeletingGoalIndex] = useState(null);
  const [PreliminaryQuiz, setPreliminaryQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moduleId, setModuleId] = useState(4);
  const [loadx, setLoadx] = useState(false);

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Master React Development",
      progress: 65,
      currentModule: "Advanced Hooks Patterns",
    },
  ]);
  const [goalDetail, setGoalDetail] = useState({});
  const [curGoalId, setCurGoalId] = useState(-1);
  const navigate = useNavigate();

  const handleDeleteInit = (index) => {
    setDeletingGoalIndex(index);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/goals/${goals[selectedGoal].id}/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (deletingGoalIndex !== null) {
          const newGoals = goals.filter((_, i) => i !== deletingGoalIndex);
          setGoals(newGoals);

          if (newGoals.length === 0) {
            setSelectedGoal(-1);
          } else {
            setSelectedGoal(Math.min(selectedGoal, newGoals.length - 1));
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setDeletingGoalIndex(null));
  };

  const handleEditGoal = (index) => {
    setEditingGoal(index);
  };

  const handleSaveGoal = (updatedData) => {
    setGoals(
      goals.map((goal, index) =>
        index === editingGoal ? { ...goal, ...updatedData } : goal
      )
    );
    setEditingGoal(null);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "http://127.0.0.1:8000/api/goals/",

        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.results);
        // setGoals(res.data.results);
        // for each goal add random progress between 0 and 100 and currentmodule=""
        res.data.results.forEach((goal) => {
          goal.progress = Math.floor(Math.random() * 100);
          goal.currentModule = `Module ${Math.floor(Math.random() * 5) + 1}`;
        });
        setGoals(res.data.results);
        if (res.data.results.length > 0) {
          setSelectedGoal(0);
          setCurGoalId(res.data.results[0].id);
        } else {
          setSelectedGoal(-1);
          setCurGoalId(-1);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    console.log(`Bearer ${Cookies.get("access")}`);
    // console.log(goalDetail);
    if (selectedGoal === -1) {
      return;
    }

    let formData = new FormData();
    formData.append("type_of_quiz", "A");
    formData.append("goal_id", goals[selectedGoal].id);
    formData.append("module_info", "Preliminary Test");
    console.log(formData, curGoalId);
    // setIsLoading(true);
    // setLoadx(true);
    axios
      .post("http://127.0.0.1:8000/api/tests/", formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.data.is_attempted === false) {
          setPreliminaryQuiz(true);
          if (res.data.questions) {
            setQuestions(res.data.questions);
          } else {
            setQuestions(res.data.data.questions);
          }
        } else {
          setPreliminaryQuiz(false);
          setIsLoading(true);
          let formdata1 = new FormData();
          formdata1.append("goal_id", selectedGoal + 1);
          axios
            .get("http://127.0.0.1:8000/api/learning-modules/", {
              params: {
                goal_id: goals[selectedGoal].id,
              },
              headers: {
                Authorization: `Bearer ${Cookies.get("access")}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              // setGoalDetail(res.data.data);
              setGoalDetail(res.data.data);
              setModuleId(res.data.id);
              setIsLoading(false);

              // console.log(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        // setLoadx(false);
      });

    // });
  }, [selectedGoal]);

  const handleTest = () => {
    // e.preventDefault();
    setIsLoading(true);
    // console.log(info);
    axios
      .post(
        "http://127.0.0.1:8000/api/tests/",
        {
          goal_id: goals[selectedGoal].id,
          module_info: "Preliminary Test",
          type_of_quiz: "A",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        navigate(
          `/dashboard/quiz/${res.data.data.id}/${goals[selectedGoal].id}/A/${moduleId}`
        );
        //add navigation for test here

        //add navigation for test handle
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleAddGoal = (newGoal) => {
    //convert months->duration_months, days->duration_days of newGoal
    newGoal.duration_months = newGoal.months;
    newGoal.duration_days = newGoal.days;
    axios
      .post("http://127.0.0.1:8000/api/goals/", newGoal, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(true);
        setLoadx(true);
        axios
          .get(
            "http://127.0.0.1:8000/api/goals/",

            {
              headers: {
                Authorization: `Bearer ${Cookies.get("access")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data.results);
            // setGoals(res.data.results);
            // for each goal add random progress between 0 and 100 and currentmodule=""
            res.data.results.forEach((goal) => {
              goal.progress = Math.floor(Math.random() * 100);
              goal.currentModule = `Module ${
                Math.floor(Math.random() * 5) + 1
              }`;
            });
            setGoals(res.data.results);
            if (res.data.results.length > 0) {
              setSelectedGoal(0);
              setCurGoalId(res.data.results[0].id);
            } else {
              setSelectedGoal(-1);
              setCurGoalId(-1);
            }
            // setSelectedGoal(goals.length);
            // setPreliminaryQuiz(true);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
            setLoadx(false);
          });
        // console.log(res.data);
        // const newGoalEntry = {
        //   id: goals.length + 1,
        //   title: newGoal.title,
        //   progress: 0,
        //   currentModule: "Not started",
        //   ...newGoal,
        // };
        // setGoals([...goals, newGoalEntry]);

        // if (res.data.data.is_attempted === false) {
        //   setPreliminaryQuiz(true);
        //   if (res.data.questions) {
        //     setQuestions(res.data.questions);
        //   } else {
        //     setQuestions(res.data.data.questions);
        //   }
        // } else {
        //   setPreliminaryQuiz(false);
        // }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400)
          toast.error("Be more descriptive in your goal description");
      });
  };

  useEffect(() => {
    console.log(goalDetail);
    console.log(Object.keys(goalDetail).length);
  }, [goalDetail]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <NewGoalModal
        isOpen={showNewGoalModal}
        onClose={() => setShowNewGoalModal(false)}
        onSubmit={handleAddGoal}
      />
      <EditGoalModal
        isOpen={editingGoal !== null}
        onClose={() => setEditingGoal(null)}
        goal={goals[editingGoal]}
        onSubmit={handleSaveGoal}
      />
      <DeleteConfirmationModal
        isOpen={deletingGoalIndex !== null}
        onClose={() => setDeletingGoalIndex(null)}
        onConfirm={handleConfirmDelete}
      />
      {/* Section 1 - Goal Details */}
      <div className="md:hidden block mt-4">
        <GoalsPillList
          goals={goals}
          onSelect={setSelectedGoal}
          onDelete={handleDeleteInit}
          onEdit={handleEditGoal}
          selectedGoal={selectedGoal}
          onAddNew={() => setShowNewGoalModal(true)}
        />
      </div>
      <div className="mt-4 md:mt-0 w-full md:px-4 md:w-[60%] md:h-[90vh]">
        {PreliminaryQuiz ? (
          <motion.div
            className=" bg-blue-100 rounded-2xl shadow-lg md:mx-0 mx-2 p-6 flex flex-col items-center justify-center md:w-[60%] md:h-[90vh] min-h-[75vh]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              <LoadingAnimation
                textToDisplay={loadx ? `Loading` : `Starting Quiz`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-semibold text-blue-800  ">
                  Preliminary Quiz
                </h2>
                <motion.button
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleTest}
                >
                  Start Test
                </motion.button>
              </div>
            )}
          </motion.div>
        ) : selectedGoal === -1 ? (
          <div className="h-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-400 text-center"
            >
              <GiDirectionSigns className="text-6xl mb-4" />
              <p className="text-xl">Select a goal to view details</p>
            </motion.div>
          </div>
        ) : (
          Object.keys(goalDetail).length > 0 && (
            <GoalDetails
              goal={goals[selectedGoal]}
              goalDetail={goalDetail}
              selectedGoal={selectedGoal}
              moduleId={moduleId}
            />
          )
        )}
      </div>

      {/* Sections 2 & 3 */}
      <div className="w-full md:w-[40%] flex flex-col gap-6 max-h-[90vh] md:min-h-[80vh]">
        <motion.div
          className="h-[60%] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="hidden md:block">
            <GoalsList
              goals={goals}
              onSelect={setSelectedGoal}
              onDelete={handleDeleteInit}
              onEdit={handleEditGoal}
              selectedGoal={selectedGoal}
              onAddNew={() => setShowNewGoalModal(true)}
            />
          </div>
        </motion.div>

        <motion.div
          className="h-[40%] w-full hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ProgressCalendar />
        </motion.div>
      </div>
    </div>
  );
};

export default GoalsSection;
