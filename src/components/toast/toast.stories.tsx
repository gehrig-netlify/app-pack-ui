import type { Story } from "@ladle/react";
import { X } from "lucide-react";
import { Toaster, toast, ToastAction } from "./toast";

export default {
  title: "Toast",
};

/** Mount one `<Toaster />` and trigger toasts imperatively via `toast()`. Click more than once to see stacking (capped at 3) and auto-dismiss after 5s. */
export const Default: Story = () => (
  <div className="flex flex-col items-start gap-3">
    <Toaster />
    <button
      type="button"
      onClick={() =>
        toast({
          title: "Notification",
          description: "Toast byline goes here.",
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        })
      }
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
    >
      Show toast
    </button>
    <button
      type="button"
      onClick={() =>
        toast({
          title: "Enable notifications",
          description: "By clicking this checkbox, you agree to the terms.",
        })
      }
      className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
    >
      Show toast (no action)
    </button>
    <button
      type="button"
      onClick={() =>
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Your changes could not be saved.",
        })
      }
      className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground"
    >
      Show destructive toast
    </button>
  </div>
);

/** A toast with `duration: Infinity` stays until dismissed via its close button. */
export const Persistent: Story = () => (
  <div className="flex flex-col items-start gap-3">
    <Toaster />
    <button
      type="button"
      onClick={() =>
        toast({
          title: "Update available",
          description: "This toast stays open until you close it.",
          duration: Infinity,
        })
      }
      className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
    >
      Show persistent toast
    </button>
  </div>
);

/**
 * Real toasts are only ever mounted via `toast()` + `<Toaster />` and animate in/out, so a
 * "forever visible" static story can't render the actual `Toast.Root` (it requires a
 * `Toast.Provider` and disappears again once its `duration` elapses). Instead this reproduces
 * `Toaster`'s per-toast markup and styling directly with plain elements, as a static visual
 * reference for the `default` and `destructive` variants (with and without an action).
 */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    <p className="text-sm font-medium text-muted-foreground">Default (with action)</p>
    <div className="relative flex w-full max-w-[420px] items-center justify-between gap-4 overflow-hidden rounded-[10px] border border-border bg-background p-4 text-foreground shadow-lg">
      <div className="grid gap-2">
        <p className="text-base font-medium leading-none">Notification</p>
        <p className="text-sm opacity-90">Toast byline goes here.</p>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        Undo
      </button>
      <span className="absolute right-2 top-2 rounded-md p-1 opacity-60">
        <X className="size-4" />
      </span>
    </div>

    <p className="text-sm font-medium text-muted-foreground">Default (no action)</p>
    <div className="relative flex w-full max-w-[420px] items-center justify-between gap-4 overflow-hidden rounded-[10px] border border-border bg-background p-4 text-foreground shadow-lg">
      <div className="grid gap-2">
        <p className="text-base font-medium leading-none">Enable notifications</p>
        <p className="text-sm opacity-90">By clicking this checkbox, you agree to the terms.</p>
      </div>
      <span className="absolute right-2 top-2 rounded-md p-1 opacity-60">
        <X className="size-4" />
      </span>
    </div>

    <p className="text-sm font-medium text-muted-foreground">Destructive</p>
    <div className="relative flex w-full max-w-[420px] items-center justify-between gap-4 overflow-hidden rounded-[10px] border border-destructive bg-destructive p-4 text-destructive-foreground shadow-lg">
      <div className="grid gap-2">
        <p className="text-base font-medium leading-none">Something went wrong</p>
        <p className="text-sm opacity-90">Your changes could not be saved.</p>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center justify-center rounded-md border border-destructive-foreground/30 bg-transparent px-3 py-1.5 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive-foreground/10"
      >
        Retry
      </button>
      <span className="absolute right-2 top-2 rounded-md p-1 opacity-60">
        <X className="size-4" />
      </span>
    </div>
  </div>
);
