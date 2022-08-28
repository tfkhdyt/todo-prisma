import { Button, Group, Paper, Stack } from '@mantine/core';
import { InferGetServerSidePropsType } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { BsGithub, BsGoogle } from 'react-icons/bs';

import Layout from '../../components/Layout';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Group position='center' sx={{ width: '100%', height: '80vh' }}>
        <Paper p='xl' shadow='sm'>
          <Stack p='xl' sx={{ width: '18rem' }}>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
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
export async function getServerSideProps() {
  return { props: { providers: await getProviders() } };
}
