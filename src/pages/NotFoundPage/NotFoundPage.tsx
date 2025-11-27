"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <div className="container">
      <div className={styles.content}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.description}>{t("description")}</p>
        <Link href="/" className={styles.button}>
          {t("goHome")}
        </Link>
      </div>
    </div>
  );
}

