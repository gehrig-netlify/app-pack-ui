import type { Story } from "@ladle/react";
import { useEffect, useRef } from "react";
import { z } from "zod";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, useFormStatus } from "./form";

/**
 * A realistic schema a consumer app might define for a "create teammate" form: a name, an email,
 * and a role picked from a fixed set of options.
 */
const teammateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  role: z.enum(["admin", "member", "viewer"], { message: "Select a role" }),
});

type TeammateValues = z.infer<typeof teammateSchema>;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Reads the ambient form lifecycle and renders a submit button that disables/labels itself while
 * submitting, plus a success or error banner. This is the kind of small consumer-side component
 * `useFormStatus` is meant to enable — the library itself ships no such component.
 */
function SubmitBar() {
  const { status, error } = useFormStatus();

  return (
    <div className="flex flex-col gap-3">
      <button
        type="submit"
        disabled={status === "submitting"}
        className={
          "inline-flex h-9 w-fit items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground " +
          "disabled:pointer-events-none disabled:opacity-50"
        }
      >
        {status === "submitting" ? "Submitting..." : "Create teammate"}
      </button>

      {status === "success" && (
        <p className="rounded-md bg-muted px-3 py-2 text-sm text-foreground" role="status">
          Teammate created successfully.
        </p>
      )}

      {status === "error" && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {error instanceof Error ? error.message : "Something went wrong. Please try again."}
        </p>
      )}
    </div>
  );
}

interface DemoArgs {
  /** Simulates a failing `onSubmit` (e.g. a rejected API call) to demo the "error" status. */
  simulateFailure: boolean;
  /** Simulated network latency, in milliseconds, before `onSubmit` resolves/rejects. */
  delayMs: number;
}

export const Default: Story<DemoArgs> = ({ simulateFailure, delayMs }) => {
  const handleSubmit = async (values: TeammateValues) => {
    await wait(delayMs);
    if (simulateFailure) {
      throw new Error("The server rejected this teammate (simulated failure).");
    }
    // eslint-disable-next-line no-console
    console.log("submitted", values);
  };

  return (
    <Form
      schema={teammateSchema}
      defaultValues={{ name: "", email: "", role: "member" }}
      onSubmit={handleSubmit}
      className="max-w-sm"
    >
      <FormField<TeammateValues, "name">
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <input
                {...field}
                type="text"
                placeholder="Ada Lovelace"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField<TeammateValues, "email">
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <input
                {...field}
                type="email"
                placeholder="ada@netlify.com"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
              />
            </FormControl>
            <FormMessage>We'll only use this for account setup.</FormMessage>
          </FormItem>
        )}
      />

      <FormField<TeammateValues, "role">
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <FormControl>
              <select
                {...field}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <SubmitBar />
    </Form>
  );
};

Default.args = {
  simulateFailure: false,
  delayMs: 600,
};

Default.argTypes = {
  delayMs: {
    control: { type: "range", min: 0, max: 2000, step: 100 },
    defaultValue: 600,
  },
};

/**
 * Silently clicks a hidden submit button on mount, driving a `<Form>` instance through a real
 * submission so its `useFormStatus()` lands in (and stays in) a particular lifecycle state -
 * rather than faking the visuals, this exercises the actual state machine.
 */
function AutoSubmitTrigger() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.click();
  }, []);

  return <button ref={buttonRef} type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />;
}

interface LifecycleFormProps {
  label: string;
  delayMs: number;
  simulateFailure: boolean;
  autoSubmit: boolean;
}

/** One `<Form>` instance, captioned, optionally auto-submitted to reach a target `FormStatus`. */
function LifecycleForm({ label, delayMs, simulateFailure, autoSubmit }: LifecycleFormProps) {
  const handleSubmit = async () => {
    await wait(delayMs);
    if (simulateFailure) {
      throw new Error("The server rejected this teammate (simulated failure).");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <Form
        schema={teammateSchema}
        defaultValues={{ name: "Ada Lovelace", email: "ada@netlify.com", role: "member" }}
        onSubmit={handleSubmit}
        className="max-w-sm"
      >
        <FormField<TeammateValues, "name">
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="text"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<TeammateValues, "email">
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="email"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitBar />
        {autoSubmit ? <AutoSubmitTrigger /> : null}
      </Form>
    </div>
  );
}

/**
 * The `idle -> submitting -> success -> error` lifecycle shown side by side. Each panel (besides
 * "Idle") auto-submits on mount via a hidden button click so its `useFormStatus()` genuinely
 * reaches that state, rather than faking the visuals: "Submitting" uses a very long delay so it
 * settles there, "Success" and "Error" resolve/reject almost immediately.
 */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap">
    <LifecycleForm label="Idle" delayMs={600} simulateFailure={false} autoSubmit={false} />
    <LifecycleForm label="Submitting" delayMs={60_000} simulateFailure={false} autoSubmit />
    <LifecycleForm label="Success" delayMs={50} simulateFailure={false} autoSubmit />
    <LifecycleForm label="Error" delayMs={50} simulateFailure={true} autoSubmit />
  </div>
);
