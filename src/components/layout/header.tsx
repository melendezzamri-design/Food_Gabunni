"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/language-switcher";

export default function Header() {
  const t = useTranslations("common");

  const navLinks = [
    { href: "#menu", label: t("menu") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block font-headline">
            {t("siteName")}
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              <Button variant="link" className="text-foreground/80 hidden md:inline-flex">
                {link.label}
              </Button>
            </a>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
