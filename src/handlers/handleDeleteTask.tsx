import { Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { UseMutationResult } from '@tanstack/react-query';

import { Task } from '@/types/task';

export const handleDeleteTask = (
  taskName: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteMutation: UseMutationResult<any, unknown, Task, unknown>
) => {
  openConfirmModal({
    title: `Delete ${taskName}`,
    centered: true,
    children: (
      <Text size='sm'>Are you sure you want to delete "{taskName}'?</Text>
    ),
    labels: { confirm: 'Delete', cancel: "No don't delete it" },
    confirmProps: { color: 'red' },
    onConfirm: () => {
      deleteMutation.mutate({ id, taskName });
    },
    styles: {
      title: {
        fontWeight: 500,
      },
    },
  });
};
