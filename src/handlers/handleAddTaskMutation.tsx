import { showNotification, updateNotification } from '@mantine/notifications';
import { UseMutationResult } from '@tanstack/react-query';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

export const handleAddTaskMutation = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addTaskMutation: UseMutationResult<any, unknown, string, unknown>
) => {
  if (addTaskMutation.isLoading) {
    showNotification({
      id: 'add-task',
      loading: true,
      title: 'Loading...',
      message: 'Wait for a moment',
      autoClose: false,
      disallowClose: true,
    });
  } else {
    if (addTaskMutation.isError) {
      updateNotification({
        id: 'add-task',
        color: 'red',
        title: 'Failed',
        message: `"${addTaskMutation.variables}" failed to add`,
        icon: <IoMdClose size={16} />,
        autoClose: 2000,
      });
    } else if (addTaskMutation.isSuccess) {
      updateNotification({
        id: 'add-task',
        color: 'teal',
        title: `"${addTaskMutation.variables}" added successfully`,
        message: undefined,
        icon: <AiOutlineCheck size={16} />,
        autoClose: 2000,
      });
    }
  }
};
