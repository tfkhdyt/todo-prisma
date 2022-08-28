import { Avatar, Menu, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { GoSignOut } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';

interface Props {
  session: Session;
}

function MyAvatar({ session }: Props) {
  const handleLogout = () =>
    openConfirmModal({
      title: 'Log out',
      centered: true,
      children: <Text size='sm'>Are you sure you want to logout?</Text>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        showNotification({
          id: 'logout',
          loading: true,
          title: 'Loading',
          message: 'Logging you out...',
          autoClose: false,
          disallowClose: true,
        });
        try {
          signOut();
        } catch (err) {
          updateNotification({
            id: 'logout',
            color: 'red',
            title: 'Failed',
            message: 'Failed to log out!',
            icon: <IoMdClose size={16} />,
            autoClose: 2000,
          });
        }
      },
    });

  return (
    <Menu
      shadow='md'
      // width={400}
      trigger='hover'
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <Avatar
          src={session.user?.image}
          alt={session.user?.name as string}
          mr='md'
        />
      </Menu.Target>

      <Menu.Dropdown mr='md'>
        <Menu.Label>My Profile</Menu.Label>
        <Menu.Item icon={<AiOutlineUser />} sx={{ cursor: 'default' }}>
          {session.user?.name}
        </Menu.Item>
        <Menu.Item icon={<AiOutlineMail />} sx={{ cursor: 'default' }}>
          {session.user?.email}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item color='red' onClick={handleLogout} icon={<GoSignOut />}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default MyAvatar;
