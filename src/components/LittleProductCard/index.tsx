import styles from "./littleProduct.module.scss"
import Image, { StaticImageData } from "next/image"

interface LittleProductCardProps {
    img?: StaticImageData | string,
    className?: string
}

function LittleProductCard({ img, className }: LittleProductCardProps) {
    return (
        <div className={`${styles.littleProductCardContainer} ${className}`}>
            <Image className={styles.littleProductCardMainImg} src={img as StaticImageData} alt="" />
            <Image className={styles.littleProductCardHidedImg} src={img as StaticImageData} alt="" />
        </div>
    )
}

export { LittleProductCard }
