import { ViewTransition } from "react";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ProjectCardLabels } from "@/components/projects/ProjectCard";
import { ProjectsCatalogClient } from "@/components/projects/ProjectsCatalogClient";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllProjects, getAllTechTags } from "@/lib/projects";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ProjectsCatalog" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        es: "/es/projects",
        en: "/en/projects",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `/${locale}/projects`,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [tCatalog, tFeatured] = await Promise.all([
    getTranslations({ locale, namespace: "ProjectsCatalog" }),
    getTranslations({ locale, namespace: "FeaturedProjects" }),
  ]);

  const projects = getAllProjects(locale);
  const tags = getAllTechTags(locale);

  const cardLabels: ProjectCardLabels = {
    problemLabel: tFeatured("problemLabel"),
    stackLabel: tFeatured("stackLabel"),
    readCaseStudy: tFeatured("readCaseStudy"),
    repository: tFeatured("repository"),
    demo: tFeatured("demo"),
    statusPublished: tFeatured("statusPublished"),
    statusInProgress: tFeatured("statusInProgress"),
    statusFixture: tFeatured("statusFixture"),
    previewDiagramLabel: tFeatured("previewDiagramLabel"),
  };

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
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        <div className="flex flex-col gap-4">
          <nav
            aria-label={tCatalog("breadcrumbLabel")}
            className="flex items-center gap-1.5 font-mono text-xs text-subtle-foreground"
          >
            <Link
              href="/"
              transitionTypes={["nav-back"]}
              className="transition-colors hover:text-foreground"
            >
              {tCatalog("breadcrumbHome")}
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page" className="text-foreground">
              {tCatalog("breadcrumbCurrent")}
            </span>
          </nav>

          <div className="flex max-w-3xl flex-col gap-2.5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              {tCatalog("eyebrow")}
            </span>
            <h1 className="text-fluid-hero font-bold text-foreground">
              {tCatalog("heading")}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              {tCatalog("subheading")}
            </p>
          </div>
        </div>

        <ProjectsCatalogClient
          projects={projects}
          tags={tags}
          cardLabels={cardLabels}
        />
      </main>
    </ViewTransition>
  );
}
