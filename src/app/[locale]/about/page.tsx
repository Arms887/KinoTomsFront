import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import AboutPage from "@/pagesComponents/AboutPage/AboutPage";

export default function AboutPageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <AboutPage />;
}

