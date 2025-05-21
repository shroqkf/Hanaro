import type { Meta, StoryObj } from "@storybook/react";
import HanaButton from "./HanaButton";

const meta: Meta<typeof HanaButton> = {
  title: "Atoms/HanaButton",
  component: HanaButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryButton: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "PRIMARY",
    onClick: () => alert("primary!!"),
  },
};

export const DangerButton: Story = {
  args: {
    variant: "danger",
    size: "lg",
    children: "DANGER",
    onClick: () => alert("danger!!"),
  },
};
