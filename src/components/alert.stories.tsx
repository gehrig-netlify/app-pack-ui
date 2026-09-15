import type { Story } from "@ladle/react";
import { BadgeCheck, CircleAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription, type AlertProps } from "./alert";

export default {
  title: "Alert",
};

export const Default: Story<AlertProps> = (args) => (
  <Alert {...args} className="max-w-md">
    <BadgeCheck />
    <AlertTitle>New feature</AlertTitle>
    <AlertDescription>
      We&apos;ve shipped dark mode support. View more in your account settings.
    </AlertDescription>
  </Alert>
);
Default.args = {
  variant: "default",
};
Default.argTypes = {
  variant: {
    options: ["default", "destructive"],
    control: { type: "select" },
  },
};

export const Destructive: Story<AlertProps> = (args) => (
  <Alert {...args} className="max-w-md">
    <CircleAlert />
    <AlertTitle>Payment failed</AlertTitle>
    <AlertDescription>
      We couldn&apos;t process your payment. Please update your billing details.
    </AlertDescription>
  </Alert>
);
Destructive.args = {
  variant: "destructive",
};
Destructive.argTypes = Default.argTypes;

export const WithoutIcon: Story<AlertProps> = (args) => (
  <Alert {...args} className="max-w-md">
    <AlertTitle>Heads up</AlertTitle>
    <AlertDescription>Alerts work without an icon too - the layout collapses to a single column.</AlertDescription>
  </Alert>
);
WithoutIcon.args = {
  variant: "default",
};

export const AllStates: Story<AlertProps> = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Default, with icon</p>
      <Alert variant="default" className="max-w-md">
        <BadgeCheck />
        <AlertTitle>New feature</AlertTitle>
        <AlertDescription>
          We&apos;ve shipped dark mode support. View more in your account settings.
        </AlertDescription>
      </Alert>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Destructive, with icon</p>
      <Alert variant="destructive" className="max-w-md">
        <CircleAlert />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          We couldn&apos;t process your payment. Please update your billing details.
        </AlertDescription>
      </Alert>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Default, without icon</p>
      <Alert variant="default" className="max-w-md">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          Alerts work without an icon too - the layout collapses to a single column.
        </AlertDescription>
      </Alert>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Destructive, without icon</p>
      <Alert variant="destructive" className="max-w-md">
        <AlertTitle>Action required</AlertTitle>
        <AlertDescription>
          This variant also collapses to a single column when no icon is present.
        </AlertDescription>
      </Alert>
    </div>
  </div>
);
