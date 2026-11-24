"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
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
              "min-h-8 min-w-8 rounded-md px-2.5 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active"
                : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground active:bg-surface-subtle"
            )}
          >
            {t(targetLocale)}
          </button>
        );
      })}
    </div>
  );
}
