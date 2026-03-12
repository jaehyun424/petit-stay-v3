import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "sm"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "예약하기", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "취소", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "더보기", variant: "ghost" },
};

export const Small: Story = {
  args: { children: "필터", variant: "secondary", size: "sm" },
};

export const Disabled: Story = {
  args: { children: "예약하기", variant: "primary", disabled: true },
};

export const AllVariants: Story = {
  args: { children: "Button" },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="primary" size="sm">Primary SM</Button>
        <Button variant="secondary" size="sm">Secondary SM</Button>
        <Button variant="ghost" size="sm">Ghost SM</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </div>
    </div>
  ),
};
