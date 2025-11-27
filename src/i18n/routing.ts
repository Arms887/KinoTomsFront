import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["hy", "ru", "en"],

  // Used when no locale matches
  defaultLocale: "hy",
  localeDetection: true,
  // Always show locale prefix in URL (including default locale)
  localePrefix: "always",
});
