"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/mainBtn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLanguage: string) => {
    // Construct the new path with the new locale
    // pathname from next-intl already excludes the locale prefix
    const newPath = pathname === '/' 
      ? `/${newLanguage}` 
      : `/${newLanguage}${pathname}`;
    
    // Use replace instead of push to avoid adding to history
    // This provides client-side navigation without full page refresh
    router.replace(newPath);
  };

  const languageLabels = {
    hy: "Հայերեն",
    ru: "Русский",
    en: "English",
  };

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Button width={100} height={50}>
          {languageLabels[locale as keyof typeof languageLabels]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("hy")}>
          Հայերեն
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("ru")}>
          Русский
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
