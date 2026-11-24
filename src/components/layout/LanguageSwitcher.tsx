"use client";

import { useTransition } from "react";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

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
      className="inline-flex items-center gap-1 rounded-md border border-border bg-card p-0.5"
    >
      <Languages className="ml-1.5 size-3.5 text-muted-foreground" aria-hidden="true" />
      {routing.locales.map((targetLocale) => {
        const isActive = locale === targetLocale;
        const ariaLabel =
          targetLocale === "es" ? t("switchToEs") : t("switchToEn");
        return (
          <Button
            key={targetLocale}
            type="button"
            variant={isActive ? "default" : "ghost"}
            size="sm"
            disabled={isPending}
            aria-label={ariaLabel}
            aria-pressed={isActive}
            onClick={() => handleSelectLocale(targetLocale)}
            className="h-7 px-2.5 text-xs font-semibold"
          >
            {t(targetLocale)}
          </Button>
        );
      })}
    </div>
  );
}
