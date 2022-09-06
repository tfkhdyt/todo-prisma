import { AppShell, Container, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

import MyHeader from './Header';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      header={<MyHeader />}
    >
      <Container>{children}</Container>
    </AppShell>
  );
}
