import { showNotification, updateNotification } from '@mantine/notifications';
import { UseMutationResult } from '@tanstack/react-query';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

import { Task } from '@/types/task';

export const handleDeleteTaskMutation = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteTaskMutation: UseMutationResult<any, unknown, Task, unknown>
) => {
  if (deleteTaskMutation.isLoading) {
    showNotification({
      id: `delete-status-${deleteTaskMutation.variables?.id}`,
      loading: true,
      title: 'Loading...',
      message: 'Wait for a moment',
      autoClose: false,
      disallowClose: true,
    });
  } else {
    if (deleteTaskMutation.isError) {
      updateNotification({
        id: `delete-status-${deleteTaskMutation.variables?.id}`,
        color: 'red',
        title: 'Failed',
        message: `"${deleteTaskMutation.variables?.taskName}" failed to delete`,
        icon: <IoMdClose size={16} />,
        autoClose: 3000,
      });
    } else if (deleteTaskMutation.isSuccess) {
      updateNotification({
        id: `delete-status-${deleteTaskMutation.variables?.id}`,
        color: 'teal',
        title: 'Success',
        message: `"${deleteTaskMutation.variables?.taskName}" deleted successfully`,
        icon: <AiOutlineCheck size={16} />,
        autoClose: 3000,
      });
    }
  }
};
