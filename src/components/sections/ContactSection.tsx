import { ExternalLink, Mail, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/sections/ContactForm";
import { CopyEmailButton } from "@/components/sections/CopyEmailButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { AppLocale } from "@/i18n/routing";
import { profileSocials } from "@/lib/profile";

interface ContactSectionProps {
  locale: AppLocale;
}

export async function ContactSection({ locale }: ContactSectionProps) {
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <section id="contact" className="section-py bg-background">
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Card>
              <CardHeader className="pb-3">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                  <Mail className="size-3.5" aria-hidden="true" />
                  <span>{t("emailLabel")}</span>
                </span>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <a
                  href={`mailto:${profileSocials.email}`}
                  translate="no"
                  className="break-all font-mono text-sm font-semibold text-foreground underline-offset-4 hover:text-primary-link hover:underline sm:text-base"
                >
                  {profileSocials.email}
                </a>
                <CopyEmailButton email={profileSocials.email} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
                  {t("profilesLabel")}
                </span>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5">
                <a
                  href={profileSocials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-between gap-3 rounded-lg border border-border bg-surface-elevated/60 px-3.5 py-2.5 text-sm transition-colors hover:border-accent-foreground/50 hover:bg-surface-elevated"
                >
                  <span translate="no" className="font-semibold text-foreground">
                    GitHub
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <span translate="no" className="truncate">
                      github.com/Cruzmar-Sosa
                    </span>
                    <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                  </span>
                </a>

                <a
                  href={profileSocials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-between gap-3 rounded-lg border border-border bg-surface-elevated/60 px-3.5 py-2.5 text-sm transition-colors hover:border-accent-foreground/50 hover:bg-surface-elevated"
                >
                  <span translate="no" className="font-semibold text-foreground">
                    LinkedIn
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <span translate="no" className="truncate">
                      Cruzmar Sosa
                    </span>
                    <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                  </span>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-2 p-5">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  <span>{t("locationLabel")}</span>
                </span>
                <p className="text-sm font-medium text-foreground">
                  {profileSocials.location[locale]} ·{" "}
                  {profileSocials.availability[locale]}
                </p>
                <p className="text-xs leading-relaxed text-subtle-foreground">
                  {t("privacyNote")}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-7">
            <CardHeader className="border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {t("formTitle")}
              </h3>
            </CardHeader>
            <CardContent className="pt-6">
              <ContactForm recipientEmail={profileSocials.email} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
