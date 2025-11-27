"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter as useNextRouter } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { Button } from "../ui/mainBtn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const LanguageSwitcher = () => {
  const nextRouter = useNextRouter(); // Use Next.js router to avoid auto locale prefix
  const pathname = usePathname(); // This returns pathname without locale
  const params = useParams();
  const [currentLanguage, setCurrentLanguage] = useState("hy");

  useEffect(() => {
    // Get current locale from URL params
    const locale = params?.locale as string;
    if (locale && ["hy", "ru", "en"].includes(locale)) {
      setCurrentLanguage(locale);
    } else {
      setCurrentLanguage("hy");
    }
  }, [params]);

  const changeLanguage = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
    
    // usePathname() from next-intl returns pathname without locale
    // Construct the new path with the new locale
    const newPath = pathname === '/' 
      ? `/${newLanguage}` 
      : `/${newLanguage}${pathname}`;
    
    // Use Next.js router to navigate without auto-adding locale prefix
    nextRouter.push(newPath);
    nextRouter.refresh();
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
          {languageLabels[currentLanguage as keyof typeof languageLabels]}
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
