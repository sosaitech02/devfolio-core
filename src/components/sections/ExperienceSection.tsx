import { Briefcase, Download, GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AppLocale } from "@/i18n/routing";
import {
  formatYearMonth,
  profileExperience,
  profileSocials,
} from "@/lib/profile";

interface ExperienceSectionProps {
  locale: AppLocale;
}

export async function ExperienceSection({ locale }: ExperienceSectionProps) {
  const t = await getTranslations({ locale, namespace: "Experience" });

  return (
    <section
      id="experience"
      className="section-py border-b border-border bg-background"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            {t("eyebrow")}
          </span>
          <h2 className="text-fluid-section font-semibold text-foreground">
            {t("title")}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        <ol className="flex flex-col gap-5">
          {profileExperience.map((entry) => {
            const isEducation = entry.type === "education";
            const Icon = isEducation ? GraduationCap : Briefcase;
            const startFormatted = formatYearMonth(entry.startDate, locale);
            const endFormatted = entry.endDate
              ? formatYearMonth(entry.endDate, locale)
              : t("present");

            return (
              <li key={entry.id}>
                <Card>
                  <CardContent className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-12 lg:gap-8">
                    <div className="flex flex-col gap-2 lg:col-span-3">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent-foreground tabular-nums">
                        {startFormatted} — {endFormatted}
                      </span>
                      <Badge
                        variant={isEducation ? "secondary" : "outline"}
                        className="w-fit font-mono text-[11px]"
                      >
                        <Icon className="size-3" aria-hidden="true" />
                        <span>
                          {isEducation ? t("typeEducation") : t("typeWork")}
                        </span>
                      </Badge>
                      <span className="text-xs text-subtle-foreground">
                        {entry.location[locale]}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-col gap-3 lg:col-span-9">
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                          {entry.role[locale]}
                        </h3>
                        <p className="text-sm font-medium text-primary-link">
                          {entry.organization}
                        </p>
                      </div>

                      <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                        {entry.summary[locale]}
                      </p>

                      <ul className="flex flex-col gap-2 text-sm leading-relaxed text-foreground">
                        {entry.highlights[locale].map((point) => (
                          <li key={point} className="flex items-start gap-2.5">
                            <span
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-decorative"
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {entry.stack.length > 0 ? (
                        <ul className="flex flex-wrap gap-1.5 pt-1">
                          {entry.stack.map((tech) => (
                            <li key={tech}>
                              <Badge
                                variant="secondary"
                                translate="no"
                                className="font-mono text-[11px]"
                              >
                                {tech}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>

        <Card className="bg-surface-elevated/60">
          <CardContent className="flex flex-col justify-between gap-4 p-5 sm:p-6 md:flex-row md:items-center">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold text-foreground">
                {t("cvTitle")}
              </h3>
              <p className="text-sm text-muted-foreground">{t("cvSubtitle")}</p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Button
                asChild
                variant={locale === "es" ? "default" : "outline"}
                size="default"
              >
                <a href={profileSocials.cv.es} download>
                  <Download className="size-4" aria-hidden="true" />
                  <span>{t("cvEs")}</span>
                </a>
              </Button>
              <Button
                asChild
                variant={locale === "en" ? "default" : "outline"}
                size="default"
              >
                <a href={profileSocials.cv.en} download>
                  <Download className="size-4" aria-hidden="true" />
                  <span>{t("cvEn")}</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
