import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import VerifyEmailPage from "@/pagesComponents/VerifyEmailPage/VerifyEmailPage";

export default function VerifyEmailPageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <VerifyEmailPage />;
}

