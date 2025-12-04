"use client";

import Link from "next/link";
// import { useTranslations } from "next-intl";

import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  // const t = useTranslations("NotFound");

  return (
    <div className="container">
      <div className={styles.content}>
        <h1 className={styles.title}>
          {/* {t("title")} */}
          title
          </h1>
        <p className={styles.description}>
        {/* // t("description") */}
        description
        </p>
        <Link href="/" className={styles.button}>
          {/* {t("goHome")} */}
          tom home
        </Link>
      </div>
    </div>
  );
}

