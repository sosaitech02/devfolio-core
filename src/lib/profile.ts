import type { AppLocale } from "@/i18n/routing";
import {
  experienceSchema,
  skillsMatrixSchema,
  socialsSchema,
  type ExperienceData,
  type SkillsMatrixData,
  type SocialsData,
} from "@/lib/content-schemas";
import { experience as rawExperience } from "../../content/data/experience";
import { skillsMatrix as rawSkillsMatrix } from "../../content/data/skills-matrix";
import { socials as rawSocials } from "../../content/data/socials";

export const profileSocials: SocialsData = socialsSchema.parse(rawSocials);
export const profileSkillsMatrix: SkillsMatrixData =
  skillsMatrixSchema.parse(rawSkillsMatrix);
export const profileExperience: ExperienceData =
  experienceSchema.parse(rawExperience);

export function formatYearMonth(ym: string, locale: AppLocale): string {
  const parts = ym.split("-");
  const year = Number(parts[0]);
  if (!Number.isFinite(year)) {
    return ym;
  }

  if (parts.length < 2) {
    return String(year);
  }

  const month = Number(parts[1]);
  if (!Number.isFinite(month) || month < 1 || month > 12) {
    return ym;
  }

  const date = new Date(Date.UTC(year, month - 1, 1));
  const intlLocale = locale === "es" ? "es-ES" : "en-US";
  const formatted = new Intl.DateTimeFormat(intlLocale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
