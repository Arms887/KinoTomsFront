// import { NextIntlClientProvider } from "next-intl";
// import { getLocale, getMessages } from "next-intl/server";
import NotFoundPage from "@/pagesComponents/NotFoundPage/NotFoundPage";

export default async function NotFound() {
  // const locale = await getLocale();
  // const messages = await getMessages();

  return (
    // <NextIntlClientProvider locale={locale} messages={messages}>
      <NotFoundPage />
    // </NextIntlClientProvider>
  );
}
