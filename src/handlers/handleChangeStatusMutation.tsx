import { showNotification, updateNotification } from '@mantine/notifications';
import { UseMutationResult } from '@tanstack/react-query';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

import { Task } from '@/types/task';

export const handleChangeStatusMutation = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeStatusMutation: UseMutationResult<any, unknown, Task, unknown>
) => {
  if (changeStatusMutation.isLoading) {
    showNotification({
      id: `change-status-${changeStatusMutation.variables?.id}`,
      loading: true,
      title: 'Loading...',
      message: 'Wait for a moment',
      autoClose: false,
      disallowClose: true,
    });
  } else {
    if (changeStatusMutation.isError) {
      updateNotification({
        id: `change-status-${changeStatusMutation.variables?.id}`,
        color: 'red',
        title: 'Failed',
        message: `"${changeStatusMutation.variables?.taskName}" failed to change`,
        icon: <IoMdClose size={16} />,
        autoClose: 3000,
      });
    } else if (changeStatusMutation.isSuccess) {
      updateNotification({
        id: `change-status-${changeStatusMutation.variables?.id}`,
        color: 'teal',
        title: 'Success',
        message: `"${changeStatusMutation.variables?.taskName}" status changed successfully`,
        icon: <AiOutlineCheck size={16} />,
        autoClose: 3000,
      });
    }
  }
};
