import { db, auth } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export async function addTask({ title, dueDate, duration, priority }) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = await addDoc(collection(db, "tasks"), {
    userId: user.uid,
    title,
    dueDate,
    duration,
    priority,
    completed: false,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function saveAISuggestion({ userId, taskId, proposedStartTime, score }) {
  await addDoc(collection(db, "aiSuggestions"), {
    userId,
    taskId,
    proposedStartTime,
    score,
    accepted: false,
  });
}

export async function getUserTasks() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}