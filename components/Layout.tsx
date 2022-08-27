import { AppShell, useMantineTheme } from '@mantine/core';
import { ReactNode, useState } from 'react';

import MyHeader from './Header';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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
      {children}
    </AppShell>
  );
}
