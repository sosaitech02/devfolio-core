import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const t = await getTranslations({ locale, namespace: "ProjectsStub" });

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
  };
}

export default async function ProjectsStubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ProjectsStub" });
  const projects = getAllProjects(locale);
  const tags = getAllTechTags(locale);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <div className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          {t("badge")}
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("heading")}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {t("subheading")}
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {t("tagsLabel")}
        </span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-mono">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("emptyState")}</p>
      ) : (
        <ul className="grid gap-4">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  {project.status}
                </Badge>
                <Badge variant="secondary" className="font-mono">
                  {project.date}
                </Badge>
              </div>
              <h2 className="mt-3 text-lg font-semibold">{project.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.summary}
              </p>
              <div className="mt-4">
                <Button asChild size="sm" variant="default">
                  <Link href={`/projects/${project.slug}`}>
                    {t("viewCaseStudy")}
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div>
        <Button asChild size="sm" variant="outline">
          <Link href="/">{t("backHome")}</Link>
        </Button>
      </div>
    </main>
  );
}
