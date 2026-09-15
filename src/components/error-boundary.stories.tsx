import type { Story } from "@ladle/react";
import { useState } from "react";
import { AppErrorBoundary } from "./error-boundary";

export default {
  title: "AppErrorBoundary",
};

function Bomb(): never {
  throw new Error("Simulated render error for the Ladle story");
}

export const Default: Story = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className="w-fit rounded-md border border-border px-3 py-1.5 text-sm"
        onClick={() => setShouldThrow(true)}
      >
        Trigger error
      </button>
      <AppErrorBoundary
        onReset={() => setShouldThrow(false)}
        onError={(error) => console.error("Caught by AppErrorBoundary:", error)}
      >
        {shouldThrow ? <Bomb /> : <p className="text-sm text-muted-foreground">No error yet.</p>}
      </AppErrorBoundary>
    </div>
  );
};

/**
 * Two instances side by side: one whose child throws on render (showing the fallback UI), and one
 * with normal children (showing the boundary is a no-op pass-through when nothing errors). Reuses
 * the same `Bomb` component the `Default` story uses to trigger a render error.
 */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-6 sm:flex-row">
    <div className="flex flex-1 flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Error thrown (fallback UI)</p>
      <AppErrorBoundary onError={(error) => console.error("Caught by AppErrorBoundary:", error)}>
        <Bomb />
      </AppErrorBoundary>
    </div>
    <div className="flex flex-1 flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">No error (pass-through)</p>
      <AppErrorBoundary onError={(error) => console.error("Caught by AppErrorBoundary:", error)}>
        <p className="text-sm text-muted-foreground">No error yet.</p>
      </AppErrorBoundary>
    </div>
  </div>
);
