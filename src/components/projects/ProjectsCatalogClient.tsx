"use client";

import * as React from "react";
import { ViewTransition } from "react";
import { Check, RotateCcw, SearchX } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  ProjectCard,
  type ProjectCardLabels,
} from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ProjectMeta } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectsCatalogClientProps {
  projects: ProjectMeta[];
  tags: string[];
  cardLabels: ProjectCardLabels;
}

export function ProjectsCatalogClient({
  projects,
  tags,
  cardLabels,
}: ProjectsCatalogClientProps) {
  const t = useTranslations("ProjectsCatalog");
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [, startTransition] = React.useTransition();

  const filteredProjects = React.useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((project) => project.stack.includes(selectedTag));
  }, [projects, selectedTag]);

  function handleSelectTag(nextTag: string | null) {
    startTransition(() => {
      setSelectedTag(nextTag);
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <div
          role="group"
          aria-label={t("filterGroupLabel")}
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            aria-pressed={selectedTag === null}
            onClick={() => handleSelectTag(null)}
            className={cn(
              "touch-target inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-colors",
              selectedTag === null
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-surface-elevated text-foreground hover:border-accent-foreground/50"
            )}
          >
            {selectedTag === null ? (
              <Check className="size-3.5" aria-hidden="true" />
            ) : null}
            <span>{t("filterAll")}</span>
            <span className="tabular-nums opacity-80">({projects.length})</span>
          </button>

          {tags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                translate="no"
                aria-pressed={isActive}
                onClick={() => handleSelectTag(isActive ? null : tag)}
                className={cn(
                  "touch-target inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-colors",
                  isActive
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-accent-foreground/50 hover:text-foreground"
                )}
              >
                {isActive ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : null}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-xs">
          <p
            role="status"
            aria-live="polite"
            className="font-mono text-muted-foreground tabular-nums"
          >
            {t("showingCount", { count: filteredProjects.length })}
            {selectedTag
              ? ` · ${t("activeFilterSuffix", { tag: selectedTag })}`
              : ""}
          </p>

          {selectedTag ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleSelectTag(null)}
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              <span>{t("clearFilter")}</span>
            </Button>
          ) : null}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
            <div className="flex size-12 items-center justify-center rounded-full border border-border bg-surface-elevated text-accent-foreground">
              <SearchX className="size-5" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              {t("emptyTitle")}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("emptyDescription")}
            </p>
            <Button
              type="button"
              variant="default"
              size="default"
              onClick={() => handleSelectTag(null)}
              className="mt-2"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              <span>{t("emptyReset")}</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 gap-6",
            filteredProjects.length > 1 && "md:grid-cols-2"
          )}
        >
          {filteredProjects.map((project, index) => (
            <ViewTransition key={project.slug}>
              <div className="h-full">
                <ProjectCard
                  project={project}
                  labels={cardLabels}
                  featuredLayout={
                    filteredProjects.length === 1 && index === 0
                      ? "flagship"
                      : "standard"
                  }
                />
              </div>
            </ViewTransition>
          ))}
        </div>
      )}
    </div>
  );
}
