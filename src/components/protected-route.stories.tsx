import type { Story } from "@ladle/react";
import { ProtectedRoute, type ProtectedRouteProps } from "./protected-route";

export default {
  title: "ProtectedRoute",
};

export const Default: Story<Pick<ProtectedRouteProps, "isAuthenticated" | "isLoading">> = (
  args,
) => (
  <ProtectedRoute
    {...args}
    unauthenticatedFallback={
      <p className="text-sm text-muted-foreground">
        Redirected to login (see console for onUnauthenticated calls).
      </p>
    }
    onUnauthenticated={() => console.log("onUnauthenticated fired")}
  >
    <p className="text-sm text-foreground">Protected content is visible.</p>
  </ProtectedRoute>
);
Default.args = {
  isAuthenticated: true,
  isLoading: false,
};
Default.argTypes = {
  isAuthenticated: { control: { type: "boolean" } },
  isLoading: { control: { type: "boolean" } },
};
