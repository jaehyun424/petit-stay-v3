import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "verified", "language", "certification", "top"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "3yr Exp", variant: "default" },
};

export const Verified: Story = {
  args: { children: "Verified", variant: "verified" },
};

export const Language: Story = {
  args: { children: "L3 English", variant: "language" },
};

export const Certification: Story = {
  args: { children: "CPR", variant: "certification" },
};

export const Top: Story = {
  args: { children: "Top Sitter", variant: "top" },
};

export const AllVariants: Story = {
  args: { children: "Badge" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">3yr Exp</Badge>
      <Badge variant="verified">Verified</Badge>
      <Badge variant="language">L3 English</Badge>
      <Badge variant="certification">CPR</Badge>
      <Badge variant="top">Top Sitter</Badge>
    </div>
  ),
};
