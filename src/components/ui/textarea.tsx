import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-control flex min-h-32 w-full resize-y rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm leading-relaxed text-foreground transition-colors placeholder:text-subtle-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
