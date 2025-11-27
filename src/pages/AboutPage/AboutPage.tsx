"use client";

import { useTranslations } from "next-intl";
import styles from "./AboutPage.module.scss";

export default function AboutPage() {
  const t = useTranslations("Pages");

  return (
    <div className="container">
      <div className={styles.content}>
        <h1 className={styles.title}>{t("aboutTitle")}</h1>
        <p className={styles.description}>{t("aboutDescription")}</p>
      </div>
    </div>
  );
}

