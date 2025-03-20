import { useSidebarStore } from "../app/store/sidebarStore";
import { X } from "lucide-react";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore();

  return (
    <aside className={`fixed top-0 left-0 h-screen w-64 bg-mutedPink p-5 shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Menu</h2>
        <X className="cursor-pointer text-white" onClick={toggleSidebar} />
      </div>
      <ul className="mt-6 space-y-4 text-white">
        <li className="hover:text-lightOrange cursor-pointer">Dashboard</li>
        <li className="hover:text-lightOrange cursor-pointer">Calendar</li>
        <li className="hover:text-lightOrange cursor-pointer">Tasks</li>
        <li className="hover:text-lightOrange cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
}
