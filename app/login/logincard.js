"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { useRouter } from "next/navigation";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

const handleEmailLogin = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Logged in");
    router.push("/home"); // 🔁 redirect
  } catch (err) {
    setError(err.message);
  }
};

const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/calendar");

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    console.log("✅ Google login");
    router.push("/home"); // 🔁 redirect
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <form onSubmit={handleEmailLogin} className="space-y-6">

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-orange-400">
          Email address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md px-3 py-1.5 bg-white text-black"
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-orange-400">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md px-3 py-1.5 bg-white text-black"
        />
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Sign in Button */}
      <button
        type="submit"
        className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 transition"
      >
        Sign In
      </button>

      {/* Divider */}
      <div className="text-center text-sm text-gray-400">or</div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full border border-orange-400 text-orange-400 py-2 rounded-md hover:bg-orange-500 hover:text-white transition"
      >
        Sign in with Google
      </button>
    </form>
  );
}
