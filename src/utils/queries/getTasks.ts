export const getTasks = async () => {
  const response = await fetch('/api/task');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
