"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ User signed up!");
      // Redirect to login or dashboard if needed
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignup} className="space-y-6">

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-orange-400">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-orange-400">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"
              />
            </div>

            <div className="text-sm mt-2">
              <a href="/login" className="font-semibold text-orange-400 hover:text-orange-300">
                Already have an account?
              </a>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-300 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
