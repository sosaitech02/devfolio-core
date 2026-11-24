import { z } from "zod";

export const localizedTextSchema = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});

export const localizedStringListSchema = z.object({
  es: z.array(z.string().min(1)).min(1),
  en: z.array(z.string().min(1)).min(1),
});

export const projectStatusSchema = z.enum([
  "published",
  "in-progress",
  "fixture",
]);

export const projectFrontmatterSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase kebab-case"),
  title: z.string().min(3).max(120),
  summary: z.string().min(10).max(220),
  problem: z.string().min(10).max(400),
  role: z.string().min(2).max(80),
  date: z
    .string()
    .regex(
      /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/,
      "Date must follow YYYY, YYYY-MM, or YYYY-MM-DD"
    ),
  featured: z.boolean(),
  order: z.number().int().min(1),
  status: projectStatusSchema.default("published"),
  stack: z.array(z.string().min(1)).min(1),
  repoUrl: z.url(),
  demoUrl: z.url().optional(),
  coverImage: z.string().startsWith("/").optional(),
  coverAlt: z.string().min(3).max(160).optional(),
  highlights: z.array(z.string().min(5)).min(1).optional(),
});

export const spokenLanguageSchema = z.object({
  name: localizedTextSchema,
  level: localizedTextSchema,
});

export const socialsSchema = z.object({
  brandName: z.string().min(1),
  fullName: z.string().min(2),
  role: localizedTextSchema,
  bio: localizedTextSchema,
  location: localizedTextSchema,
  availability: localizedTextSchema,
  spokenLanguages: z.array(spokenLanguageSchema).min(1),
  email: z.email(),
  github: z.url(),
  linkedin: z.url(),
  cv: z.object({
    es: z.string().startsWith("/cv/").endsWith(".pdf"),
    en: z.string().startsWith("/cv/").endsWith(".pdf"),
  }),
  isPlaceholder: z.boolean(),
});

export const skillCategoryIdSchema = z.enum([
  "languages",
  "frontend",
  "backend",
  "databases",
  "devops-tools",
]);

export const skillCategorySchema = z.object({
  id: skillCategoryIdSchema,
  label: localizedTextSchema,
  description: localizedTextSchema,
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        primary: z.boolean().optional(),
      })
    )
    .min(1),
});

export const skillsMatrixSchema = z.array(skillCategorySchema).min(1);

export const experienceEntrySchema = z.object({
  id: z.string().min(1),
  type: z.enum(["work", "education"]),
  role: localizedTextSchema,
  organization: z.string().min(2),
  location: localizedTextSchema,
  startDate: z
    .string()
    .regex(/^\d{4}(?:-\d{2})?$/, "startDate must be YYYY or YYYY-MM"),
  endDate: z
    .string()
    .regex(/^\d{4}(?:-\d{2})?$/, "endDate must be YYYY or YYYY-MM")
    .nullable(),
  summary: localizedTextSchema,
  highlights: localizedStringListSchema,
  stack: z.array(z.string().min(1)),
  isPlaceholder: z.boolean().optional(),
});

export const experienceSchema = z.array(experienceEntrySchema).min(1);

export type LocalizedText = z.infer<typeof localizedTextSchema>;
export type SpokenLanguage = z.infer<typeof spokenLanguageSchema>;
export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type SocialsData = z.infer<typeof socialsSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type SkillsMatrixData = z.infer<typeof skillsMatrixSchema>;
export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
