"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import CalendarView from "@/components/CalendarView";
import AddTaskModal from "@/components/AddTaskModal";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [hasCalendarAccess, setHasCalendarAccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [tasks, setTasks] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserName(data.name || "User");
          setHasCalendarAccess(data.hasCalendarAccess || false);
        } else {
          await setDoc(userRef, {
            name: "User",
            hasCalendarAccess: false,
          });
        }

        const taskRef = collection(db, "users", user.uid, "tasks");
        const taskSnap = await getDocs(taskRef);
        const userTasks = taskSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(userTasks);

        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const requestCalendarAccess = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/calendar");

      const result = await reauthenticateWithPopup(user, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      console.log("✅ Google Calendar access granted:", accessToken);

      await updateDoc(doc(db, "users", user.uid), {
        hasCalendarAccess: true,
      });

      setHasCalendarAccess(true);
    } catch (err) {
      console.error("❌ Calendar access error", err);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white max-w-5xl mx-auto mt-12 text-center">
      {showWelcome && (
        <div className="mb-12">
          <div className="text-center mt-8 mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              Welcome, {userName} <span className="inline-block animate-wave">👋</span>
            </h1>
          </div>

          <p className="text-lg text-orange-200 mt-2">Let's make today productive ✨</p>

          <div className="mt-4 w-full max-w-3xl mx-auto">
            <svg
              className="w-full h-16 opacity-60 animate-pulse transition-opacity duration-1000"
              viewBox="0 0 2400 150"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="wave-grad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
              <path
                d="M 0 120 Q 400 60 800 120 Q 1200 180 1600 120 Q 2000 60 2400 120 L 2400 150 L 0 150 Z"
                fill="url(#wave-grad)"
              />
            </svg>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Welcome to your Home Dashboard 🏠</h1>

      {hasCalendarAccess ? (
        <p className="text-green-400">✅ Calendar access is enabled.</p>
      ) : (
        <div className="space-y-4 mb-6">
          <p className="text-orange-300">You haven’t connected your Google Calendar yet.</p>
          <button
            onClick={requestCalendarAccess}
            className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition"
          >
            Connect Google Calendar
          </button>
        </div>
      )}

      <div className="mb-10 justify-center">
        <AddTaskModal userId={auth.currentUser?.uid} onTaskCreated={setTasks}/>
      </div>

      <CalendarView tasks={tasks} />
    </div>
  );
}