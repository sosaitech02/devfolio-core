"use client";

import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/layout/ThemeProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const t = useTranslations("ThemeToggle");
  const { resolvedTheme, setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  function handleToggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      aria-label={t("label")}
      aria-pressed={resolvedTheme === "dark"}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "relative size-9 shrink-0 rounded-lg border-border bg-card text-foreground hover:border-accent-foreground/50 hover:bg-surface-elevated active:scale-100"
      )}
    >
      <Sun
        className="size-4 rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-200 ease-[var(--ease-out)] motion-reduce:rotate-0 motion-reduce:scale-100 dark:-rotate-45 dark:scale-90 dark:opacity-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute size-4 rotate-45 scale-90 opacity-0 transition-[transform,opacity] duration-200 ease-[var(--ease-out)] motion-reduce:rotate-0 motion-reduce:scale-100 dark:rotate-0 dark:scale-100 dark:opacity-100"
        aria-hidden="true"
      />
      <span className="sr-only">{t("label")}</span>
    </motion.button>
  );
}
