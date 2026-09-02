"use client";

import * as React from "react";
import { Label, Slot } from "radix-ui";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useFormState,
  type ControllerProps,
  type DefaultValues,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { cn } from "../lib/cn";

/* -------------------------------------------------------------------------------------------------
 * Form status state machine
 *
 * react-hook-form's own `formState` only exposes point-in-time flags (`isSubmitting`,
 * `isSubmitSuccessful`, `errors`) rather than a single lifecycle value, so we layer a small
 * `idle | submitting | success | error` state machine on top and expose it via `useFormStatus()`.
 * This lets consumers render a spinner / success banner / error banner without wiring up several
 * `formState` flags themselves.
 * ---------------------------------------------------------------------------------------------- */

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface FormStatusValue {
  /** Current lifecycle state of the nearest ancestor <Form>. */
  status: FormStatus;
  /** The error thrown by `onSubmit`, if `status === "error"`. */
  error: unknown;
}

const FormStatusContext = React.createContext<FormStatusValue | null>(null);

/**
 * Reads the submission lifecycle of the nearest ancestor `<Form>`. Must be called from a
 * component rendered inside `<Form>`'s children (e.g. a submit button that shows a spinner, or a
 * banner that appears on success/error).
 */
export function useFormStatus(): FormStatusValue {
  const context = React.useContext(FormStatusContext);
  if (!context) {
    throw new Error("useFormStatus must be used within a <Form>");
  }
  return context;
}

/* -------------------------------------------------------------------------------------------------
 * Form
 * ---------------------------------------------------------------------------------------------- */

export interface FormProps<TSchema extends z.ZodType<any, any>>
  extends Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit" | "children" | "defaultValue"> {
  /** Zod schema used both to validate submitted values and to type them. */
  schema: TSchema;
  defaultValues?: DefaultValues<z.infer<TSchema>>;
  /** Called with the parsed, valid values. Throw (or reject) to move the form into `"error"`. */
  onSubmit: (values: z.infer<TSchema>) => Promise<void> | void;
  children: React.ReactNode;
}

/**
 * A `react-hook-form` + `zod` powered form. Wires up `useForm({ resolver: zodResolver(schema) })`
 * internally, exposes the resulting methods via `FormProvider` (so `FormField`/`useFormContext`
 * work in descendants), and tracks a `FormStatus` lifecycle exposed via `useFormStatus()`.
 *
 * This component does not render any inputs itself — compose it with `FormField`, `FormItem`,
 * `FormLabel`, `FormControl`, and `FormMessage` around your own (e.g. shadcn-copied) input atoms.
 *
 * Note on typing: the `TSchema extends z.ZodType<any, any>` bound (rather than the bare
 * `z.ZodType`) is required for zod v4 — with only the default generics, TypeScript widens
 * `z.infer<TSchema>` to `unknown` inside generic wrappers like this one. See
 * https://github.com/orgs/react-hook-form/discussions/13205.
 */
export function Form<TSchema extends z.ZodType<any, any>>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  ...formProps
}: FormProps<TSchema>) {
  type TFieldValues = z.infer<TSchema>;

  const methods = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [statusValue, setStatusValue] = React.useState<FormStatusValue>({
    status: "idle",
    error: null,
  });

  // Once the form has settled into "success" or "error", clear it back to "idle" as soon as the
  // user starts editing again, so a stale banner doesn't linger across an unrelated future
  // submission attempt.
  React.useEffect(() => {
    const subscription = methods.watch(() => {
      setStatusValue((previous) =>
        previous.status === "success" || previous.status === "error"
          ? { status: "idle", error: null }
          : previous,
      );
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const submitHandler = methods.handleSubmit(async (values) => {
    setStatusValue({ status: "submitting", error: null });
    try {
      await onSubmit(values);
      setStatusValue({ status: "success", error: null });
    } catch (error) {
      setStatusValue({ status: "error", error });
    }
  });

  return (
    <FormStatusContext.Provider value={statusValue}>
      <FormProvider {...methods}>
        <form
          noValidate
          className={cn("space-y-6", className)}
          onSubmit={submitHandler}
          {...formProps}
        >
          {children}
        </form>
      </FormProvider>
    </FormStatusContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * FormField / FormItem — context plumbing modeled on shadcn/ui's form.tsx pattern
 * ---------------------------------------------------------------------------------------------- */

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

/**
 * Connects one form field to `react-hook-form` via `Controller`. Wrap it around a `FormItem`
 * containing `FormLabel` / `FormControl` / `FormMessage`.
 */
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext?.name });

  if (!fieldContext) {
    throw new Error("useFormField (via FormLabel/FormControl/FormMessage) must be used within a <FormField>");
  }
  if (!itemContext) {
    throw new Error("useFormField (via FormLabel/FormControl/FormMessage) must be used within a <FormItem>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

/** Groups a label, control, and message for a single field. Generates the shared `id` they use. */
export function FormItem({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * FormLabel / FormControl / FormMessage
 * ---------------------------------------------------------------------------------------------- */

/** A `<Label>` (Radix `Label.Root`) bound to the field's control and styled for error state. */
export function FormLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Label.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label.Root
      data-slot="form-label"
      data-error={!!error}
      htmlFor={formItemId}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        "data-[error=true]:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Merges field wiring (id, aria attributes, and — via `FormField`'s `Controller` render prop —
 * `name`/`value`/`onChange`/`onBlur`/`ref`) onto whatever single input element the consumer
 * renders as its child, using Radix `Slot.Root`. This package does not ship `Input`/`Select`/etc.
 * — bring your own (e.g. shadcn-copied) atoms and wrap them in `FormControl`.
 */
export function FormControl({ ...props }: React.ComponentPropsWithoutRef<typeof Slot.Root>) {
  const { error, formItemId, formMessageId } = useFormField();

  return (
    <Slot.Root
      data-slot="form-control"
      id={formItemId}
      aria-describedby={formMessageId}
      aria-invalid={!!error}
      {...props}
    />
  );
}

/**
 * Renders the field's validation error message if one is present. If there is no error, falls
 * back to rendering `children` (useful for static hint/description text), or nothing.
 */
export function FormMessage({ className, children, ...props }: React.ComponentPropsWithoutRef<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-sm", error ? "font-medium text-destructive" : "text-muted-foreground", className)}
      {...props}
    >
      {body}
    </p>
  );
}
