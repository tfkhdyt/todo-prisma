import {
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  Header,
  Loader,
  Text,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { GoSignIn } from 'react-icons/go';
import { SiTodoist } from 'react-icons/si';

import MyAvatar from './Avatar';

function MyHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Header height={70} p='md'>
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            <SiTodoist size={24} />
            <Text weight={600} size='xl' ml='xs'>
              To Do List
            </Text>
          </Box>
          <Center inline>
            {status === 'loading' ? (
              <Loader />
            ) : !session ? (
              <Button leftIcon={<GoSignIn />} onClick={() => signIn()}>
                Sign in
              </Button>
            ) : (
              <MyAvatar session={session} />
            )}
            <Tooltip label='Ctrl + J' position='bottom' withArrow>
              <ActionIcon
                variant='outline'
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                size='lg'
                ml='md'
              >
                {dark ? (
                  <BsFillSunFill size={18} />
                ) : (
                  <BsFillMoonFill size={18} />
                )}
              </ActionIcon>
            </Tooltip>
          </Center>
        </Box>
      </Container>
    </Header>
  );
}

export default MyHeader;
