import type { Meta, StoryObj } from "@storybook/react";
import ColorTitle from "./ColorTitle";

const meta: Meta = {
  title: "Atoms/ColorTitle",
  component: ColorTitle,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const GreenTitle: Story = {
  args: {
    color: "green",
    size: "md",
    textAlign: "end",
    children: "Green Title",
  },
};

export const PinkTitle: Story = {
  args: {
    color: "pink",
    size: "lg",
    textAlign: "center",
    children: "Pink Title",
  },
};
