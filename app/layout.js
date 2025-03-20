"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebarStore } from "./store/sidebarStore";

export default function RootLayout({ children }) {
  const { isOpen } = useSidebarStore();

  return (
    <html lang="en">
      <body className="flex bg-palePeach">
        {isOpen && <Sidebar />}
        <div className="flex-1">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
