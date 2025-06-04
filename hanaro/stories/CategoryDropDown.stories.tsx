import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryDropDown from '@/components/CategoryDropDown';

const meta: Meta<typeof CategoryDropDown> = {
  title: 'Components/CategoryDropDown',
  component: CategoryDropDown,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CategoryDropDown>;

const mockCategories = [
  {
    id: 1,
    name: 'JavaScript',
    icon: '/Javascript.svg',
  },
  {
    id: 2,
    name: 'TypeScript',
    icon: '/Typescript.svg',
  },
  {
    id: 3,
    name: 'React',
    icon: '/React.svg',
  },
  {
    id: 4,
    name: 'NextJS',
    icon: '/NextJS.svg',
  },
] as const;

export const Default: Story = {
  args: {
    categories: mockCategories,
    selectedId: mockCategories[0].id,
    onSelect: (id) => alert(`카테고리 ${id} 선택됨`),
  },
};
