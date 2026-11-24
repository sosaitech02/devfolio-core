import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <Badge variant="outline" className="font-mono">
        {t("badge")}
      </Badge>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {t("title")}
      </h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        {t("description")}
      </p>
      <Button asChild variant="default" size="sm" className="mt-2">
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </main>
  );
}
