"use client";

import * as React from "react";
import { Download, ExternalLink, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface MobileNavDrawerProps {
  cvHref: string;
  githubUrl: string;
  linkedinUrl: string;
}

export function MobileNavDrawer({
  cvHref,
  githubUrl,
  linkedinUrl,
}: MobileNavDrawerProps) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const restoreFocusRef = React.useRef(true);
  const [isOpen, setIsOpen] = React.useState(false);

  const isProjectsRoute = pathname.startsWith("/projects");

  const openDrawer = React.useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    restoreFocusRef.current = true;
    dialog.showModal();
    setIsOpen(true);
  }, []);

  const closeDrawer = React.useCallback((restoreFocus = true) => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;
    restoreFocusRef.current = restoreFocus;
    dialog.close();
  }, []);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setIsOpen(false);
      if (restoreFocusRef.current) {
        triggerRef.current?.focus();
      }
      restoreFocusRef.current = true;
    };

    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, []);

  function handleBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      closeDrawer();
    }
  }

  const navItems = [
    { href: "/projects", label: t("projects"), active: isProjectsRoute },
    { href: "/#stack", label: t("stack"), active: false },
    { href: "/#experience", label: t("experience"), active: false },
    { href: "/#contact", label: t("contact"), active: false },
  ];

  return (
    <div className="lg:hidden">
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        size="icon"
        onClick={openDrawer}
        aria-label={t("openMenu")}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        className="size-9 rounded-lg border-border bg-card text-foreground"
      >
        <Menu className="size-4" aria-hidden="true" />
      </Button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation-drawer"
        aria-label={t("mobileLabel")}
        onClick={handleBackdropClick}
        className="mobile-nav-dialog"
      >
        <div className="flex h-full flex-col justify-between p-5">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                {t("menuTitle")}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => closeDrawer(true)}
                aria-label={t("closeMenu")}
                className="size-10 rounded-lg"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <nav aria-label={t("mobileLabel")}>
              <ul className="flex flex-col gap-1.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => closeDrawer(false)}
                      aria-current={item.active ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center rounded-lg px-3.5 py-2.5 text-base font-medium transition-colors",
                        item.active
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-surface-elevated"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-5">
            <Button asChild variant="default" size="lg" className="w-full">
              <a
                href={cvHref}
                download
                onClick={() => closeDrawer(false)}
              >
                <Download className="size-4" aria-hidden="true" />
                {t("downloadCv")}
              </a>
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" size="default">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span translate="no">GitHub</span>
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="default">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span translate="no">LinkedIn</span>
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
