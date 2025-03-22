// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCRQuqMoEGV5W9EbahrxX0ARWkFMK4Q91g",
  authDomain: "my-calendar-65683.firebaseapp.com",
  projectId: "my-calendar-65683",
  storageBucket: "my-calendar-65683.appspot.com", // small fix on your storageBucket
  messagingSenderId: "1072099817162",
  appId: "1:1072099817162:web:de9a5667a0c5857ab32633",
  measurementId: "G-CXKGCW6L0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(app);

// Optional: Only init analytics if supported (prevents issues in server-side Next.js)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, analytics };
