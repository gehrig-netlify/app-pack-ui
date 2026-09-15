import type { Story } from "@ladle/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type CardProps } from "./card";
import { Button } from "./button";

export default {
  title: "Card",
};

export const Default: Story<CardProps> = (args) => (
  <Card {...args} className="w-[380px]">
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>You have 3 unread messages.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Card content goes here.</p>
    </CardContent>
    <CardFooter>
      <Button size="sm">Mark all as read</Button>
    </CardFooter>
  </Card>
);

/**
 * Demonstrates the login-form composite shown in the Figma reference, built entirely from the
 * generic `Card`/`CardHeader`/`CardContent`/`CardFooter` parts - not a hardcoded login component.
 */
export const LoginForm: Story<CardProps> = (args) => (
  <Card {...args} className="w-[420px]">
    <CardHeader className="flex-row items-center justify-between">
      <CardTitle>Log in</CardTitle>
      <button type="button" className="text-sm font-medium text-foreground">
        Sign up
      </button>
    </CardHeader>
    <CardContent>
      <CardDescription>Enter your email to log in to your account</CardDescription>
      <div className="flex flex-col gap-2">
        <label htmlFor="login-email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="email@example.com"
          className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Forgot your password?
          </a>
        </div>
        <input
          id="login-password"
          type="password"
          placeholder="••••••••••••"
          className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground"
        />
      </div>
    </CardContent>
    <CardFooter variant="muted">
      <Button className="w-full">Login</Button>
      <Button variant="outline" className="w-full">
        Login with Google
      </Button>
    </CardFooter>
  </Card>
);

export const AllStates: Story<CardProps> = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Generic composition</p>
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Mark all as read</Button>
        </CardFooter>
      </Card>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Composed example (login form)</p>
      <Card className="w-[420px]">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Log in</CardTitle>
          <button type="button" className="text-sm font-medium text-foreground">
            Sign up
          </button>
        </CardHeader>
        <CardContent>
          <CardDescription>Enter your email to log in to your account</CardDescription>
          <div className="flex flex-col gap-2">
            <label htmlFor="all-states-login-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="all-states-login-email"
              type="email"
              placeholder="email@example.com"
              className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="all-states-login-password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Forgot your password?
              </a>
            </div>
            <input
              id="all-states-login-password"
              type="password"
              placeholder="••••••••••••"
              className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3 rounded-b-xl bg-muted/40 pt-6">
          <Button className="w-full">Login</Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
);
