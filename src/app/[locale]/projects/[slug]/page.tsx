import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { renderMdx } from "@/lib/mdx";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";

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
  };
}

export default async function ProjectDetailStubPage({
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

  const t = await getTranslations({ locale, namespace: "ProjectsStub" });
  const mdxContent = await renderMdx(project.content);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono">
            {project.status}
          </Badge>
          <Badge variant="secondary" className="font-mono">
            {project.date}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {project.title}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {project.summary}
        </p>
      </div>

      <dl className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            {t("roleLabel")}
          </dt>
          <dd className="mt-1 text-sm font-semibold">{project.role}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            {t("dateLabel")}
          </dt>
          <dd className="mt-1 font-mono text-sm font-semibold">
            {project.date}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            {t("statusLabel")}
          </dt>
          <dd className="mt-1 font-mono text-sm font-semibold">
            {project.status}
          </dd>
        </div>
      </dl>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xs font-medium text-muted-foreground">
          {t("problemLabel")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed">{project.problem}</p>
      </section>

      <article className="space-y-4 rounded-xl border border-border bg-card p-6 text-sm leading-relaxed">
        {mdxContent}
      </article>

      <div className="flex flex-wrap gap-3">
        <Button asChild size="sm" variant="outline">
          <Link href="/projects">{t("backToProjects")}</Link>
        </Button>
        <Button asChild size="sm" variant="secondary">
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            {t("repositoryLink")}
          </a>
        </Button>
        {project.demoUrl ? (
          <Button asChild size="sm" variant="default">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              {t("demoLink")}
            </a>
          </Button>
        ) : null}
      </div>
    </main>
  );
}
