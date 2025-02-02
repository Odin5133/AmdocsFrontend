import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

// Make sure to bind modal to your app element
Modal.setAppElement("#root");

const NewGoalModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    months: 0,
    days: 0,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.months < 0) newErrors.months = "Invalid months";
    if (formData.days < 0) newErrors.days = "Invalid days";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl p-6 max-w-md mx-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Goal
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Months
              </label>
              <input
                type="number"
                name="months"
                value={formData.months}
                onChange={(e) =>
                  setFormData({ ...formData, months: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.months && (
                <p className="text-red-500 text-sm">{errors.months}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Days
              </label>
              <input
                type="number"
                name="days"
                value={formData.days}
                onChange={(e) =>
                  setFormData({ ...formData, days: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.days && (
                <p className="text-red-500 text-sm">{errors.days}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};

export default NewGoalModal;
