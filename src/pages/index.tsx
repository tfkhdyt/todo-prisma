import {
  Alert,
  Box,
  Center,
  Checkbox,
  Group,
  Space,
  Text,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AiFillAlert, AiOutlineCheck } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { changeTaskStatus } from 'utils/mutations/changeTaskStatus';

import AddTodo from '@/components/AddTodo';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { Task } from '@/types/task';
import { deleteTask } from '@/utils/mutations/deleteTask';
import { getTasks } from '@/utils/queries/getTasks';

const Home = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<Task[], Error>(
    ['todos'],
    getTasks
  );

  const changeStatusMutation = useMutation(changeTaskStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const { status } = useSession();

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

  if (deleteMutation.isLoading) {
    showNotification({
      id: `delete-status-${deleteMutation.variables?.id}`,
      loading: true,
      title: 'Loading...',
      message: 'Wait for a moment',
      autoClose: false,
      disallowClose: true,
    });
  } else {
    if (deleteMutation.isError) {
      updateNotification({
        id: `delete-status-${deleteMutation.variables?.id}`,
        color: 'red',
        title: 'Failed',
        message: `"${deleteMutation.variables?.taskName}" failed to delete`,
        icon: <IoMdClose size={16} />,
        autoClose: 3000,
      });
    } else if (deleteMutation.isSuccess) {
      updateNotification({
        id: `delete-status-${deleteMutation.variables?.id}`,
        color: 'teal',
        title: 'Success',
        message: `"${deleteMutation.variables?.taskName}" deleted successfully`,
        icon: <AiOutlineCheck size={16} />,
        autoClose: 3000,
      });
    }
  }

  const handleDelete = (taskName: string, id: string) => {
    openConfirmModal({
      title: `Delete ${taskName}`,
      centered: true,
      children: (
        <Text size='sm'>Are you sure you want to delete {taskName}?</Text>
      ),
      labels: { confirm: 'Delete', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteMutation.mutate({ id, taskName });
      },
    });
  };

  return (
    <Layout>
      {(status === 'loading' || isLoading) && (
        /*    <Alert icon={<Loader size={16} />} title='Authenticating...'>
          Please wait while on authenticating process...
        </Alert> */
        <Loading />
      )}

      {status === 'unauthenticated' && (
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

      {status === 'authenticated' && (
        <>
          <AddTodo />
          <Space h='xl' />
          {/* {isLoading && <Loading />} */}

          {isError && (
            <Group position='center'>
              <Alert
                icon={<AiFillAlert size={16} />}
                title='Unauthenticated'
                color='red'
                radius='md'
                sx={{ width: '100%' }}
              >
                {error.message}
              </Alert>
            </Group>
          )}

          {data && data.length > 0 ? (
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
                    onChange={() =>
                      changeStatusMutation.mutate({
                        id: value.id,
                        taskName: value.taskName,
                      })
                    }
                    styles={{
                      input: {
                        cursor: 'pointer',
                      },
                    }}
                  />
                  <FaTrashAlt
                    size={20}
                    color='red'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(value.taskName, value.id)}
                  />
                </Box>
              ))
          ) : (
            <Center>Task still empty, please add some</Center>
          )}
        </>
      )}
    </Layout>
  );
};

export default Home;
