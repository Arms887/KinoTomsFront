import { useTranslations } from "next-intl";
import styles from "./productDetailSecond.module.scss"
export default function ProductDetailSecond() {
    const t = useTranslations("ProductDetail");


    return (
        <div className={styles.productDetailContainer}>
            <div>
                <p className={styles.productDetailTitle}>Ժամանակացույց</p>
            </div>
            <div>
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
                </iframe>            </div>
        </div>
    );
}