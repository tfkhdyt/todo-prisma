import { showNotification, updateNotification } from '@mantine/notifications';
import { UseMutationResult } from '@tanstack/react-query';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

import { Task } from '@/types/task';

export const handleEditTaskMutation = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editTaskMutation: UseMutationResult<any, unknown, Task, unknown>
) => {
  if (editTaskMutation.isLoading) {
    showNotification({
      id: `edit-task-${editTaskMutation.variables?.id}`,
      loading: true,
      title: 'Loading...',
      message: 'Wait for a moment',
      autoClose: false,
      disallowClose: true,
    });
  } else {
    if (editTaskMutation.isError) {
      updateNotification({
        id: `edit-task-${editTaskMutation.variables?.id}`,
        color: 'red',
        title: 'Failed',
        message: `"${editTaskMutation.variables?.taskName}" failed to edit`,
        icon: <IoMdClose size={16} />,
        autoClose: 2000,
      });
    } else if (editTaskMutation.isSuccess) {
      updateNotification({
        id: `edit-task-${editTaskMutation.variables?.id}`,
        color: 'teal',
        title: `"${editTaskMutation.variables?.taskName}" updated successfully`,
        message: undefined,
        icon: <AiOutlineCheck size={16} />,
        autoClose: 2000,
      });
    }
  }
};
