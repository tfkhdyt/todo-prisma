import { Button, Group, Modal, Space, TextInput, Tooltip } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleAddTaskMutation } from 'handlers/handleAddTaskMutation';
import { FormEvent, useState } from 'react';
import { FaSave } from 'react-icons/fa';
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
  useHotkeys([['ctrl+E ', () => setOpened((state) => !state)]]);

  handleAddTaskMutation(addTaskMutation);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTaskMutation.mutate(taskName);

    setOpened(false);
    setTaskName('');
  };

  return (
    <>
      <Tooltip label='Ctrl + E' position='bottom' withArrow>
        <Button
          leftIcon={<MdAddCircle size={18} />}
          onClick={() => {
            setOpened(true);
          }}
        >
          Add New Task
        </Button>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setTaskName('');
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
