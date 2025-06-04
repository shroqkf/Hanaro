import type { Meta, StoryObj } from '@storybook/nextjs';
import UserTable from '@/components/UserTable';

const meta: Meta<typeof UserTable> = {
  title: 'Components/UserTable',
  component: UserTable,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof UserTable>;

const mockUsers = [
  {
    user_id: 1,
    name: 'user1',
    email: 'user1@example.com',
    is_admin: false,
  },
  {
    user_id: 2,
    name: '관리자',
    email: 'admin@example.com',
    is_admin: true,
  },
  {
    user_id: 3,
    name: 'user2',
    email: 'user2@example.com',
    is_admin: false,
  },
];

export const Default: Story = {
  args: {
    users: mockUsers,
    search: '',
    onSearchChange: (value) => console.log(`검색어: ${value}`),
  },
};

export const WithSearch: Story = {
  args: {
    users: mockUsers,
    search: 'admin',
    onSearchChange: (value) => console.log(`검색어: ${value}`),
  },
};
