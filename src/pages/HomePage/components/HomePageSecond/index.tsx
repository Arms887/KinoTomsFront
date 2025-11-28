import { useTranslations } from "next-intl";
import styles from "./homePageSecond.module.scss";
import { CinemaLittleCards } from "@/components/CinemaLittleCards";
import { MainSearch } from "@/components/MainSearch";
import img1 from "./../../../../../public/assets/img/image 1.png";
import img2 from "./../../../../../public/assets/img/image 4.png";
import img3 from "./../../../../../public/assets/img/image 7.png";
import img4 from "./../../../../../public/assets/img/image 9.png";
import { ProductCard } from "@/components/ProductCard";
export default function HomePageSecond() {
    const t = useTranslations("HomePageSecond");
    const testArray = [
        {
            img: img4,
            time: "Նոյեմբեր Հինգշաբթի",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            img: img2,
            time: "Նոյեմբեր Հինգշաբթի",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            img: img3,
            time: "Նոյեմբեր Հինգշաբթի",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            img: img4,
            time: "Նոյեմբեր Հինգշաբթի",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },

    ]
    return (
        <div className={styles.homePageSecondMainBlock}>
            <div className="container">
                <div className={styles.homePageSecondContent}>
                    <h2 className={styles.title}>{t("homePageSecondTitle")}</h2>
                    <CinemaLittleCards />
                    <MainSearch />
                    {testArray.map((item, index) => (
                        <ProductCard key={index} img={item.img} time={item.time} title={item.title} />
                    ))}
                </div>
            </div>
        </div>
    );
}