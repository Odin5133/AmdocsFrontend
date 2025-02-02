import { FaBrain, FaTools, FaBug, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const PracticeSection = ({ practice }) => {
  const sections = [
    {
      key: "active_recall",
      icon: FaBrain,
      color: "text-purple-600 bg-purple-100",
      border: "border-purple-200",
    },
    {
      key: "hands_on_projects",
      icon: FaTools,
      color: "text-green-600 bg-green-100",
      border: "border-green-200",
    },
    {
      key: "debugging_scenarios",
      icon: FaBug,
      color: "text-red-600 bg-red-100",
      border: "border-red-200",
    },
    {
      key: "collaborative_learning",
      icon: FaUsers,
      color: "text-blue-600 bg-blue-100",
      border: "border-blue-200",
    },
  ];

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Practice Activities
      </h3>

      <div className="flex flex-col gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl border-l-4 ${section.border} bg-white shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start mb-4">
              <div className={`p-3 rounded-lg ${section.color} mr-4`}>
                <section.icon className="text-2xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 capitalize">
                  {section.key.replace(/_/g, " ")}
                </h4>
                <ul className="mt-2 space-y-2 text-gray-600 list-disc pl-6">
                  {practice[section.key].map((item, i) => (
                    <li key={i} className="text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PracticeSection;
