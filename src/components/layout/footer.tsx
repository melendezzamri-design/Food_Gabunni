import { useTranslations } from "next-intl";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="text-xl font-bold font-headline">
            {tCommon("siteName")}
          </Link>
          <p className="max-w-md mx-auto mt-2 text-sm text-muted-foreground">
            {t("description")}
          </p>
          <div className="flex justify-center mt-6">
            <Link
              href="#"
              className="mx-4 text-muted-foreground hover:text-primary"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="mx-4 text-muted-foreground hover:text-primary"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="mx-4 text-muted-foreground hover:text-primary"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <hr className="my-6 border-border" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
