import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        accent:
          "border-accent-foreground/25 bg-accent text-accent-foreground",
        secondary:
          "border-border bg-surface-elevated text-foreground",
        outline:
          "border-border bg-transparent text-muted-foreground",
        success:
          "border-status-success/35 bg-status-success-bg text-status-success",
        warning:
          "border-status-warning/35 bg-status-warning-bg text-status-warning",
        destructive:
          "border-destructive/35 bg-destructive-bg text-destructive",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
