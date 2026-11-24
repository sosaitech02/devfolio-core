import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  experienceSchema,
  projectFrontmatterSchema,
  skillsMatrixSchema,
  socialsSchema,
} from "../src/lib/content-schemas.ts";
import { experience } from "../content/data/experience.ts";
import { skillsMatrix } from "../content/data/skills-matrix.ts";
import { socials } from "../content/data/socials.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const LOCALES = ["es", "en"];
const errors = [];

function flattenKeys(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value, nextKey));
    } else {
      keys.push(nextKey);
    }
  }
  return keys.sort((a, b) => a.localeCompare(b));
}

function validateMessagesParity() {
  const esPath = path.join(ROOT, "messages", "es.json");
  const enPath = path.join(ROOT, "messages", "en.json");

  const esJson = JSON.parse(fs.readFileSync(esPath, "utf8"));
  const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));

  const esKeys = flattenKeys(esJson);
  const enKeys = flattenKeys(enJson);

  const missingInEn = esKeys.filter((k) => !enKeys.includes(k));
  const missingInEs = enKeys.filter((k) => !esKeys.includes(k));

  if (missingInEn.length > 0) {
    errors.push(`messages/en.json missing keys: ${missingInEn.join(", ")}`);
  }
  if (missingInEs.length > 0) {
    errors.push(`messages/es.json missing keys: ${missingInEs.join(", ")}`);
  }

  return { esCount: esKeys.length, enCount: enKeys.length };
}

function validateProjects() {
  const projectsByLocale = {};

  for (const locale of LOCALES) {
    const dir = path.join(ROOT, "content", "projects", locale);
    if (!fs.existsSync(dir)) {
      errors.push(`Missing projects directory: ${dir}`);
      projectsByLocale[locale] = new Map();
      continue;
    }

    const files = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".mdx"))
      .sort((a, b) => a.localeCompare(b));

    const localeMap = new Map();

    for (const file of files) {
      const expectedSlug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);

      const parsed = projectFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        const details = parsed.error.issues
          .map((i) => `${i.path.join(".") || "root"}: ${i.message}`)
          .join("; ");
        errors.push(`Invalid frontmatter in content/projects/${locale}/${file}: ${details}`);
        continue;
      }

      if (parsed.data.slug !== expectedSlug) {
        errors.push(
          `Slug mismatch in content/projects/${locale}/${file}: frontmatter="${parsed.data.slug}" vs file="${expectedSlug}"`
        );
      }

      if (content.trim().length === 0) {
        errors.push(`Empty MDX body in content/projects/${locale}/${file}`);
      }

      localeMap.set(expectedSlug, parsed.data);
    }

    projectsByLocale[locale] = localeMap;
  }

  const esSlugs = Array.from(projectsByLocale.es.keys()).sort();
  const enSlugs = Array.from(projectsByLocale.en.keys()).sort();

  if (esSlugs.length === 0 || enSlugs.length === 0) {
    errors.push("At least one bilingual project MDX file is required in content/projects/{es,en}/");
  }

  const missingInEn = esSlugs.filter((s) => !enSlugs.includes(s));
  const missingInEs = enSlugs.filter((s) => !esSlugs.includes(s));

  if (missingInEn.length > 0) {
    errors.push(`content/projects/en/ missing slugs: ${missingInEn.join(", ")}`);
  }
  if (missingInEs.length > 0) {
    errors.push(`content/projects/es/ missing slugs: ${missingInEs.join(", ")}`);
  }

  const sharedSlugs = esSlugs.filter((s) => enSlugs.includes(s));
  const sharedFields = ["slug", "date", "featured", "order", "status", "repoUrl", "coverImage"];

  for (const slug of sharedSlugs) {
    const esMeta = projectsByLocale.es.get(slug);
    const enMeta = projectsByLocale.en.get(slug);

    for (const field of sharedFields) {
      if (esMeta[field] !== enMeta[field]) {
        errors.push(
          `Technical metadata mismatch for slug "${slug}" on field "${field}": es=${JSON.stringify(esMeta[field])} vs en=${JSON.stringify(enMeta[field])}`
        );
      }
    }

    if (JSON.stringify(esMeta.stack) !== JSON.stringify(enMeta.stack)) {
      errors.push(
        `Stack mismatch for slug "${slug}": es=${JSON.stringify(esMeta.stack)} vs en=${JSON.stringify(enMeta.stack)}`
      );
    }

    if (Boolean(esMeta.demoUrl) !== Boolean(enMeta.demoUrl)) {
      errors.push(`demoUrl presence mismatch for slug "${slug}" between es and en`);
    }
  }

  return { slugCount: sharedSlugs.length, slugs: sharedSlugs };
}

function validateStructuredData() {
  const checks = [
    ["content/data/socials.ts", socialsSchema.safeParse(socials)],
    ["content/data/skills-matrix.ts", skillsMatrixSchema.safeParse(skillsMatrix)],
    ["content/data/experience.ts", experienceSchema.safeParse(experience)],
  ];

  for (const [label, result] of checks) {
    if (!result.success) {
      const details = result.error.issues
        .map((i) => `${i.path.join(".") || "root"}: ${i.message}`)
        .join("; ");
      errors.push(`Invalid structured data in ${label}: ${details}`);
    }
  }

  return {
    skillCategories: skillsMatrix.length,
    experienceEntries: experience.length,
  };
}

const msgSummary = validateMessagesParity();
const projectSummary = validateProjects();
const dataSummary = validateStructuredData();

if (errors.length > 0) {
  console.error("Content validation FAILED:");
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log("Content validation PASSED:");
console.log(`  - messages parity: ES=${msgSummary.esCount} | EN=${msgSummary.enCount} (100%)`);
console.log(`  - projects MDX parity: ${projectSummary.slugCount} slug(s) [${projectSummary.slugs.join(", ")}]`);
console.log(`  - content/data Zod checks: socials OK | skillsMatrix (${dataSummary.skillCategories} categories) OK | experience (${dataSummary.experienceEntries} entries) OK`);
