import { Button, Group, Modal, Space, TextInput } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { FormEvent, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';

interface Props {
  mutate: () => void;
}

function AddTodo({ mutate }: Props) {
  const [opened, setOpened] = useState(false);
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    showNotification({
      id: 'add-task',
      loading: true,
      title: 'Loading...',
      message: 'Wait for a moment',
      autoClose: false,
      disallowClose: true,
    });
    try {
      const response = await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify({
          taskName,
        }),
      });
      mutate();
      setOpened(false);
      setTaskName('');
      updateNotification({
        id: 'add-task',
        color: 'teal',
        title: 'Success',
        message: 'Task added successfully',
        icon: <AiOutlineCheck size={16} />,
        autoClose: 3000,
      });
    } catch (err) {
      updateNotification({
        id: 'add-task',
        color: 'red',
        title: 'Failed',
        message: 'Status failed to add',
        icon: <IoMdClose size={16} />,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Button
        leftIcon={<MdAddCircle size={18} />}
        onClick={() => setOpened(true)}
      >
        Add New Task
      </Button>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title='Add New Task'
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder='Your task'
            label='Task name'
            radius='md'
            value={taskName}
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

export default AddTodo;
