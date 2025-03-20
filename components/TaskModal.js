"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function TaskModal({ closeModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
    >
      <motion.div
        className="relative w-96 bg-[#181818] text-white rounded-2xl p-6 shadow-lg border border-gray-600"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={closeModal}>
          <X size={20} />
        </button>

        {/* Card Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">New Task</h2>
          <p className="text-gray-400 mt-2">Add a new task to your planner.</p>

          <input
            type="text"
            placeholder="Task Name"
            className="mt-4 w-full px-4 py-2 rounded-md bg-[#252525] text-white border border-gray-600 focus:outline-none focus:border-gray-400"
          />
          
          <button className="mt-4 px-4 py-2 bg-[#FF9F1C] hover:bg-[#CB997E] transition-all duration-300 rounded-md text-black font-bold">
            Save Task
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

  