import { Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { NavLinks } from "@/components/layout/NavLinks";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { profileSocials } from "@/lib/profile";

interface NavbarProps {
  locale: AppLocale;
}

export async function Navbar({ locale }: NavbarProps) {
  const t = await getTranslations({ locale, namespace: "Nav" });
  const cvHref = profileSocials.cv[locale];

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          aria-label={t("homeAria")}
          className="flex min-w-0 items-center gap-2.5 rounded-md py-1 text-foreground transition-colors hover:text-primary-link"
        >
          <span
            translate="no"
            className="truncate text-base font-bold tracking-tight sm:text-lg"
          >
            Cruzmar&nbsp;Sosa
          </span>
        </Link>

        <NavLinks />

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <a href={cvHref} download>
              <Download className="size-3.5" aria-hidden="true" />
              <span>{t("downloadCv")}</span>
            </a>
          </Button>
          <MobileNavDrawer
            cvHref={cvHref}
            githubUrl={profileSocials.github}
            linkedinUrl={profileSocials.linkedin}
          />
        </div>
      </div>
    </header>
  );
}
