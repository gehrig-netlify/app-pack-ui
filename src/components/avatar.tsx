"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";
import { cn } from "../lib/cn";

const avatarVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground",
  {
    variants: {
      size: {
        sm: "size-6 text-xs",
        md: "size-8 text-sm",
        lg: "size-10 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface AvatarProps
  extends Omit<React.ComponentProps<"span">, "children">,
    VariantProps<typeof avatarVariants> {
  /** Image URL. Falls back to `fallback` (or a default icon) if unset or if it fails to load. */
  src?: string;
  alt?: string;
  /** Rendered when there is no `src`, or the image at `src` fails to load. Usually initials. */
  fallback?: React.ReactNode;
  /** Small presence dot in the bottom-right corner. Omit for no indicator. */
  status?: "online" | "offline";
}

/**
 * Plain `<span>` + `<img>` with an `onError`-driven fallback - no Radix `Avatar` primitive needed,
 * per the reasoning in `data-table/pagination.tsx`. Needs `"use client"` because the image-load
 * fallback is tracked with `useState`.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, alt = "", fallback, status, ...props }, ref) => {
    const [imageFailed, setImageFailed] = React.useState(false);
    const showImage = Boolean(src) && !imageFailed;

    return (
      <span ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="size-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="font-medium uppercase [&_svg]:size-1/2" aria-hidden={!alt}>
            {fallback ?? <User className="size-1/2" />}
          </span>
        )}
        {status ? (
          <span
            className={cn(
              "absolute bottom-0 right-0 block size-2.5 rounded-full ring-2 ring-background",
              status === "online" ? "bg-primary" : "bg-muted-foreground",
            )}
            aria-hidden="true"
          />
        ) : null}
      </span>
    );
  },
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  /** Maximum number of avatars to render before collapsing the rest into a "+N" avatar. */
  max?: number;
}

/** Stacks `Avatar`s with overlap and an optional "+N" overflow avatar. */
export function AvatarGroup({ className, children, max, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const overflowCount = max && items.length > max ? items.length - max : 0;

  return (
    <div className={cn("flex items-center -space-x-2", className)} {...props}>
      {visible.map((child, index) => {
        if (!React.isValidElement<{ className?: string }>(child)) return child;
        return React.cloneElement(child, {
          key: child.key ?? index,
          className: cn(child.props.className, "ring-2 ring-background"),
        });
      })}
      {overflowCount > 0 ? (
        <Avatar fallback={`+${overflowCount}`} className="ring-2 ring-background" />
      ) : null}
    </div>
  );
}
