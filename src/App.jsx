import React, { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "./HomePage/Home";

// Lazy load components
const LoginForm = lazy(() => import("./Authentication/Auth"));
const UD = lazy(() => import("./Dashboard/UD"));
const GoalsSection = lazy(() => import("./Dashboard/Goals/GoalsSection"));
const Profile = lazy(() => import("./Dashboard/ProfileView/Profile"));
const EditProfile = lazy(() => import("./Dashboard/ProfileView/EditProfile"));
const DashboardLayout = lazy(() => import("./Dashboard/DashboardLayout"));
const Chatbot = lazy(() => import("./chatbot/ChatBot"));
const Hist = lazy(() => import("./Dashboard/Hist"));
const CourseRecommendation = lazy(() =>
  import("./Dashboard/CourseRecommendation")
);

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
