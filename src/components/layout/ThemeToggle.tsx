"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const t = useTranslations("ThemeToggle");
  const { resolvedTheme, setTheme } = useTheme();

  function handleToggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleToggle}
      aria-label={t("label")}
      className="relative size-9 shrink-0 rounded-lg border-border bg-card text-foreground hover:border-accent-foreground/50 hover:bg-surface-elevated"
    >
      <Sun
        className="size-4 rotate-0 scale-100 transition-transform duration-150 dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute size-4 rotate-90 scale-0 transition-transform duration-150 dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
      <span className="sr-only">{t("label")}</span>
    </Button>
  );
}
