export function scoreTasks(tasks) {
    const urgencyWeight = 2;
    const importanceWeight = 3;
    const durationWeight = 1;
  
    const now = new Date();
  
    return tasks.map(task => {
      const daysUntilDue = (new Date(task.dueDate) - now) / (1000 * 60 * 60 * 24);
      const score =
        urgencyWeight * (1 / (daysUntilDue + 1)) +
        importanceWeight * task.priority -
        durationWeight * task.duration;
  
      return { ...task, score };
    }).sort((a, b) => b.score - a.score);
  }