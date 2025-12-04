import { useTranslations } from "next-intl";
import styles from "./productDetailFirst.module.scss"
import Image from "next/image";
import img from "./../../../../../public/assets/img/Group349.png"
// import vid from "./../../../../../public/assets/video/"
import { BasicButton } from "@/components/ui/basicButton";
import { ClockIcon } from "../../../../../public/svg/clockIcon";
import { ReturnIcon } from "../../../../../public/svg/returnIcon";
import { url } from "inspector";
export default function ProductDetailFirst() {
    const t = useTranslations("ProductDetail");

    return (
        <div style={{ backgroundImage: `url(${img ? img.src : ""})` }} className={styles.productDetailFirstMainBlock}>
            {/* <Image className={styles.productDetailFirstBgImage} src={img} alt="" /> */}
            <video className={styles.productDetailFirstBgVideo} autoPlay loop muted>
                <source src={"/assets/video/pchelovod.mp4"} type="video/mp4" />
            </video>
            <div className="container">
                <div className={styles.productDetailFirstContent}>
                    <p className={styles.productDetailFirstTitle}>Վանաձոր, Սինեմա Զոն կինոթատրոն </p>
                    <div className={styles.productDetailFirstInfoBtns}>
                        <BasicButton padding={"11px 17px"}>Մարտաֆիլմ</BasicButton>
                        <BasicButton padding={"7px 13px"}><div style={{ display: "flex", alignItems: "center", gap: "5px" }}><ClockIcon /><span>1:45</span></div></BasicButton>
                    </div>
                    <p className={styles.productDetailFirstTitle}>Տոմսերի արժեքը՝ 3000 - 10000 դրամ</p>
                    <div className={styles.productDetailFirstActionBtns}>
                        <BasicButton padding={"9px 15px 10px 15px"}>Գնել տոմս</BasicButton>
                        <BasicButton padding={"9px 30px 10px 31px"}>Թրեյլեր</BasicButton>
                        <BasicButton padding={"10px 9px"}><ReturnIcon /></BasicButton>

                    </div>
                </div>
            </div>
        </div >
    );
}