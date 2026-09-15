import type { Story } from "@ladle/react";
import { Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps } from "./avatar";

export default {
  title: "Avatar",
};

const argTypes = {
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "select" as const },
  },
};

const statusArgTypes = {
  ...argTypes,
  status: {
    options: ["online", "offline"],
    control: { type: "select" as const },
  },
};

export const Default: Story<AvatarProps> = (args) => <Avatar {...args} />;
Default.args = {
  size: "md",
  fallback: "JD",
};
Default.argTypes = argTypes;

export const WithImage: Story<AvatarProps> = (args) => <Avatar {...args} />;
WithImage.args = {
  size: "md",
  src: "https://i.pravatar.cc/80",
  alt: "Jamie Doe",
};
WithImage.argTypes = argTypes;

export const WithStatus: Story<AvatarProps> = (args) => <Avatar {...args} />;
WithStatus.args = {
  size: "md",
  fallback: "JD",
  status: "online",
};
WithStatus.argTypes = statusArgTypes;

export const BrokenImageFallback: Story<AvatarProps> = (args) => <Avatar {...args} />;
BrokenImageFallback.args = {
  size: "md",
  src: "https://example.invalid/broken.jpg",
  fallback: "JD",
};

export const Group: Story<AvatarGroupProps> = (args) => (
  <AvatarGroup {...args}>
    <Avatar fallback="AA" />
    <Avatar fallback="BB" />
    <Avatar fallback="CC" />
    <Avatar fallback="DD" />
    <Avatar fallback="EE" />
  </AvatarGroup>
);
Group.args = {
  max: 3,
};

export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Fallback initials, by size</p>
      <div className="flex items-center gap-3">
        <Avatar size="sm" fallback="JD" />
        <Avatar size="md" fallback="JD" />
        <Avatar size="lg" fallback="JD" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Default icon fallback (no image, no initials)</p>
      <div className="flex items-center gap-3">
        <Avatar size="sm" />
        <Avatar size="md" />
        <Avatar size="lg" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">With image, by size</p>
      <div className="flex items-center gap-3">
        <Avatar size="sm" src="https://i.pravatar.cc/80" alt="Jamie Doe" />
        <Avatar size="md" src="https://i.pravatar.cc/80" alt="Jamie Doe" />
        <Avatar size="lg" src="https://i.pravatar.cc/80" alt="Jamie Doe" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Broken image falls back to initials</p>
      <Avatar size="md" src="https://example.invalid/broken.jpg" fallback="JD" />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Status dot: online / offline</p>
      <div className="flex items-center gap-3">
        <Avatar size="md" fallback="JD" status="online" />
        <Avatar size="md" fallback="JD" status="offline" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">AvatarGroup (max 3, with overflow)</p>
      <AvatarGroup max={3}>
        <Avatar fallback="AA" />
        <Avatar fallback="BB" />
        <Avatar fallback="CC" />
        <Avatar fallback="DD" />
        <Avatar fallback="EE" />
      </AvatarGroup>
    </div>
  </div>
);
