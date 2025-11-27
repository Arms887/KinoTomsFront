import ImageSlider from "@/components/Carousel";
import styles from "./homePageFirst.module.scss";

export default function HomePageFirst() {
    const images = [
        "/assets/img/8108580d6e50fab22ee6b5ff52a49220c8a1dc8c.png",
        "/assets/img/c4c955243660b6370171e89a0d602915401120a9.png",
        "/assets/img/c9f412b8036a6f98f2d1253c1bdd2c809c7f73e2.png"
    ];

    const buttons = [
        { text: undefined }, // Will use default translation
        { text: undefined },
        { text: undefined }
    ];

    return (
        <div className={styles.homePageFirstMainBlock}>
            <div className={styles.imageSliderContainer}>
                <div className={styles.imageSliderWrapper}>
                    <ImageSlider images={images} buttons={buttons} />
                </div>
                <div className={styles.imageSliderShadow}>
                </div>
            </div>
        </div>
    );
}