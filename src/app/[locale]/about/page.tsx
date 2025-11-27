import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import AboutPage from "@/pages/AboutPage/AboutPage";

export default function AboutPageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <AboutPage />;
}

