import { Button, Group, Paper, Stack } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import { BsGithub, BsGoogle } from 'react-icons/bs';

import Layout from '../../components/Layout';

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export default function SignIn({ providers }: Props) {
  return (
    <Layout>
      <Group position='center' sx={{ width: '100%', height: '80vh' }}>
        <Paper p='xl' shadow='sm'>
          <Stack p='xl' sx={{ width: '18rem' }}>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  onClick={() => signIn(provider.id)}
                  key={provider.id}
                  color={provider.name === 'Google' ? 'blue' : 'dark'}
                  leftIcon={
                    provider.name === 'Google' ? <BsGoogle /> : <BsGithub />
                  }
                >
                  Sign in with {provider.name}
                </Button>
              ))}
          </Stack>
        </Paper>
      </Group>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const providers = await getProviders();
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { providers } };
};
