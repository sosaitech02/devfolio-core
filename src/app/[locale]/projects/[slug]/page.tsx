import { ViewTransition } from "react";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Lock,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/projects/MdxComponents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { ProjectStatus } from "@/lib/content-schemas";
import { renderMdx } from "@/lib/mdx";
import {
  getAllProjectSlugs,
  getAllProjects,
  getProjectBySlug,
} from "@/lib/projects";

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const project = getProjectBySlug(locale, slug);
  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        es: `/es/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/${locale}/projects/${slug}`,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "article",
    },
  };
}

function resolveStatusDisplay(
  status: ProjectStatus,
  labels: { published: string; inProgress: string; fixture: string }
) {
  switch (status) {
    case "published":
      return {
        label: labels.published,
        variant: "success" as const,
        Icon: CheckCircle2,
      };
    case "in-progress":
      return {
        label: labels.inProgress,
        variant: "warning" as const,
        Icon: Wrench,
      };
    case "fixture":
    default:
      return {
        label: labels.fixture,
        variant: "accent" as const,
        Icon: FlaskConical,
      };
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const project = getProjectBySlug(locale, slug);
  if (!project) {
    notFound();
  }

  const [tDetail, tFeatured, mdxContent] = await Promise.all([
    getTranslations({ locale, namespace: "ProjectDetail" }),
    getTranslations({ locale, namespace: "FeaturedProjects" }),
    renderMdx(project.content, mdxComponents),
  ]);

  const allProjects = getAllProjects(locale);
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : undefined;

  const statusMeta = resolveStatusDisplay(project.status, {
    published: tFeatured("statusPublished"),
    inProgress: tFeatured("statusInProgress"),
    fixture: tFeatured("statusFixture"),
  });
  const StatusIcon = statusMeta.Icon;

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
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/projects"
              transitionTypes={["nav-back"]}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>{tDetail("backToProjects")}</span>
            </Link>

            <span
              translate="no"
              className="rounded-md border border-border bg-surface-elevated px-2.5 py-1 font-mono text-xs text-subtle-foreground"
            >
              /projects/{project.slug}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={statusMeta.variant}
                className="rounded-full font-mono"
              >
                <StatusIcon className="size-3" aria-hidden="true" />
                <span>{statusMeta.label}</span>
              </Badge>
              <Badge variant="secondary" className="font-mono tabular-nums">
                {project.date}
              </Badge>
              <Badge variant="outline" className="font-mono">
                {project.role}
              </Badge>
            </div>

            <ViewTransition
              name={`project-title-${project.slug}`}
              share="text-morph"
              default="none"
            >
              <h1 className="max-w-4xl text-fluid-hero font-bold text-foreground">
                {project.title}
              </h1>
            </ViewTransition>

            <p className="max-w-[68ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.repoUrl && project.repoVisibility !== "private" ? (
                <Button asChild variant="default" size="lg">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{tDetail("repositoryLink")}</span>
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              ) : (
                <Badge
                  variant="outline"
                  className="inline-flex h-10 items-center gap-2 rounded-lg px-3.5 font-mono text-xs text-muted-foreground"
                >
                  <Lock className="size-3.5" aria-hidden="true" />
                  <span>{tDetail("privateRepository")}</span>
                </Badge>
              )}

              {project.demoUrl ? (
                <Button asChild variant="outline" size="lg">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{tDetail("demoLink")}</span>
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <ViewTransition
            name={`project-media-${project.slug}`}
            share="morph"
            default="none"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface-elevated">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.coverAlt ?? project.title}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col justify-between p-5 sm:p-8">
                  <div className="flex items-center justify-between gap-3 border-b border-border pb-3 font-mono text-xs">
                    <span
                      translate="no"
                      className="font-semibold text-accent-foreground"
                    >
                      {tFeatured("previewDiagramLabel")}
                    </span>
                    <span
                      translate="no"
                      className="text-subtle-foreground tabular-nums"
                    >
                      {project.slug} · {project.date}
                    </span>
                  </div>

                  <div className="my-auto grid grid-cols-2 gap-3 py-4 sm:grid-cols-4 sm:gap-4">
                    {project.stack.slice(0, 4).map((layer, idx) => (
                      <div
                        key={layer}
                        className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3.5 sm:p-4"
                      >
                        <span className="font-mono text-[11px] font-semibold text-accent-foreground tabular-nums">
                          0{idx + 1}
                        </span>
                        <span
                          translate="no"
                          className="font-mono text-sm font-semibold text-foreground"
                        >
                          {layer}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="border-t border-border pt-3 text-xs text-muted-foreground">
                    {project.coverAlt ?? project.summary}
                  </p>
                </div>
              )}
            </div>
          </ViewTransition>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex min-w-0 flex-col gap-8 lg:col-span-8">
            <Card className="bg-surface-elevated/50">
              <CardHeader className="pb-2">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                  {tDetail("problemLabel")}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="max-w-[68ch] text-sm leading-relaxed text-foreground sm:text-base">
                  {project.problem}
                </p>
              </CardContent>
            </Card>

            <article className="min-w-0 rounded-xl border border-border bg-card p-6 sm:p-8">
              {mdxContent}
            </article>
          </div>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-span-4">
            <Card>
              <CardHeader className="border-b border-border pb-4">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                  {tDetail("metaCardTitle")}
                </h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 pt-5">
                <dl className="grid gap-3.5 text-sm">
                  <div className="flex flex-col gap-0.5">
                    <dt className="font-mono text-xs text-subtle-foreground">
                      {tDetail("roleLabel")}
                    </dt>
                    <dd className="font-medium text-foreground">
                      {project.role}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="font-mono text-xs text-subtle-foreground">
                      {tDetail("dateLabel")}
                    </dt>
                    <dd className="font-mono font-medium text-foreground tabular-nums">
                      {project.date}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="font-mono text-xs text-subtle-foreground">
                      {tDetail("statusLabel")}
                    </dt>
                    <dd className="font-medium text-foreground">
                      {statusMeta.label}
                    </dd>
                  </div>
                </dl>

                <Separator />

                <div className="flex flex-col gap-2.5">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
                    {tDetail("stackLabel")}
                  </h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <Badge
                          variant="accent"
                          translate="no"
                          className="font-mono text-xs"
                        >
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.highlights && project.highlights.length > 0 ? (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-2.5">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
                        {tDetail("highlightsLabel")}
                      </h3>
                      <ul className="flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground">
                        {project.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2
                              className="mt-0.5 size-3.5 shrink-0 text-status-success"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>
          </aside>
        </div>

        <nav
          aria-label={tDetail("allProjects")}
          className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              prefetch={true}
              transitionTypes={["nav-back"]}
              className="card-surface flex flex-col gap-1 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent-foreground/50"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle-foreground">
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                <span>{tDetail("previousProject")}</span>
              </span>
              <span className="text-base font-semibold text-foreground">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/projects"
              transitionTypes={["nav-back"]}
              className="card-surface flex flex-col gap-1 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent-foreground/50"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle-foreground">
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                <span>{tDetail("backToProjects")}</span>
              </span>
              <span className="text-base font-semibold text-foreground">
                {tDetail("allProjects")}
              </span>
            </Link>
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              prefetch={true}
              transitionTypes={["nav-forward"]}
              className="card-surface flex flex-col items-start gap-1 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent-foreground/50 sm:items-end sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle-foreground">
                <span>{tDetail("nextProject")}</span>
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold text-foreground">
                {nextProject.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </main>
    </ViewTransition>
  );
}
