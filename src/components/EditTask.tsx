import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Space,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, FormEvent, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

import { Task } from '@/types/task';
import { editTask } from '@/utils/mutations/editTask';

type Props = {
  task: Task;
};

const EditTask: FC<Props> = ({ task }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [taskName, setTaskName] = useState(task.taskName);
  const queryClient = useQueryClient();
  const editTaskMutation = useMutation(editTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

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
        autoClose: 3000,
      });
    } else if (editTaskMutation.isSuccess) {
      updateNotification({
        id: `edit-task-${editTaskMutation.variables?.id}`,
        color: 'teal',
        title: 'Success',
        message: `"${editTaskMutation.variables?.taskName}" updated successfully`,
        icon: <AiOutlineCheck size={16} />,
        autoClose: 3000,
      });
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editTaskMutation.mutate({
      ...task,
      taskName: taskName,
    });

    setOpened(false);
    setTaskName(taskName);
  };

  return (
    <>
      <ActionIcon
        size='lg'
        color='blue.6'
        variant='outline'
        mr={8}
        onClick={() => {
          setOpened(true);
        }}
      >
        <BsFillPencilFill
          size={18}
          color={theme.colors.blue[6]}
          style={{ cursor: 'pointer' }}
        />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setTaskName(task.taskName);
        }}
        title='Edit Task'
        styles={{
          title: {
            fontWeight: 500,
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder='Your task'
            label='Task name'
            radius='md'
            value={taskName}
            data-autofocus
            onChange={(event) => setTaskName(event.currentTarget.value)}
          />
          <Space h='md' />
          <Group position='right'>
            <Button
              color='green'
              leftIcon={<FaSave />}
              variant='light'
              type='submit'
            >
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default EditTask;
