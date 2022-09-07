import { Button, Group, Modal, Space, TextInput } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';

import { addTask } from '@/utils/mutations/addTask';

function AddTask() {
  const [opened, setOpened] = useState(false);
  const [taskName, setTaskName] = useState('');
  const queryClient = useQueryClient();
  const addTaskMutation = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

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
        autoClose: 3000,
      });
    } else if (addTaskMutation.isSuccess) {
      updateNotification({
        id: 'add-task',
        color: 'teal',
        title: 'Success',
        message: `"${addTaskMutation.variables}" added successfully`,
        icon: <AiOutlineCheck size={16} />,
        autoClose: 3000,
      });
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTaskMutation.mutate(taskName);

    setOpened(false);
    setTaskName('');
  };

  return (
    <>
      <Button
        leftIcon={<MdAddCircle size={18} />}
        onClick={() => {
          setOpened(true);
        }}
      >
        Add New Task
      </Button>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title='Add New Task'
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
}

export default AddTask;
