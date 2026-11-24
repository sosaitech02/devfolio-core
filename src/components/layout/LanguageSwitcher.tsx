"use client";

import { useTransition } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const PILL_SPRING = {
  type: "spring" as const,
  stiffness: 460,
  damping: 36,
  mass: 0.75,
};

export function LanguageSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isPending, startTransition] = useTransition();

  function handleSelectLocale(nextLocale: AppLocale) {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="inline-flex items-center rounded-lg border border-border bg-card p-0.5"
    >
      {routing.locales.map((targetLocale) => {
        const isActive = locale === targetLocale;
        const ariaLabel =
          targetLocale === "es" ? t("switchToEs") : t("switchToEn");
        return (
          <button
            key={targetLocale}
            type="button"
            disabled={isPending}
            aria-label={ariaLabel}
            aria-pressed={isActive}
            onClick={() => handleSelectLocale(targetLocale)}
            className={cn(
              "group/lang relative min-h-8 min-w-8 rounded-md px-2.5 font-mono text-xs font-semibold transition-[color,background-color,transform] duration-150 ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground active:bg-surface-subtle"
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="devfolio-active-locale-pill"
                data-active-locale-pill="true"
                aria-hidden="true"
                transition={prefersReducedMotion ? { duration: 0 } : PILL_SPRING}
                className="pointer-events-none absolute inset-0 rounded-md bg-primary transition-colors duration-150 group-hover/lang:bg-primary-hover group-active/lang:bg-primary-active"
              />
            ) : null}
            <span className="relative z-10">{t(targetLocale)}</span>
          </button>
        );
      })}
    </div>
  );
}
