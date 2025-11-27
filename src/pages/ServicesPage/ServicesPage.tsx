"use client";

import { useTranslations } from "next-intl";
import styles from "./ServicesPage.module.scss";

export default function ServicesPage() {
  const t = useTranslations("Pages");

  return (
    <div className="container">
      <div className={styles.content}>
        <h1 className={styles.title}>{t("servicesTitle")}</h1>
        <p className={styles.description}>{t("servicesDescription")}</p>
      </div>
    </div>
  );
}

