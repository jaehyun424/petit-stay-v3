import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "이름을 입력하세요" },
};

export const WithLabel: Story = {
  args: { label: "이름", placeholder: "홍길동" },
};

export const WithError: Story = {
  args: {
    label: "이메일",
    placeholder: "email@example.com",
    error: "올바른 이메일 주소를 입력해 주세요",
  },
};

export const WithHelper: Story = {
  args: {
    label: "전화번호",
    placeholder: "010-0000-0000",
    helperText: "하이픈(-)을 포함하여 입력하세요",
  },
};

export const Disabled: Story = {
  args: {
    label: "이름",
    placeholder: "입력 불가",
    disabled: true,
  },
};

export const AllStates: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Input label="기본" placeholder="기본 입력" />
      <Input label="도움말" placeholder="입력" helperText="도움말 텍스트" />
      <Input label="에러" placeholder="입력" error="에러 메시지" />
      <Input label="비활성" placeholder="입력" disabled />
    </div>
  ),
};
