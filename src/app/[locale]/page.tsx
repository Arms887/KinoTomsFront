import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import HomePage from "@/pagesComponents/HomePage/HomePage";

export default function HomePageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale);

  return <HomePage />;
}
