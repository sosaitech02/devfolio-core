import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  projectFrontmatterSchema,
  type ProjectFrontmatter,
} from "@/lib/content-schemas";

const PROJECTS_ROOT = path.join(process.cwd(), "content", "projects");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface ProjectMeta extends ProjectFrontmatter {
  locale: AppLocale;
}

export interface ProjectEntry extends ProjectMeta {
  content: string;
}

function getLocaleDirectory(locale: AppLocale): string {
  return path.join(PROJECTS_ROOT, locale);
}

function listLocaleSlugs(locale: AppLocale): string[] {
  const dir = getLocaleDirectory(locale);
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort((a, b) => a.localeCompare(b));
}

function parseProjectFile(locale: AppLocale, slug: string): ProjectEntry {
  const filePath = path.join(getLocaleDirectory(locale), `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid MDX frontmatter in "${filePath}": ${issues}`);
  }

  if (parsed.data.slug !== slug) {
    throw new Error(
      `Slug mismatch in "${filePath}": frontmatter slug "${parsed.data.slug}" does not match filename "${slug}.mdx"`
    );
  }

  return {
    ...parsed.data,
    locale,
    content: content.trim(),
  };
}

function sortProjectsDeterministically(
  a: ProjectMeta,
  b: ProjectMeta
): number {
  if (a.order !== b.order) {
    return a.order - b.order;
  }
  const dateCmp = b.date.localeCompare(a.date);
  if (dateCmp !== 0) {
    return dateCmp;
  }
  return a.slug.localeCompare(b.slug);
}

export function getAllProjectSlugs(): string[] {
  const [defaultLocale, ...otherLocales] = routing.locales;
  const baseSlugs = listLocaleSlugs(defaultLocale);

  for (const locale of otherLocales) {
    const localeSlugs = listLocaleSlugs(locale);
    const missingInLocale = baseSlugs.filter((s) => !localeSlugs.includes(s));
    const extraInLocale = localeSlugs.filter((s) => !baseSlugs.includes(s));

    if (missingInLocale.length > 0 || extraInLocale.length > 0) {
      throw new Error(
        `Project slug parity mismatch between "${defaultLocale}" and "${locale}". Missing in "${locale}": [${missingInLocale.join(", ")}]. Extra in "${locale}": [${extraInLocale.join(", ")}].`
      );
    }
  }

  return baseSlugs;
}

export function getAllProjects(locale: AppLocale): ProjectMeta[] {
  const slugs = listLocaleSlugs(locale);
  const projects = slugs.map((slug) => {
    const entry = parseProjectFile(locale, slug);
    return {
      slug: entry.slug,
      title: entry.title,
      summary: entry.summary,
      problem: entry.problem,
      role: entry.role,
      date: entry.date,
      featured: entry.featured,
      order: entry.order,
      status: entry.status,
      stack: entry.stack,
      repoUrl: entry.repoUrl,
      demoUrl: entry.demoUrl,
      coverImage: entry.coverImage,
      coverAlt: entry.coverAlt,
      highlights: entry.highlights,
      locale: entry.locale,
    };
  });

  return projects.sort(sortProjectsDeterministically);
}

export function getFeaturedProjects(locale: AppLocale): ProjectMeta[] {
  return getAllProjects(locale).filter((project) => project.featured);
}

export function getProjectBySlug(
  locale: AppLocale,
  slug: string
): ProjectEntry | null {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }

  const filePath = path.join(getLocaleDirectory(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseProjectFile(locale, slug);
}

export function getAllTechTags(locale: AppLocale): string[] {
  const tagSet = new Set<string>();
  for (const project of getAllProjects(locale)) {
    for (const tech of project.stack) {
      tagSet.add(tech);
    }
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}
