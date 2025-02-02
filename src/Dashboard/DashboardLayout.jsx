import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";

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
    <div className="flex min-h-screen bg-gradient-to-br from-[#0e162f] to-[#1a1f3d]">
      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigation} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 px-8 mt-6 overflow-y-auto">
        <div className="h-[95vh] max-w-7xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl shadow-xl border border-gray-800 p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
