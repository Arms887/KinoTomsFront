import { useTranslations } from "next-intl";
import { Row, Col } from "antd";
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
                        <Row className={styles.homePageSecondNormalCards} gutter={[10, 10]}>
                            {testArray.map((item, index) => (
                                <Col
                                    key={index}
                                    xs={24}
                                    sm={12}
                                    md={12}
                                    lg={6}
                                    xl={6}
                                >
                                    <ProductCard className={styles.homePageSecondLittleCard} id={item.id} img={item.img} time={item.time} title={item.title} />
                                </Col>
                            ))}
                        </Row>
                        <Row className={styles.homePageSecondLittleCards} gutter={[10, 10]}>
                            {testArray.map((item, index) => (
                                <Col
                                    key={index}
                                    xs={24}
                                    sm={12}
                                    md={12}
                                    lg={6}
                                    xl={6}
                                >
                                    <LittleProductCard className={styles.homePageSecondLittleCard} img={item.img} />
                                </Col>
                            ))}
                        </Row>
                        <div className={styles.homePageSecondCardsWithWalls}>
                            <div className={styles.homePageSecondCardWall}></div>
                            <Row className={styles.homePageSecondNormalCards} gutter={[10, 10]}>
                                {testArray.slice(0, 3).map((item, index) => (
                                    <Col
                                        key={index}
                                        xs={24}
                                        sm={24}
                                        md={12}
                                        lg={12}
                                        xl={8}
                                    >
                                        <ProductCard className={styles.homePageSecondLittleCard} id={item.id} img={item.img} time={item.time} title={item.title} />
                                    </Col>
                                ))}
                            </Row>
                            <div className={styles.homePageSecondCardWall}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}