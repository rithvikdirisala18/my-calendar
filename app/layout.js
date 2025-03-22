"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebarStore } from "./store/sidebarStore";

export default function RootLayout({ children }) {
  const { isOpen } = useSidebarStore();

  return (
    <html lang="en">
      <head>
        {/* ✅ Add Google Fonts here */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      </head>
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