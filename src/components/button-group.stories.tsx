import type { Story } from "@ladle/react";
import { ArrowLeft, ArrowRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { ButtonGroup, type ButtonGroupProps } from "./button-group";

export default {
  title: "ButtonGroup",
};

export const Default: Story<ButtonGroupProps> = (args) => (
  <ButtonGroup {...args}>
    <Button variant="outline" size="icon" aria-label="Previous">
      <ArrowLeft />
    </Button>
    <Button variant="outline" size="sm">
      Archive
    </Button>
    <Button variant="outline" size="sm">
      Report
    </Button>
    <Button variant="outline" size="icon" aria-label="Next">
      <ArrowRight />
    </Button>
  </ButtonGroup>
);

export const TextAndIcon: Story<ButtonGroupProps> = (args) => (
  <ButtonGroup {...args}>
    <Button variant="outline" size="sm">
      Snooze
    </Button>
    <Button variant="outline" size="sm" aria-label="More options">
      <MoreHorizontal />
    </Button>
  </ButtonGroup>
);

export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Icon + text + icon</p>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Previous">
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="sm">
          Archive
        </Button>
        <Button variant="outline" size="sm">
          Report
        </Button>
        <Button variant="outline" size="icon" aria-label="Next">
          <ArrowRight />
        </Button>
      </ButtonGroup>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Text + icon only</p>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Snooze
        </Button>
        <Button variant="outline" size="sm" aria-label="More options">
          <MoreHorizontal />
        </Button>
      </ButtonGroup>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">With a disabled item</p>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Approve
        </Button>
        <Button variant="outline" size="sm" disabled>
          Reject
        </Button>
      </ButtonGroup>
    </div>
  </div>
);
