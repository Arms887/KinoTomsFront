import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import ServicesPage from "@/pagesComponents/ServicesPage/ServicesPage";

export default function ServicesPageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <ServicesPage />;
}

