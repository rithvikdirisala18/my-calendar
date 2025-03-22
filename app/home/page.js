"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // 🔒 Not logged in → redirect to login
        router.push("/login");
      } else {
        setLoading(false); // ✅ Authenticated
      }
    });

    return () => unsubscribe(); // cleanup
  }, [router]);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Welcome to your Home Dashboard 🏠</h1>
      {/* You can show calendar/events here */}
    </div>
  );
}
