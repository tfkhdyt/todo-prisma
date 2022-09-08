import { Space } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleChangeStatusMutation } from 'handlers/handleChangeStatusMutation';
import { handleDeleteTaskMutation } from 'handlers/handleDeleteTaskMutation';
import { useSession } from 'next-auth/react';

import AddTask from '@/components/AddTask';
import Layout from '@/components/Layout';
import List from '@/components/List';
import Loading from '@/components/Loading';
import Unauthenticated from '@/components/Unauthenticated';
import { Task } from '@/types/task';
import { deleteTask } from '@/utils/mutations/deleteTask';
import { editTask } from '@/utils/mutations/editTask';
import { getTasks } from '@/utils/queries/getTasks';

const Home = () => {
  // nextauth session
  const { data: session, status } = useSession();

  // react query
  const queryClient = useQueryClient();
  const { data, isError, error } = useQuery<Task[], Error>(['todos'], getTasks);
  const changeStatusMutation = useMutation(editTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  // mutation handlers
  handleChangeStatusMutation(changeStatusMutation);
  handleDeleteTaskMutation(deleteMutation);

  return (
    <Layout>
      {status === 'loading' ? (
        <Loading />
      ) : !session ? (
        <Unauthenticated />
      ) : (
        <>
          <AddTask />
          <Space h='xl' />
          {isError && <Unauthenticated errorMessage={error.message} />}

          {data ? (
            <List
              data={data}
              changeStatusMutation={changeStatusMutation}
              deleteTaskMutation={deleteMutation}
            />
          ) : (
            <Loading />
          )}
        </>
      )}

      {/* {status === 'loading' && isLoading && ( */}
      {/* <Alert icon={<Loader size={16} />} title='Authenticating...'>
          Please wait while on authenticating process...
        </Alert> */}
      {/* )} */}
    </Layout>
  );
};

export default Home;
