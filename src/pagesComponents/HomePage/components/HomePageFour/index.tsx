"use client";
import styles from "./homePageFour.module.scss"
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomePageFour() {
    const t = useTranslations("HomePageSecond")
    return (
        <div className="container">
            <div className={styles.homePageFourMainBlock}>
                <div className={styles.imageContainer}>
                    <div className={styles.image1}>
                        <Image src="/assets/img/image 21.png" alt="Film 1" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div className={styles.image2}>
                        <Image src="/assets/img/image 21 (3).png" alt="Film 2" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div className={styles.image3}>
                        <Image src="/assets/img/image 21 (4).png" alt="Film 3" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div className={styles.image4}>
                        <Image src="/assets/img/image 21 (4).png" alt="Film 4" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div className={styles.image5}>
                        <Image src="/assets/img/image 12.png" alt="Film 5" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div className={styles.image6}>
                        <Image src="/assets/img/image 23.png" alt="Film 6" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div className={styles.image7}>
                        <Image src="/assets/img/image 21 (1).png" alt="Film 7" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div className={styles.image8}>
                        <Image src="/assets/img/image 21 (2).png" alt="Film 8" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div className={styles.image9}>
                        <Image src="/assets/img/image 20.png" alt="Film 9" fill style={{objectFit: 'cover'}} />
                    </div>
                </div>            
                <div className={styles.homePageFourContent}>
                    <p>{t("homePageFilmTitle")}</p>
                    <button>{t("homePageFilmButton")}</button>
                </div>
            </div>
        </div>
    );
}