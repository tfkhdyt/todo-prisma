export const addTask = async (taskName: string) => {
  const response = await fetch(`/api/task/`, {
    method: 'POST',
    body: JSON.stringify({
      taskName,
    }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
