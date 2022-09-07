import { Task } from '@/types/task';

export const editTask = async (task: Task) => {
  const response = await fetch(`/api/task/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      taskName: task.taskName,
      isDone: task.isDone,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
