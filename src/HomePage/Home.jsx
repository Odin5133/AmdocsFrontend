import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import {
  FaCode,
  FaGraduationCap,
  FaChartLine,
  FaUserCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Components
const HighlightText = ({ text }) => {
  return <span className="font-bold text-richblue-200">{text}</span>;
};

const FeatureCard = ({ icon, title, description, gradient }) => {
  return (
    <div
      className={`flex flex-col items-center p-8 rounded-lg shadow-lg ${gradient} text-white hover:scale-105 transition-transform duration-300`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden bg-richblack-900 text-white bg-gradient-to-br from-[#0e162f] to-[#1a1f3d]">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-richblack-800 to-richblack-900">
        <h1 className="text-6xl font-bold text-center mb-4">
          Welcome to <HighlightText text="PathFinder AI" />
        </h1>
        <p className="text-richblack-300 text-lg text-center mb-8 max-w-2xl">
          Your AI-driven Personalized Adaptive Learning (PAL) system that
          creates tailored learning plans to help you achieve your academic and
          career goals.
        </p>
        <div className="flex gap-4">
          <button
            className="bg-yellow-50 text-black px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200"
            onClick={() => navigate("/auth?mode=login")}
          >
            Get Started
          </button>
          <button className="bg-richblack-800 text-white px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>

      {/* Why Adaptive Learning? */}
      <div className="py-20 px-8 bg-richblack-800">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why <HighlightText text="Adaptive Learning?" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaGraduationCap />}
            title="Personalized Education"
            description="Traditional one-size-fits-all education fails to address individual learning needs. Adaptive learning tailors content to each learner's pace and style."
            gradient="bg-gradient-to-r from-blue-600 to-purple-600"
          />
          <FeatureCard
            icon={<FaChartLine />}
            title="Dynamic Progress Tracking"
            description="Adaptive systems continuously monitor progress and adjust content to ensure optimal learning outcomes."
            gradient="bg-gradient-to-r from-green-600 to-teal-600"
          />
          <FeatureCard
            icon={<FaUserCheck />}
            title="Enhanced Engagement"
            description="Learners stay motivated with personalized feedback, gamification, and interactive content."
            gradient="bg-gradient-to-r from-orange-600 to-red-600"
          />
        </div>
      </div>

      {/* The Problem */}
      <div className="py-20 px-8 bg-richblack-900">
        <h2 className="text-4xl font-bold text-center mb-12">
          The <HighlightText text="Problem" />
        </h2>
        <div className="max-w-4xl mx-auto text-richblack-300 text-lg">
          <p className="mb-4">
            In today's fast-paced world, learners face several challenges:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Generic Learning Paths:</strong> Most platforms offer
              standardized courses that don't account for individual skill
              levels or goals.
            </li>
            <li>
              <strong>Lack of Personalization:</strong> Without tailored
              recommendations, learners waste time on irrelevant content.
            </li>
            <li>
              <strong>Low Engagement:</strong> Traditional methods often fail to
              keep learners motivated, leading to high dropout rates.
            </li>
            <li>
              <strong>Inefficient Progress Tracking:</strong> Without real-time
              feedback, learners struggle to identify areas for improvement.
            </li>
          </ul>
        </div>
      </div>

      {/* The Solution */}
      <div className="py-20 px-8 bg-richblack-800">
        <h2 className="text-4xl font-bold text-center mb-12">
          The <HighlightText text="Solution" />
        </h2>
        <div className="max-w-4xl mx-auto text-richblack-300 text-lg">
          <p className="mb-4">
            <strong>PathFinder AI</strong> addresses these challenges with:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personalized Learning Paths:</strong> AI-driven
              recommendations tailored to your skills, goals, and preferences.
            </li>
            <li>
              <strong>Adaptive Algorithms:</strong> Dynamic adjustments to your
              learning path based on performance and feedback.
            </li>
            <li>
              <strong>Gamified Learning:</strong> Engage with streaks,
              leaderboards, and badges to stay motivated.
            </li>
            <li>
              <strong>Real-Time Progress Tracking:</strong> Visual milestones
              and analytics to monitor your growth.
            </li>
          </ul>
        </div>
      </div>

      {/* Implementation Details */}
      <div className="py-20 px-8 bg-richblack-900">
        <h2 className="text-4xl font-bold text-center mb-12">
          How It <HighlightText text="Works" />
        </h2>
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4">
                1. User Registration and Profile Setup
              </h3>
              <p className="text-richblack-300">
                Users register with their name, email, and upload their Resume,
                along with links to platforms like LinkedIn, GitHub, and
                LeetCode. Skills are extracted from their resume and other
                sources using web scraping to build an initial profile.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-richblack-800 p-8 rounded-lg shadow-lg">
                <TypeAnimation
                  sequence={[
                    "Upload Resume...",
                    1000,
                    "Extracting Skills...",
                    1000,
                    "Profile Created!",
                    1000,
                  ]}
                  repeat={Infinity}
                  cursor={true}
                  style={{ whiteSpace: "pre-line", display: "block" }}
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-richblack-800 p-8 rounded-lg shadow-lg">
                <TypeAnimation
                  sequence={[
                    "Define SMART Goals...",
                    1000,
                    "Analyzing Feasibility...",
                    1000,
                    "Goals Approved!",
                    1000,
                  ]}
                  repeat={Infinity}
                  cursor={true}
                  style={{ whiteSpace: "pre-line", display: "block" }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4">
                2. Goal Setting and Feasibility Analysis
              </h3>
              <p className="text-richblack-300">
                Users define SMART (Specific, Measurable, Achievable, Relevant,
                Time-bound) goals, tagged with domains like data science or web
                development. AI evaluates feasibility based on skill profiles,
                goal type, and timeline, providing feedback to refine goals.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4">
                3. Personalized Learning Path Recommendation
              </h3>
              <p className="text-richblack-300">
                Learning paths are divided into Learning Cells, each containing
                curated resources like courses, videos, articles, and hands-on
                projects. Practice guidelines and assessment tests are generated
                using LLaMA and Mistral AI models.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-richblack-800 p-8 rounded-lg shadow-lg">
                <TypeAnimation
                  sequence={[
                    "Analyzing Preferences...",
                    1000,
                    "Generating Learning Path...",
                    1000,
                    "Path Ready!",
                    1000,
                  ]}
                  repeat={Infinity}
                  cursor={true}
                  style={{ whiteSpace: "pre-line", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-20 px-8 bg-richblack-800">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our <HighlightText text="Tech Stack" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaCode />}
            title="Frontend"
            description="React.js for responsive UI."
            gradient="bg-gradient-to-r from-blue-600 to-purple-600"
          />
          <FeatureCard
            icon={<FaCode />}
            title="Backend"
            description="Django and Django REST Framework (DRF) for API development."
            gradient="bg-gradient-to-r from-green-600 to-teal-600"
          />
          <FeatureCard
            icon={<FaCode />}
            title="Database"
            description="MySQL for structured data and Qdrant for vector-based recommendations."
            gradient="bg-gradient-to-r from-orange-600 to-red-600"
          />
          <FeatureCard
            icon={<FaCode />}
            title="AI Models"
            description="LLaMA and Mistral AI for NLP tasks."
            gradient="bg-gradient-to-r from-purple-600 to-pink-600"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-richblack-900 text-white py-8 text-center">
        <p>© 2023 PathFinder AI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
