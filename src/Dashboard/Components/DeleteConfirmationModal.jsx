import Modal from "react-modal";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#root");

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
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

        <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Goal</h2>
        <p className="text-gray-600 mb-6">
          All progress will be lost. Are you sure you want to delete it?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            No, Keep It
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
