"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const t = useTranslations("Contact");
  const [status, setStatus] = React.useState<"idle" | "copied" | "error">(
    "idle"
  );
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    timerRef.current = setTimeout(() => {
      setStatus("idle");
    }, 3000);
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant={status === "copied" ? "secondary" : "default"}
        size="default"
        onClick={handleCopy}
        className="w-full sm:w-auto"
      >
        {status === "copied" ? (
          <Check className="size-4 text-status-success" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
        <span>
          {status === "copied" ? t("emailCopied") : t("copyEmail")}
        </span>
      </Button>

      <p role="status" aria-live="polite" className="sr-only">
        {status === "copied"
          ? t("emailCopied")
          : status === "error"
            ? t("emailCopyError")
            : ""}
      </p>

      {status === "error" ? (
        <p className="text-xs text-destructive">{t("emailCopyError")}</p>
      ) : null}
    </div>
  );
}
