"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
  
      console.log("🧠 Firebase user created:", user.uid);
  
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        hasCalendarAccess: false,
        createdAt: new Date(),
      });      
  
      console.log("📝 Firestore user doc created");
  
      // ✅ Defensive: Check router is defined
      if (router) {
        console.log("➡️ Pushing to /home...");
        router.push("/home");
      } else {
        console.warn("⚠️ Router is undefined!");
      }
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignup} className="space-y-6">
          <h2 className="text-2xl font-bold text-orange-400 text-center">Sign Up</h2>

          {/* Name Field */}
          <div>
              <label htmlFor="name" className="block text-sm font-medium text-orange-400">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"
              />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-orange-400">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-orange-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 transition"
          >
            Sign Up
          </button>

          {/* Already have an account? */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-orange-400 hover:text-orange-300 font-semibold">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
