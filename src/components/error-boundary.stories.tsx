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
