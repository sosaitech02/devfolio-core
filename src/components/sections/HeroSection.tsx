import {
  ArrowRight,
  Download,
  ExternalLink,
  Globe,
  MapPin,
  Server,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HeroSceneClient } from "@/components/sections/HeroSceneClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { profileSocials } from "@/lib/profile";

interface HeroSectionProps {
  locale: AppLocale;
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "Hero" });

  const pillars = [
    { title: t("pillar1Title"), desc: t("pillar1Desc") },
    { title: t("pillar2Title"), desc: t("pillar2Desc") },
    { title: t("pillar3Title"), desc: t("pillar3Desc") },
    { title: t("pillar4Title"), desc: t("pillar4Desc") },
  ];

  const spokenSummary = profileSocials.spokenLanguages
    .map((lang) => `${lang.name[locale]} (${lang.level[locale]})`)
    .join(" · ");

  return (
    <section
      id="about"
      className="border-b border-border bg-background py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" className="rounded-full font-mono">
              <span
                className="size-1.5 rounded-full bg-status-success"
                aria-hidden="true"
              />
              <span>{profileSocials.availability[locale]}</span>
            </Badge>
            <Badge variant="outline" className="rounded-full font-mono">
              <MapPin className="size-3" aria-hidden="true" />
              <span>{profileSocials.location[locale]}</span>
            </Badge>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-foreground sm:text-sm">
              {profileSocials.role[locale]} · {t("positioningTag")}
            </p>
            <h1 className="text-fluid-hero font-bold text-foreground">
              {profileSocials.fullName}
            </h1>
          </div>

          <p className="max-w-[65ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profileSocials.bio[locale]}
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              asChild
              variant="default"
              size="lg"
              className="cta-arrow-group w-full sm:w-auto"
            >
              <Link href="/projects" prefetch={true} transitionTypes={["nav-forward"]}>
                <span>{t("primaryCta")}</span>
                <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href={profileSocials.cv[locale]} download>
                <Download className="size-4" aria-hidden="true" />
                <span>{t("secondaryCta")}</span>
              </a>
            </Button>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-sm sm:pl-2 sm:pt-0">
              <a
                href="#contact"
                className="font-medium text-primary-link underline-offset-4 hover:underline"
              >
                {t("contactCta")}
              </a>
              <a
                href={profileSocials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("githubAria")}
                className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span translate="no">GitHub</span>
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
              <a
                href={profileSocials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("linkedinAria")}
                className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span translate="no">LinkedIn</span>
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <Card className="lg:col-span-5">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                <Server className="size-3.5" aria-hidden="true" />
                <span>{t("profileCardTitle")}</span>
              </span>
              <Badge variant="secondary" className="font-mono text-[11px]">
                <span translate="no">v1.0</span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("profileCardSubtitle")}
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-5 pt-5">
            <HeroSceneClient />

            <ul className="flex flex-col gap-3.5" aria-label={t("pillarsHeading")}>
              {pillars.map((pillar) => (
                <li key={pillar.title} className="flex items-start gap-2.5">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-decorative"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {pillar.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {pillar.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="grid gap-2.5 border-t border-border pt-4 text-xs">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <dt className="inline-flex items-center gap-1.5 font-mono text-subtle-foreground">
                  <Globe className="size-3.5" aria-hidden="true" />
                  <span>{t("languagesLabel")}</span>
                </dt>
                <dd className="font-medium text-foreground">{spokenSummary}</dd>
              </div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <dt className="inline-flex items-center gap-1.5 font-mono text-subtle-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  <span>{t("locationLabel")}</span>
                </dt>
                <dd className="font-medium text-foreground">
                  {profileSocials.location[locale]}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
