"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, ClipboardList } from "lucide-react";
import TaskModal from "@/components/TaskModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 bg-black text-white">
      <h1 className="text-5xl font-bold text-white flex items-center gap-2">
        Plan Your Day <ClipboardList className="w-6 h-6" />
      </h1>
      <p className="text-gray-400 text-lg">Stay organized with your tasks and meetings.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <Card className="w-72 shadow-lg hover:shadow-2xl bg-[#181818] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calendar className="w-6 h-6 text-[#FF9F1C]" /> Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">View and manage your events seamlessly.</p>
          </CardContent>
        </Card>

        <Card className="w-72 shadow-lg hover:shadow-2xl bg-[#181818] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CheckCircle className="w-6 h-6 text-[#FFBF69]" /> Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Track and complete your daily tasks efficiently.</p>
          </CardContent>
        </Card>

        <Card className="w-72 shadow-lg hover:shadow-2xl bg-[#181818] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="w-6 h-6 text-[#CB997E]" /> Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Get notified about your important meetings.</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Task Button */}
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="group relative h-16 w-64 border border-white text-white text-lg font-bold rounded-lg overflow-hidden transition-all duration-500
          before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:bg-violet-500 before:rounded-full before:blur-lg
          after:absolute after:w-20 after:h-20 after:content-[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
      >
        Add Task
      </motion.button>

      {/* Task Modal */}
      {showModal && <TaskModal closeModal={() => setShowModal(false)} />}
    </div>
  );
}
