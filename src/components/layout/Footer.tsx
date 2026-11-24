import { ExternalLink, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { profileSocials } from "@/lib/profile";

interface FooterProps {
  locale: AppLocale;
}

export async function Footer({ locale }: FooterProps) {
  const [tFooter, tNav] = await Promise.all([
    getTranslations({ locale, namespace: "Footer" }),
    getTranslations({ locale, namespace: "Nav" }),
  ]);

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-col gap-1">
            <span
              translate="no"
              className="text-base font-bold tracking-tight text-foreground"
            >
              Cruzmar&nbsp;Sosa
            </span>
            <p className="text-sm text-muted-foreground">
              {profileSocials.role[locale]} · {profileSocials.location[locale]}
            </p>
          </div>

          <nav
            aria-label={tFooter("navigationLabel")}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          >
            <Link
              href="/projects"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {tNav("projects")}
            </Link>
            <Link
              href="/#stack"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {tNav("stack")}
            </Link>
            <Link
              href="/#experience"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {tNav("experience")}
            </Link>
            <Link
              href="/#contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {tNav("contact")}
            </Link>
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-subtle-foreground sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <p>{tFooter("rights")}</p>
            <p>{tFooter("builtWith")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profileSocials.email}`}
              className="inline-flex items-center gap-1.5 font-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              <span translate="no">{profileSocials.email}</span>
            </a>
            <a
              href={profileSocials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span translate="no">GitHub</span>
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
            <a
              href={profileSocials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span translate="no">LinkedIn</span>
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
