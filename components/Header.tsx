import {
  ActionIcon,
  Box,
  Button,
  Container,
  Header,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { SiTodoist } from 'react-icons/si';

function MyHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { data: session } = useSession();

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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SiTodoist size={24} />
            <Text weight='bold' size='xl' ml='xs'>
              To Do List
            </Text>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!session ? (
              <Button mr='md' leftIcon={<GoSignIn />} onClick={() => signIn()}>
                Sign in
              </Button>
            ) : (
              <Button
                mr='md'
                leftIcon={<GoSignOut />}
                color='red'
                onClick={() => signOut()}
              >
                ({session.user?.name}) Sign out
              </Button>
            )}
            <ActionIcon
              variant='outline'
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title='Toggle color scheme'
              size='lg'
            >
              {dark ? (
                <BsFillSunFill size={18} />
              ) : (
                <BsFillMoonFill size={18} />
              )}
            </ActionIcon>
          </Box>
        </Box>
      </Container>
    </Header>
  );
}

export default MyHeader;
