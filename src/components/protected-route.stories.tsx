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

/** Side-by-side instances for its three meaningful states: authenticated, unauthenticated, and loading. */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-6 sm:flex-row">
    <div className="flex flex-1 flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Authenticated</p>
      <ProtectedRoute isAuthenticated={true}>
        <p className="text-sm text-foreground">Protected content is visible.</p>
      </ProtectedRoute>
    </div>
    <div className="flex flex-1 flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Unauthenticated</p>
      <ProtectedRoute
        isAuthenticated={false}
        unauthenticatedFallback={
          <p className="text-sm text-muted-foreground">
            Redirected to login (see console for onUnauthenticated calls).
          </p>
        }
        onUnauthenticated={() => console.log("onUnauthenticated fired")}
      >
        <p className="text-sm text-foreground">Protected content is visible.</p>
      </ProtectedRoute>
    </div>
    <div className="flex flex-1 flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Loading</p>
      <ProtectedRoute isAuthenticated={false} isLoading>
        <p className="text-sm text-foreground">Protected content is visible.</p>
      </ProtectedRoute>
    </div>
  </div>
);
