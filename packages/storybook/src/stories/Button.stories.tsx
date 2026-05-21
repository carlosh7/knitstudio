import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@knitstudio/ui";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Click me", onClick: () => {} },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Cancel", onClick: () => {} },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "More info", onClick: () => {} },
};
