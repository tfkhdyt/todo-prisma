import {
  ActionIcon,
  Box,
  Container,
  Header,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { SiTodoist } from 'react-icons/si';

function MyHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

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
          <Box>
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
