import { ViewTransition } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { ProjectStatus } from "@/lib/content-schemas";
import type { ProjectMeta } from "@/lib/projects";
import { cn } from "@/lib/utils";

export interface ProjectCardLabels {
  problemLabel: string;
  stackLabel: string;
  readCaseStudy: string;
  repository: string;
  demo: string;
  statusPublished: string;
  statusInProgress: string;
  statusFixture: string;
  previewDiagramLabel: string;
}

interface ProjectCardProps {
  project: ProjectMeta;
  labels: ProjectCardLabels;
  featuredLayout?: "flagship" | "standard";
  enableViewTransition?: boolean;
}

function getStatusMeta(status: ProjectStatus, labels: ProjectCardLabels) {
  switch (status) {
    case "published":
      return {
        label: labels.statusPublished,
        variant: "success" as const,
        Icon: CheckCircle2,
      };
    case "in-progress":
      return {
        label: labels.statusInProgress,
        variant: "warning" as const,
        Icon: Wrench,
      };
    case "fixture":
    default:
      return {
        label: labels.statusFixture,
        variant: "accent" as const,
        Icon: FlaskConical,
      };
  }
}

export function ProjectCard({
  project,
  labels,
  featuredLayout = "standard",
  enableViewTransition = true,
}: ProjectCardProps) {
  const statusMeta = getStatusMeta(project.status, labels);
  const StatusIcon = statusMeta.Icon;
  const isFlagship = featuredLayout === "flagship";

  const mediaFrame = (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface-elevated">
      {project.coverImage ? (
        <Image
          src={project.coverImage}
          alt={project.coverAlt ?? project.title}
          fill
          loading="lazy"
          sizes={
            isFlagship
              ? "(max-width: 768px) 100vw, 45vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 border-b border-border pb-2.5">
            <span
              translate="no"
              className="truncate font-mono text-[11px] font-medium text-accent-foreground"
            >
              /{project.slug}
            </span>
            <span className="shrink-0 font-mono text-[11px] text-subtle-foreground tabular-nums">
              {project.date}
            </span>
          </div>

          <div
            aria-hidden="true"
            className="my-auto grid grid-cols-3 gap-2 py-3"
          >
            {project.stack.slice(0, 3).map((tech, idx) => (
              <div
                key={tech}
                className="flex flex-col gap-1 rounded-md border border-border bg-card p-2.5"
              >
                <span className="font-mono text-[10px] text-accent-foreground tabular-nums">
                  0{idx + 1}
                </span>
                <span
                  translate="no"
                  className="truncate font-mono text-xs font-semibold text-foreground"
                >
                  {tech}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-2.5 font-mono text-[11px] text-subtle-foreground">
            <span className="truncate">{labels.previewDiagramLabel}</span>
            <span translate="no" className="shrink-0 uppercase">
              ES / EN
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const titleNode = (
    <h3 className="text-fluid-card font-semibold tracking-tight text-foreground">
      {project.title}
    </h3>
  );

  return (
    <article className="@container card-surface group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent-foreground/45 sm:p-6">
      <div
        className={cn(
          "flex h-full flex-col gap-5",
          isFlagship && "@3xl:grid @3xl:grid-cols-12 @3xl:items-center @3xl:gap-8"
        )}
      >
        <div className={cn(isFlagship && "@3xl:col-span-5")}>
          {enableViewTransition ? (
            <ViewTransition
              name={`project-media-${project.slug}`}
              share="morph"
              default="none"
            >
              {mediaFrame}
            </ViewTransition>
          ) : (
            mediaFrame
          )}
        </div>

        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col gap-4",
            isFlagship && "@3xl:col-span-7"
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant={statusMeta.variant} className="rounded-full font-mono">
              <StatusIcon className="size-3" aria-hidden="true" />
              <span>{statusMeta.label}</span>
            </Badge>
            <span className="font-mono text-xs text-subtle-foreground tabular-nums">
              {project.role} · {project.date}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {enableViewTransition ? (
              <ViewTransition
                name={`project-title-${project.slug}`}
                share="text-morph"
                default="none"
              >
                {titleNode}
              </ViewTransition>
            ) : (
              titleNode
            )}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface-elevated/70 p-3.5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
              {labels.problemLabel}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">
              {project.problem}
            </p>
          </div>

          <ul className="flex flex-wrap gap-1.5" aria-label={labels.stackLabel}>
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge
                  variant="outline"
                  translate="no"
                  className="font-mono text-[11px]"
                >
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2">
            <Button
              asChild
              variant="default"
              size="sm"
              className="cta-arrow-group"
            >
              <Link
                href={`/projects/${project.slug}`}
                prefetch={true}
                transitionTypes={["nav-forward"]}
              >
                <span>{labels.readCaseStudy}</span>
                <ArrowRight
                  className="cta-arrow size-3.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span translate="no">{labels.repository}</span>
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </Button>

            {project.demoUrl ? (
              <Button asChild variant="ghost" size="sm">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{labels.demo}</span>
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
