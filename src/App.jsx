import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Authentication/Auth";
import UD from "./Dashboard/UD";
import GoalsSection from "./Dashboard/Goals/GoalsSection";
import Profile from "./Dashboard/ProfileView/Profile";
import EditProfile from "./Dashboard/ProfileView/EditProfile";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "./Dashboard/DashboardLayout";
import LandingPage from "./HomePage/Home";
import Chatbot from "./chatbot/ChatBot";
import Hist from "./Dashboard/Hist";
import CourseRecommendation from "./Dashboard/CourseRecommendation";

function App() {
  return (
    <>
      <Toaster />
      {/* <LoginForm />
      {/* <UD /> */}
      {/* <GoalsSection /> */}
      {/* Hello */}
      {/* <Profile /> */}
      {/* <EditProfile />  */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/*" element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="goals" element={<GoalsSection />} />
              <Route
                path="quiz/:quiz_id/:goal_id/:type_of/:module_id"
                element={<UD />}
              />
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="quiz-history" element={<Hist />} />
              <Route
                path="course-Recommender"
                element={<CourseRecommendation />}
              />
              <Route path="edit-profile" element={<EditProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
