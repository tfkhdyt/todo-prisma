/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Box,
  Center,
  Checkbox,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { UseMutationResult } from '@tanstack/react-query';
import { handleDeleteTask } from 'handlers/handleDeleteTask';
import { FC } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { Task } from '@/types/task';

import EditTask from './EditTask';

type Props = {
  data: Task[];
  changeStatusMutation: UseMutationResult<any, unknown, Task, unknown>;
  deleteTaskMutation: UseMutationResult<any, unknown, Task, unknown>;
};

const List: FC<Props> = ({
  data,
  changeStatusMutation,
  deleteTaskMutation,
}) => {
  const theme = useMantineTheme();

  return (
    <>
      {data.length > 0 ? (
        data
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((value, idx) => (
            <Center
              inline
              key={idx}
              mb='sm'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Checkbox
                label={
                  <Text strikethrough={value.isDone} sx={{ cursor: 'pointer' }}>
                    {value.taskName}
                  </Text>
                }
                radius='xl'
                size='md'
                checked={value.isDone}
                onChange={(e) =>
                  changeStatusMutation.mutate({
                    id: value.id,
                    taskName: value.taskName,
                    isDone: e.target.checked,
                  })
                }
                styles={{
                  input: {
                    cursor: 'pointer',
                  },
                }}
              />
              <Box sx={{ display: 'flex' }}>
                <EditTask task={value} />
                <ActionIcon size='lg' color='red.7' variant='outline'>
                  <FaTrashAlt
                    size={18}
                    color={theme.colors.red[7]}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      handleDeleteTask(
                        value.taskName,
                        value.id,
                        deleteTaskMutation
                      )
                    }
                  />
                </ActionIcon>
              </Box>
            </Center>
          ))
      ) : (
        <Center>
          <Text>Task still empty, please add some</Text>
        </Center>
      )}
    </>
  );
};

export default List;
