import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import ProductDetailPage from "@/pages/ProductDetailPage/ProductDetailPage";

export default function ProductDetailPageWrapper({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = use(params);
  setRequestLocale(locale);

  return <ProductDetailPage productId={id} />;
}

