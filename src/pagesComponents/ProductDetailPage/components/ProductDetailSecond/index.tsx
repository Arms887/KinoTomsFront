import { useTranslations } from "next-intl";
import styles from "./productDetailSecond.module.scss"
import { Col, Row } from "antd";
import { testArray } from "@/halpers/constants/indext";
import { ProductCard } from "@/components/ProductCard";
import { TimeButton } from "@/components/ui/timeButton";
import { TicketCard } from "@/components/TicketCard";
export default function ProductDetailSecond() {
    const t = useTranslations("ProductDetail");


    return (
        <div className={styles.productDetailContainer}>
            
            <div>
                <p className={styles.productDetailTitle}>Ժամանակացույց</p>
                <div className={styles.productTimesBlock}>
                    {[...Array(3)].map((_, i) => (
                        <TimeButton key={i} month={"Դեկ"} day={"5"} />
                    ))}
                </div>

                <div className={styles.ProductDetailTicketsBlock}>
                    <Row className={styles.ProductDetailNormalCards} gutter={[10, 10]}>
                        {testArray.slice(0, 3).map((item, i) => (
                            <Col
                                key={i}
                                xs={24}
                                sm={24}
                                md={12}
                                lg={12}
                                xl={8}
                            >
                                <TicketCard id={item.id} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div className={styles.productDetailDescriptionBlock}>
                <p className={styles.productDetailTitle}>նկարագրություն</p>
                <p className={styles.productDetailDescription}>Ֆիլմը պատմում է նախկին գաղտնի կազմակերպության անդամ Ադամ Քլեյի (Ջեյսոն Ստեյթհәм) մասին, ով հասարակության աչքին պարզապես մեղվապահ է։ Սակայն երբ իր հարևանը ինքնասպան է լինում՝ ինտերնետային խաբեբաների զոհ դառնալուց հետո, Քլեյը որոշում է անձամբ վերացնել այս «թունավոր վարակը»։</p>
            </div>
            <div className={styles.productDetailAddress}>
                <p className={styles.productDetailTitle}>Հասցե</p>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=37.620070%2C55.753630&z=12"
                    width="560"
                    height="400"
                >
                </iframe>
            </div>
            <div>
                <Row className={styles.ProductDetailNormalCards} gutter={[10, 10]}>
                    {testArray.map((item, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={12}
                            md={12}
                            lg={6}
                            xl={6}
                        >
                            <ProductCard id={item.id} img={item.img} time={item.time} title={item.title} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}