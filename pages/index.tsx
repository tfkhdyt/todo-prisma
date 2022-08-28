import {
  Alert,
  Box,
  Checkbox,
  Group,
  LoadingOverlay,
  Space,
  Text,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
import { AiFillAlert, AiOutlineCheck } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import useSWR from 'swr';

import AddTodo from '../components/AddTodo';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { Task } from '../types/task';

const fetcher = (link: string) => fetch(link).then((res) => res.json());

const Home = () => {
  const { data, error, mutate } = useSWR<Task[]>('/api/task', fetcher);
  const { data: session, status } = useSession();

  const handleChange = async (id: string) => {
    showNotification({
      id: `change-status-${id}`,
      loading: true,
      title: 'Loading...',
      message: 'Wait for a moment',
      autoClose: false,
      disallowClose: true,
    });
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (!res.ok) {
        updateNotification({
          id: `change-status-${id}`,
          color: 'red',
          title: 'Failed',
          message: `"${data.taskName}" failed to change`,
          icon: <IoMdClose size={16} />,
          autoClose: 3000,
        });
      }
      mutate();
      updateNotification({
        id: `change-status-${id}`,
        color: 'teal',
        title: 'Success',
        message: `"${data.taskName}" status changed successfully`,
        icon: <AiOutlineCheck size={16} />,
        autoClose: 3000,
      });
    } catch (err) {
      updateNotification({
        id: `change-status-${id}`,
        color: 'red',
        title: 'Failed',
        message: 'Status failed to change',
        icon: <IoMdClose size={16} />,
        autoClose: 3000,
      });
    }
  };

  const handleDelete = (taskName: string, id: number) => {
    openConfirmModal({
      title: `Delete ${taskName}`,
      centered: true,
      children: (
        <Text size='sm'>Are you sure you want to delete {taskName}?</Text>
      ),
      labels: { confirm: 'Delete', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        showNotification({
          id: `delete-status-${id}`,
          loading: true,
          title: 'Loading...',
          message: 'Wait for a moment',
          autoClose: false,
          disallowClose: true,
        });
        const res = await fetch(`/api/task/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          updateNotification({
            id: `change-status-${id}`,
            color: 'red',
            title: 'Failed',
            message: `"${taskName}" failed to delete`,
            icon: <IoMdClose size={16} />,
            autoClose: 3000,
          });
        }
        mutate();
        updateNotification({
          id: `delete-status-${id}`,
          color: 'teal',
          title: 'Success',
          message: `"${taskName}" deleted successfully`,
          icon: <AiOutlineCheck size={16} />,
          autoClose: 3000,
        });
      },
    });
  };

  return (
    <Layout>
      {status === 'authenticated' ? (
        <>
          <AddTodo mutate={mutate} />
          <Space h='xl' />
          {data && data.length >= 0 ? (
            data
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((value, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'top',
                    justifyContent: 'space-between',
                  }}
                >
                  <Checkbox
                    label={
                      <Text
                        strikethrough={value.isDone}
                        sx={{ cursor: 'pointer' }}
                      >
                        {value.taskName}
                      </Text>
                    }
                    radius='xl'
                    size='md'
                    mb='md'
                    checked={value.isDone}
                    onChange={() => handleChange(value.id)}
                  />
                  <FaTrashAlt
                    size={20}
                    color='red'
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      handleDelete(value.taskName, Number(value.id))
                    }
                  />
                </Box>
              ))
          ) : (
            <Loading />
          )}
        </>
      ) : status === 'loading' ? (
        <Loading />
      ) : (
        <Group position='center'>
          <Alert
            icon={<AiFillAlert size={16} />}
            title='Unauthenticated'
            color='red'
            radius='md'
            sx={{ width: '100%' }}
          >
            You should sign in first
          </Alert>
        </Group>
      )}
    </Layout>
  );
};

export default Home;
