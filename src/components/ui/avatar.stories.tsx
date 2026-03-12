import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: "E",
    size: "md",
  },
};

export const Fallback: Story = {
  args: {
    fallback: "E",
    size: "md",
  },
};

export const Small: Story = {
  args: { fallback: "S", size: "sm" },
};

export const Large: Story = {
  args: {
    fallback: "E",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    fallback: "E",
    size: "xl",
  },
};

export const AllSizes: Story = {
  args: { fallback: "A" },
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" fallback="S" />
      <Avatar size="md" fallback="M" />
      <Avatar size="lg" fallback="L" />
      <Avatar size="xl" fallback="XL" />
    </div>
  ),
};

export const Stacked: Story = {
  args: { fallback: "A" },
  render: () => (
    <div className="flex -space-x-2">
      {["A", "B", "C", "D"].map((letter) => (
        <Avatar
          key={letter}
          size="sm"
          fallback={letter}
          className="border-2 border-[var(--color-bg)]"
        />
      ))}
    </div>
  ),
};
