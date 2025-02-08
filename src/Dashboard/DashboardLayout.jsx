import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/dashboard/${path}`);
  };

  const handleLogout = () => {
    Cookies.remove("access");
    navigate("/");
  };

  return (
    <div className="flex  flex-col min-h-screen bg-gradient-to-br from-[#0e162f] to-[#1a1f3d]">
      {/* Top Bar */}
      <div className="flex md:hidden items-center justify-between p-4 bg-[#0e162f] bg-opacity-90 backdrop-blur-lg border-b border-gray-800">
        <div className="flex items-center">
          <button
            onClick={() =>
              document
                .getElementById("sidebar")
                .classList.toggle("translate-x-0")
            }
            className="text-white bg-[#0e162f] p-2 rounded-full shadow-lg md:hidden"
          >
            <FiMenu size={24} />
          </button>
          <h3 className="text-xl font-bold text-white ml-4">Dashboard</h3>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigation} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 py-4 md:px-8 md:mt-0 md:overflow-y-auto md:ml-64">
        <div className="md:h-[95vh] max-w-full md:max-w-7xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl shadow-xl border border-gray-800 md:px-4 md:flex justify-center items-center md:w-full px-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
