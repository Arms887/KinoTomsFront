"use client";

import { useTranslations } from "next-intl";
import styles from "./ContactPage.module.scss";

export default function ContactPage() {
  const t = useTranslations("Pages");

  return (
    <div className="container">
      <div className={styles.content}>
        <h1 className={styles.title}>{t("contactTitle")}</h1>
        <p className={styles.description}>{t("contactDescription")}</p>
      </div>
    </div>
  );
}

