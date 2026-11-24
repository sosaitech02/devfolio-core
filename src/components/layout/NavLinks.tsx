"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const isProjectsRoute = pathname.startsWith("/projects");

  const items = [
    {
      href: "/projects",
      label: t("projects"),
      active: isProjectsRoute,
      transitionTypes: isProjectsRoute ? undefined : ["nav-forward"],
    },
    {
      href: "/#stack",
      label: t("stack"),
      active: false,
      transitionTypes: isProjectsRoute ? ["nav-back"] : undefined,
    },
    {
      href: "/#experience",
      label: t("experience"),
      active: false,
      transitionTypes: isProjectsRoute ? ["nav-back"] : undefined,
    },
    {
      href: "/#contact",
      label: t("contact"),
      active: false,
      transitionTypes: isProjectsRoute ? ["nav-back"] : undefined,
    },
  ];

  return (
    <nav
      aria-label={t("primaryLabel")}
      className="hidden items-center gap-1 lg:flex"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          transitionTypes={item.transitionTypes}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            item.active
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
