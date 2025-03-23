import { getUserTasks, saveAISuggestion } from "@/firebase/firestoreModels";
import { scoreTasks } from "@/utils/taskScoring";
import { auth } from "@/lib/firebase";

export default async function handler(req, res) {
  try {
    const tasks = await getUserTasks();
    const scored = scoreTasks(tasks);

    // For now, suggest a fake slot tomorrow at 10AM
    const user = auth.currentUser;
    const fakeSlot = new Date();
    fakeSlot.setDate(fakeSlot.getDate() + 1);
    fakeSlot.setHours(10, 0, 0, 0);

    await Promise.all(
      scored.map(task =>
        saveAISuggestion({
          userId: user.uid,
          taskId: task.id,
          proposedStartTime: fakeSlot.toISOString(),
          score: task.score,
        })
      )
    );

    res.status(200).json({ message: "Suggestions generated" });
  } catch (error) {
    console.error("Scheduling error:", error);
    res.status(500).json({ error: error.message });
  }
}
