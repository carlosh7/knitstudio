import type { Meta, StoryObj } from "@storybook/react";
import { Panel } from "@knitstudio/ui";
import { BlocksPanel } from "@knitstudio/builder/panels/BlocksPanel";

const meta: Meta<typeof Panel> = {
  title: "Builder/BlocksPanel",
  component: Panel,
  parameters: { layout: "fullscreen" },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="bg-knit-bg h-screen">
      <Panel title="Components" width={240}>
        <BlocksPanel />
      </Panel>
    </div>
  ),
};
