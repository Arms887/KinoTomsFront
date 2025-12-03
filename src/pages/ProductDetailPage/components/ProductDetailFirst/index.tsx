import { useTranslations } from "next-intl";
import styles from "./productDetailFirst.module.scss"
import Image from "next/image";
import img from "./../../../../../public/assets/img/Group 349.png"
export default function ProductDetailFirst() {
    const t = useTranslations("ProductDetail");

    return (
        <div className={styles.productDetailFirstMainBlock}>
            <Image className={styles.productDetailFirstBgImage} src={img} alt=""/>
        </div>
    );
}