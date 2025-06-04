import type { Meta, StoryObj } from '@storybook/nextjs';
import UserInfo from '@/components/UserInfo';

const meta: Meta<typeof UserInfo> = {
  title: 'Components/UserInfo',
  component: UserInfo,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof UserInfo>;

export const Default: Story = {
  args: {
    userInfo: {
      name: '테스트유저',
      email: 'user@example.com',
    },
    isAdmin: false,
    onUpdate: (field, value) => {
      alert(`${field}이(가) ${value}(으)로 수정되었습니다.`);
    },
  },
};

export const AdminUser: Story = {
  args: {
    userInfo: {
      name: '관리자',
      email: 'admin@example.com',
    },
    isAdmin: true,
    onUpdate: (field, value) => {
      console.log(`[관리자 수정] ${field}: ${value}`);
    },
  },
};
