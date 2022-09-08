import { Alert, Center } from '@mantine/core';
import { FC } from 'react';
import { AiFillAlert } from 'react-icons/ai';

type Props = {
  errorMessage?: string;
};

const Unauthenticated: FC<Props> = ({ errorMessage }) => {
  return (
    <Center>
      <Alert
        icon={<AiFillAlert size={16} />}
        title='Unauthenticated'
        color='red'
        radius='md'
        sx={{ width: '100%' }}
      >
        {errorMessage ?? 'You should sign in first'}
      </Alert>
    </Center>
  );
};

export default Unauthenticated;
