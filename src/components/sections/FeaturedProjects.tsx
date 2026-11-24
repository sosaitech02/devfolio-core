import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  ProjectCard,
  type ProjectCardLabels,
} from "@/components/projects/ProjectCard";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getFeaturedProjects } from "@/lib/projects";

interface FeaturedProjectsProps {
  locale: AppLocale;
}

export async function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const t = await getTranslations({ locale, namespace: "FeaturedProjects" });
  const projects = getFeaturedProjects(locale);
  const [flagship, ...supporting] = projects;

  const cardLabels: ProjectCardLabels = {
    problemLabel: t("problemLabel"),
    stackLabel: t("stackLabel"),
    readCaseStudy: t("readCaseStudy"),
    repository: t("repository"),
    demo: t("demo"),
    statusPublished: t("statusPublished"),
    statusInProgress: t("statusInProgress"),
    statusFixture: t("statusFixture"),
    previewDiagramLabel: t("previewDiagramLabel"),
  };

  return (
    <section
      id="projects"
      className="section-py border-b border-border bg-background"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
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

          <Link
            href="/projects"
            prefetch={true}
            transitionTypes={["nav-forward"]}
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary-link underline-offset-4 hover:underline"
          >
            <span>{t("viewCatalog")}</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {flagship ? (
            <ProjectCard
              project={flagship}
              labels={cardLabels}
              featuredLayout="flagship"
            />
          ) : null}

          {supporting.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {supporting.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  labels={cardLabels}
                  featuredLayout="standard"
                />
              ))}
            </div>
          ) : null}
        </div>

        {projects.every((project) => project.status === "fixture") ? (
          <p className="rounded-lg border border-border bg-surface-elevated/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            {t("phase4Note")}
          </p>
        ) : null}
      </div>
    </section>
  );
}
