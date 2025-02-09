import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    //console.log(Cookies.get("access"));
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://amdocs-backend.onrender.com/auth/users/me",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access")}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data");
        //console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const excludedFields = ["password", "id"];
  const personalInfo = ["username", "email", "first_name", "last_name"];
  const socialLinks = ["linkedin_url", "github_url", "leetcode_url"];
  const locationInfo = ["city", "college"];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:mt-10 ">
      <h2 className="text-3xl font-bold mb-8 text-lime-600 text-center ">
        Profile Information
      </h2>

      {/* Personal Information Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5 }}
        className="mb-8 bg-blue-50 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4 text-blue-800">Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalInfo.map((key) => (
            <div key={key} className="">
              <span className="w-32 text-gray-600 font-medium capitalize">
                {key.replace(/_/g, " ")}:
              </span>
              <span className="text-gray-800 pl-2">
                {profileData[key] || "Not provided"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Social Links Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 bg-purple-50 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4 text-purple-800">
          Social Links
        </h3>
        <div className="space-y-3">
          {socialLinks.map((key) => (
            <div key={key} className="">
              <span className="w-32 text-gray-600 font-medium capitalize">
                {key.replace(/_url/g, "").replace(/_/g, " ")}:
              </span>
              <span className="text-gray-800 truncate pl-2">
                {profileData[key] || "Not provided"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Location & Education Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-green-50 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4 text-green-800">
          Location & Education
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locationInfo.map((key) => (
            <div key={key} className="">
              <span className="w-32 text-gray-600 font-medium capitalize">
                {key} :
              </span>
              <span className="text-gray-800 pl-2">
                {profileData[key] || "Not provided"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
