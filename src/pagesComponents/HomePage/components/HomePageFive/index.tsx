"use client";

import { useState } from "react";
import SearcherIcon from "../../../../../public/svg/searcherIcon";
import styles from "./homePageFive.module.scss";
import { useTranslations } from "next-intl";

export default function HomePageFive() {
    const [searchValue, setSearchValue] = useState("");
    const t = useTranslations("HomePageSecond")
    return (
        <div className="container">
            <div className={styles.homePageFiveMainBlock}>
                <div className={styles.homePageFiveContentContainer}>
                    <div className={styles.homePageFiveContent}>
                        <h4>{t("homePageSearchTitle")}</h4>
                        <div className={styles.homePageFiveSearchBlock}>
                            <input
                                type="text"
                                placeholder={t("homePageSearchPlaceholder")}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />

                            <div className={styles.homePageFiveSearchIcon}>
                                <SearcherIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
