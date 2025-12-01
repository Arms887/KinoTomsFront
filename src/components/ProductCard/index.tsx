import { DatePickerIcon } from "../../../public/svg/datePicker"
import { PinkButton } from "../ui/pinkButton"
import styles from "./product.module.scss"
import Image, { StaticImageData } from "next/image"

interface ProductCardProps {
    img?: StaticImageData | string
    time?: string
    title?: string
    className?: string
}

function ProductCard({ img, time, title,className }: ProductCardProps) {
    return (
        <div className={`${className} ${styles.productCardContainer}`}>
            <Image className={styles.productCardMainImg} src={img as StaticImageData} alt="" />
            <div className={styles.productCardHidedContent}>
                <Image className={styles.productCardHidedImg} src={img as StaticImageData} alt="" />
                <div className={styles.productCardContent}>
                    <div className={styles.productCardContentTime}>
                        <p className={styles.productCardContentTime}>{time}</p>
                        <p className={styles.productCardContentTimeTitle}>{title}</p>
                        <div className={styles.productCardGet}>
                            <PinkButton><span>Get Ticket</span></PinkButton>
                            <div className={styles.productCardisActiv}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProductCard }
