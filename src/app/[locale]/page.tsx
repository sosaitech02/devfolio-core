import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const verifiedStack = [
  "Next.js 16.4.6",
  "React 19.3.0",
  "TypeScript 5.9",
  "Tailwind CSS v4",
  "shadcn/ui",
  "next-intl",
  "Native Theme",
] as const;

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Phase1Skeleton" });
  const tTheme = await getTranslations({ locale, namespace: "ThemeToggle" });

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur-xs">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm font-semibold tracking-tight">
              devfolio-core
            </span>
            <Badge variant="secondary">{t("badge")}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-8 px-6 py-16">
        <section className="rounded-xl border border-border bg-card p-6 shadow-xs sm:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{t("phaseTag")}</Badge>
              <Badge variant="outline" className="font-mono">
                /{locale}
              </Badge>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t("title")}
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("description")}
            </p>
          </div>

          <dl className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-4">
              <dt className="text-xs font-medium text-muted-foreground">
                {t("statusLabel")}
              </dt>
              <dd className="mt-1 font-mono text-xs font-semibold">
                {t("statusValue")}
              </dd>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <dt className="text-xs font-medium text-muted-foreground">
                {t("localeLabel")}
              </dt>
              <dd className="mt-1 font-mono text-xs font-semibold uppercase">
                {locale}
              </dd>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <dt className="text-xs font-medium text-muted-foreground">
                {t("themeLabel")}
              </dt>
              <dd className="mt-1 font-mono text-xs font-semibold">
                {tTheme("light")} / {tTheme("dark")} ({tTheme("system")})
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
            <span className="text-xs font-medium text-muted-foreground">
              {t("stackLabel")}
            </span>
            <div className="flex flex-wrap gap-2">
              {verifiedStack.map((item) => (
                <Badge key={item} variant="secondary" className="font-mono">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
            <Button asChild variant="default" size="sm">
              <Link href="/">{t("primaryAction")}</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/">{t("secondaryAction")}</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
