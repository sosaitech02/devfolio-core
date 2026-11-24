import { Code2, Database, Layers, Server, Wrench } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { AppLocale } from "@/i18n/routing";
import type { SkillCategory } from "@/lib/content-schemas";
import { profileSkillsMatrix } from "@/lib/profile";
import { cn } from "@/lib/utils";

interface TechStackSectionProps {
  locale: AppLocale;
}

const categoryIconMap: Record<
  SkillCategory["id"],
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  languages: Code2,
  frontend: Layers,
  backend: Server,
  databases: Database,
  "devops-tools": Wrench,
};

export async function TechStackSection({ locale }: TechStackSectionProps) {
  const t = await getTranslations({ locale, namespace: "TechStack" });

  return (
    <section
      id="stack"
      className="defer-section section-py border-b border-border bg-background"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {profileSkillsMatrix.map((category) => {
            const Icon = categoryIconMap[category.id];
            const primaryItems = category.items.filter((item) => item.primary);
            const supportingItems = category.items.filter(
              (item) => !item.primary
            );

            return (
              <Card
                key={category.id}
                className={cn(
                  "flex flex-col",
                  category.id === "devops-tools" && "md:col-span-2 lg:col-span-2"
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {category.label[locale]}
                    </h3>
                    <Icon
                      className="size-4 shrink-0 text-accent-foreground"
                      aria-hidden={true}
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {category.description[locale]}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4 pt-1">
                  {primaryItems.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-subtle-foreground">
                        {t("primaryLabel")}
                      </span>
                      <ul className="flex flex-wrap gap-1.5">
                        {primaryItems.map((item) => (
                          <li key={item.name}>
                            <Badge
                              variant="accent"
                              translate="no"
                              className="font-mono text-xs"
                            >
                              <span
                                className="size-1.5 rounded-full bg-accent-foreground"
                                aria-hidden="true"
                              />
                              <span>{item.name}</span>
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {supportingItems.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-subtle-foreground">
                        {t("supportingLabel")}
                      </span>
                      <ul className="flex flex-wrap gap-1.5">
                        {supportingItems.map((item) => (
                          <li key={item.name}>
                            <Badge
                              variant="outline"
                              translate="no"
                              className="font-mono text-xs"
                            >
                              {item.name}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
