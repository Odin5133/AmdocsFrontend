import React from "react";
import { TypeAnimation } from "react-type-animation";
import {
  FaCode,
  FaGraduationCap,
  FaChartLine,
  FaUserCheck,
  FaChevronDown,
  FaExclamationTriangle,
  FaRegSadCry,
  FaRegTired,
  FaRegFrown,
  FaBrain,
  FaRobot,
  FaGamepad,
  FaChartBar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Highlight text component
const HighlightText = ({ text }) => (
  <span className="font-bold text-yellow-300">{text}</span>
);

// Feature Card Component with hover scale and shadow
const FeatureCard = ({ icon, title, description, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex flex-col items-center p-8 rounded-xl shadow-lg ${gradient} text-white`}
  >
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-center text-sm">{description}</p>
  </motion.div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden bg-richblack-900 bg-gradient-to-br from-[#0e162f] to-[#1a1f3d] text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0e162f] to-[#1a1f3d] relative">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-center mb-4 px-4"
        >
          Welcome to <HighlightText text="PathFinder AI" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-richblack-300 text-lg text-center mb-8 max-w-2xl px-4"
        >
          Your AI-driven Personalized Adaptive Learning (PAL) system that
          creates tailored learning plans to help you achieve your academic and
          career goals.
        </motion.p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/auth?mode=login")}
            className="bg-yellow-50 text-black px-6 py-3 rounded-md font-bold hover:scale-95 transition transform duration-200"
          >
            Get Started
          </button>
        </div>
        {/* Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 cursor-pointer"
          onClick={() =>
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <FaChevronDown className="text-3xl text-yellow-300" />
        </motion.div>
      </section>

      {/* Why Adaptive Learning? */}
      <section className="py-20 px-8 bg-richblack-800 my-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Why <HighlightText text="Adaptive Learning?" />
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaGraduationCap />}
            title="Personalized Education"
            description="Tailors content to your pace and style."
            gradient="bg-gradient-to-r from-blue-600 to-purple-600"
          />
          <FeatureCard
            icon={<FaChartLine />}
            title="Dynamic Progress Tracking"
            description="Monitors progress and adjusts content in real-time."
            gradient="bg-gradient-to-r from-green-600 to-teal-600"
          />
          <FeatureCard
            icon={<FaUserCheck />}
            title="Enhanced Engagement"
            description="Keeps you motivated with interactive content."
            gradient="bg-gradient-to-r from-orange-600 to-red-600"
          />
        </div>
      </section>

      {/* The Problem */}

      <section className="py-20 px-8 bg-[#151c38] my-5">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          The <HighlightText text="Problem" />
        </motion.h2>
        <div className="max-w-4xl mx-auto text-richblack-300 text-lg">
          <p className="mb-4 text-center">
            In today's fast-paced world, learners face several challenges:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center bg-[#1f2a48] p-6 rounded-lg shadow-lg"
            >
              <FaExclamationTriangle className="text-yellow-300 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold">
                  Generic Learning Paths
                </h3>
                <p>Standardized courses don’t fit every learner.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center bg-[#1f2a48] p-6 rounded-lg shadow-lg"
            >
              <FaRegSadCry className="text-blue-300 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold">
                  Lack of Personalization
                </h3>
                <p>Wasting time on irrelevant content.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center bg-[#1f2a48] p-6 rounded-lg shadow-lg"
            >
              <FaRegTired className="text-red-300 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Low Engagement</h3>
                <p>Traditional methods lead to dropout.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center bg-[#1f2a48] p-6 rounded-lg shadow-lg"
            >
              <FaRegFrown className="text-green-300 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold">
                  Inefficient Progress Tracking
                </h3>
                <p>Struggle to identify improvement areas.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Solution */}

      <section className="py-20 px-8 bg-[#1a1f3d]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          The <HighlightText text="Solution" />
        </motion.h2>
        <div className="max-w-4xl mx-auto text-richblack-300 text-lg">
          <p className="mb-4 text-center">
            <strong>PathFinder AI</strong> addresses these challenges by
            offering:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center bg-[#222a4c] p-6 rounded-lg shadow-lg hover:bg-[#4a5585] transition-colors duration-300"
            >
              <FaBrain className="text-yellow-300 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Personalized Learning Paths
                </h3>
                <p className="text-white">AI-tailored recommendations.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center bg-[#222a4c] p-6 rounded-lg shadow-lg hover:bg-[#4a5585] transition-colors duration-300"
            >
              <FaRobot className="text-blue-300 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Adaptive Algorithms
                </h3>
                <p className="text-white">
                  Dynamically adjust your learning journey.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center bg-[#222a4c] p-6 rounded-lg shadow-lg hover:bg-[#4a5585] transition-colors duration-300"
            >
              <FaGamepad className="text-red-300 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Gamified Learning
                </h3>
                <p className="text-white">
                  Stay engaged with streaks and badges.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center bg-[#222a4c] p-6 rounded-lg shadow-lg hover:bg-[#4a5585] transition-colors duration-300"
            >
              <FaChartBar className="text-green-300 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Real-Time Progress Tracking
                </h3>
                <p className="text-white">Monitor your growth visually.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-8 bg-richblack-900">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          How It <HighlightText text="Works" />
        </motion.h2>
        <div className="space-y-12 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div
            className="flex  md:flex-row items-center gap-8 flex-col
md:pt-14"
          >
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4">
                1. User Registration & Profile Setup
              </h3>
              <p className="text-richblack-300">
                Register using your details and upload your resume. We extract
                your skills using web scraping to create a tailored profile.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-richblack-800 p-8 rounded-xl shadow-xl">
                <TypeAnimation
                  sequence={[
                    "Uploading Resume...",
                    1000,
                    "Extracting Skills...",
                    1000,
                    "Profile Created!",
                    1000,
                  ]}
                  repeat={Infinity}
                  cursor={true}
                  style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    fontSize: "1.25rem",
                    color: "#FBBF24",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex md:flex-row flex-col-reverse items-center gap-8 md:pt-28 pt-14">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-richblack-800 p-8 rounded-xl shadow-xl">
                <TypeAnimation
                  sequence={[
                    "Defining SMART Goals...",
                    1000,
                    "Analyzing Feasibility...",
                    1000,
                    "Goals Approved!",
                    1000,
                  ]}
                  repeat={Infinity}
                  cursor={true}
                  style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    fontSize: "1.25rem",
                    color: "#FBBF24",
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4">
                2. Goal Setting & Feasibility Analysis
              </h3>
              <p className="text-richblack-300">
                Define SMART goals, tagged with domains like data science or web
                development. Our AI analyzes feasibility based on your skill
                profile.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div
            className="flex md:flex-row items-center gap-8 flex-col
md:pt-28 pt-14"
          >
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4">
                3. Personalized Learning Path Recommendation
              </h3>
              <p className="text-richblack-300">
                Learning paths are divided into cells with curated resources
                including courses, videos, articles, and hands-on projects.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-richblack-800 p-8 rounded-xl shadow-xl">
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
                  style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    fontSize: "1.25rem",
                    color: "#FBBF24",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex md:flex-row flex-col-reverse items-center gap-8 md:pt-28 pt-14">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-richblack-800 p-8 rounded-xl shadow-xl">
                <TypeAnimation
                  sequence={[
                    " Graph Generation...",
                    1000,
                    " Skill Showcase... ",
                    1000,
                    " Gamified Environment!",
                    1000,
                  ]}
                  repeat={Infinity}
                  cursor={true}
                  style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    fontSize: "1.25rem",
                    color: "#FBBF24",
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4">
                4. Knowledge Graph Generation
              </h3>
              <p className="text-richblack-300">
                Personalised knowledge graph is created for each user showcasing
                various skills and their level of expertise for each skill. This
                can be easily shared with users to create a gamified environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-8 bg-[#1a1f3d]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our <HighlightText text="Tech Stack" />
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<FaCode />}
            title="Frontend"
            description="React.js for a responsive UI."
            gradient="bg-gradient-to-r from-blue-600 to-purple-600"
          />
          <FeatureCard
            icon={<FaCode />}
            title="Backend"
            description="Django & DRF for robust APIs."
            gradient="bg-gradient-to-r from-green-600 to-teal-600"
          />
          <FeatureCard
            icon={<FaCode />}
            title="Database"
            description="PostgreSQL for structured data ,Qdrant for vector search and Neo4j for personalised Knowledge Graph"
            gradient="bg-gradient-to-r from-orange-600 to-red-600"
          />
          <FeatureCard
            icon={<FaCode />}
            title="AI Models"
            description="Deepseek & Mistral for cutting-edge NLP."
            gradient="bg-gradient-to-r from-purple-600 to-pink-600"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-richblack-900 text-white py-8 text-center">
        <p>© 2025 PathFinder AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
