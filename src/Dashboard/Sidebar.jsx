import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";

const Sidebar = ({ onNavigate, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "profile", label: "User Profile" },
    { path: "goals", label: "Goals" },
    { path: "quiz-history", label: "Quiz History" },
    { path: "chatbot", label: "Chatbot" },
    { path: "course-Recommender", label: "Course Recommender" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[#0e162f] bg-opacity-90 backdrop-blur-lg border-r border-gray-800 flex flex-col z-40 `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Dashboard</h3>
          <button
            onClick={toggleSidebar}
            className="text-white bg-[#0e162f] p-2 rounded-full shadow-lg md:hidden"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg transition-all duration-300
                ${
                  isActive
                    ? "bg-gray-800 text-purple-400 border-l-4 border-purple-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-purple-300"
                }`
              }
              onClick={() => setIsOpen(false)} // Directly close sidebar
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Edit Profile and Logout */}
        <div className="p-4 flex flex-col">
          <NavLink
            key="edit-profile"
            to="edit-profile"
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition-all duration-300
              ${
                isActive
                  ? "bg-gray-800 text-purple-400 border-l-4 border-purple-500"
                  : "text-gray-300 hover:bg-gray-800 hover:text-purple-300"
              }`
            }
            onClick={() => setIsOpen(false)} // Directly close sidebar
          >
            Edit Profile
          </NavLink>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false); // Directly close sidebar
            }}
            className="mt-2 px-4 py-3 text-left rounded-lg text-red-400 hover:bg-red-900/30 transition-all duration-300 "
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
