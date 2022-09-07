import { Task } from '@/types/task';

export const changeTaskStatus = async (task: Task) => {
  const response = await fetch(`/api/task/${task.id}`, { method: 'PATCH' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
