import { useTranslations } from "next-intl";
import styles from "./homePageSecond.module.scss";
import { CinemaLittleCards } from "@/components/CinemaLittleCards";
import { MainSearch } from "@/components/MainSearch";
import { ProductCard } from "@/components/ProductCard";
import { LittleProductCard } from "@/components/LittleProductCard";
import { testArray } from "@/halpers/constants/indext";
export default function HomePageSecond() {
    const t = useTranslations("HomePageSecond");
    return (
        <div className={styles.homePageSecondMainBlock}>
            <div className="container">
                <div className={styles.homePageSecondContent}>
                    <h2 className={styles.title}>{t("homePageSecondTitle")}</h2>
                    <CinemaLittleCards />
                    <MainSearch />
                    <div className={styles.homePageSecondCards}>
                        <div className={styles.homePageSecondNormalCards}>
                            {testArray.map((item, index) => (
                                <div key={index} className={styles.productCardWrapper}>
                                    <ProductCard id={item.id} img={item.img} time={item.time} title={item.title} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.homePageSecondLittleCards}>
                            {testArray.map((item, index) => (
                                <div key={index} className={styles.littleProductCardWrapper}>
                                    <LittleProductCard className={styles.homePageSecondLittleCard} img={item.img} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.homePageSecondCardsWithWalls}>
                            <div className={styles.homePageSecondCardWall}></div>
                            <div className={styles.homePageSecondNormalCardsWall}>
                                {testArray.slice(0, 3).map((item, index) => (
                                    <div key={index} className={styles.productCardWrapperWithWalls}>
                                        <ProductCard version={2} className={styles.homePageSecondLittleCard} id={item.id} img={item.img} time={item.time} title={item.title} />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.homePageSecondCardWall}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}