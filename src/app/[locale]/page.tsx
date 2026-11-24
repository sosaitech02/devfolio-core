import { ViewTransition } from "react";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { routing } from "@/i18n/routing";

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

  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <HeroSection locale={locale} />
        <FeaturedProjects locale={locale} />
        <TechStackSection locale={locale} />
        <ExperienceSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
    </ViewTransition>
  );
}
