import { DatePickerIcon } from "../../../public/svg/datePicker"
import styles from "./product.module.scss"
import Image, { StaticImageData } from "next/image"

interface ProductCardProps {
    img?: StaticImageData | string
    time?: string
    title?: string
}

function ProductCard({ img, time, title }: ProductCardProps) {
    return (
        <div className={styles.productCardContainer}>
            <Image className={styles.productCardMainImg} src={img as StaticImageData} alt="" />
            <div className={styles.productCardHidedContent}>
                <Image className={styles.productCardHidedImg} src={img as StaticImageData} alt="" />
                <div className={styles.productCardContent}>
                    <div className={styles.productCardContentTime}>
                        <p className={styles.productCardContentTime}>{time}</p>
                        <p className={styles.productCardContentTimeTitle}>{title}</p>
                    </div>
                </div>
            </div>
            <div className={styles.productCardisActive}>
            </div>
        </div>
    )
}

export { ProductCard }
