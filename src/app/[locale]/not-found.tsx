import { ArrowLeft, FolderKanban } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center sm:px-6"
    >
      <Badge variant="accent" className="font-mono">
        {t("badge")}
      </Badge>
      <h1 className="text-fluid-section font-bold tracking-tight text-foreground">
        {t("title")}
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t("description")}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="default">
          <Link href="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t("backHome")}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/projects">
            <FolderKanban className="size-4" aria-hidden="true" />
            {t("viewProjects")}
          </Link>
        </Button>
      </div>
    </main>
  );
}
