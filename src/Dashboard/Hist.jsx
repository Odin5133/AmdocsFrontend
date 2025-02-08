import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import QuizHistory from "./Components/QuizHistory"; // Adjust path as necessary

function Hist() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios
      .get("https://amdocs-backend.onrender.com/api/scores/", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setScores(res.data.results); // Set the fetched scores
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {/* <h1>Quiz History</h1> */}
      {scores.length > 0 ? (
        <QuizHistory scores={scores} />
      ) : (
        <p>No quiz history available.</p>
      )}
    </div>
  );
}

export default Hist;
