import { NavLink } from "react-router-dom";

const Sidebar = ({ onNavigate, onLogout }) => {
  const menuItems = [
    { path: "profile", label: "User Profile" },
    { path: "goals", label: "Goals" },
    { path: "quiz-history", label: "Quiz History" },
    { path: "chatbot", label: "Chatbot" },
    { path: "course-Recommender", label: "Course Recommender" },
    // {path:"edit-profile",label:"Edit Profile"}
  ];

  return (
    <div className="w-64 h-screen bg-[#0e162f] bg-opacity-90 backdrop-blur-lg border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-xl font-bold text-white">Dashboard</h3>
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
          >
            {item.label}
          </NavLink>
        ))}

        {/* Logout Button */}
      </nav>
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
        >
          Edit Profile
        </NavLink>
        <button
          onClick={onLogout}
          className="mt-auto px-4 py-3 text-left rounded-lg text-red-400 hover:bg-red-900/30 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
