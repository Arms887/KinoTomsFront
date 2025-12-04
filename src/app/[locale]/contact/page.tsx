import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import ContactPage from "@/pagesComponents/ContactPage/ContactPage";

export default function ContactPageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <ContactPage />;
}

